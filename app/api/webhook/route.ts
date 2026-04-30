import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail, sendDocumentReadyEmail, sendErrorNotificationEmail } from "@/lib/email";
import { downloadCertificatConstatator } from "@/lib/onrc-automation";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return new Response("Missing orderId in metadata", { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "paid",
        stripePaymentId: session.payment_intent as string,
        amountPaid: session.amount_total,
      },
    });

    // Confirm email imediat
    await sendOrderConfirmationEmail(order).catch((err) =>
      console.error("Failed to send confirmation email:", err)
    );

    // Procesare async - nu blocăm răspunsul webhook
    processOrderAsync(order).catch((err) =>
      console.error("Async processing failed:", err)
    );
  }

  return new Response("ok", { status: 200 });
}

async function processOrderAsync(order: {
  id: string;
  cui: string;
  email: string;
  documentType: string;
  companyName: string | null;
}) {
  try {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "processing" },
    });

    const { pdfPath, companyName } = await downloadCertificatConstatator(order.cui, order.id);

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        status: "completed",
        pdfPath,
        companyName: companyName || order.companyName,
      },
    });

    await sendDocumentReadyEmail({ ...updatedOrder, pdfPath });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Eroare necunoscută";
    console.error(`Order ${order.id} processing failed:`, errorMessage);

    await prisma.order.update({
      where: { id: order.id },
      data: { status: "failed", errorMessage },
    });

    await sendErrorNotificationEmail({ ...order, errorMessage }).catch(console.error);
  }
}
