import { NextRequest } from "next/server";
import { getStripe, getDocumentType } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cui, email, documentType } = body;

    if (!cui || !email || !documentType) {
      return Response.json({ error: "Câmpuri lipsă: cui, email, documentType" }, { status: 400 });
    }

    const cuiClean = cui.toString().replace(/\s/g, "").replace(/^RO/i, "");
    if (!/^\d{2,10}$/.test(cuiClean)) {
      return Response.json({ error: "CUI invalid" }, { status: 400 });
    }

    const doc = getDocumentType(documentType);
    if (!doc) {
      return Response.json({ error: "Tip document invalid" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        cui: cuiClean,
        email,
        documentType,
        status: "pending",
      },
    });

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : null) ||
      "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: doc.label,
              description: `Certificat ONRC pentru CUI ${cuiClean}`,
            },
            unit_amount: doc.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${appUrl}/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/comanda?cancelled=true`,
      customer_email: email,
      metadata: {
        orderId: order.id,
        cui: cuiClean,
        documentType,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return Response.json({ error: "Eroare internă server" }, { status: 500 });
  }
}
