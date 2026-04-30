import { Resend } from "resend";
import fs from "fs";

function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendOrderConfirmationEmail(order: {
  email: string;
  cui: string;
  companyName: string | null;
  documentType: string;
  id: string;
}) {
  const docLabel = order.documentType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  await getResend().emails.send({
    from: process.env.EMAIL_FROM!,
    to: order.email,
    subject: "Comanda ta a fost plasată cu succes - ONRC Certificate",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1e40af;">Comanda ta a fost primită!</h2>
        <p>Bună ziua,</p>
        <p>Am primit comanda ta și o procesăm în acest moment. Documentul va fi trimis pe email în cel mult <strong>2 ore</strong>.</p>

        <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 12px; color: #374151;">Detalii comandă</h3>
          <p style="margin: 4px 0;"><strong>Nr. comandă:</strong> ${order.id}</p>
          <p style="margin: 4px 0;"><strong>CUI:</strong> ${order.cui}</p>
          ${order.companyName ? `<p style="margin: 4px 0;"><strong>Firmă:</strong> ${order.companyName}</p>` : ""}
          <p style="margin: 4px 0;"><strong>Document:</strong> ${docLabel}</p>
        </div>

        <p>Te vom contacta pe acest email când documentul este gata.</p>
        <p>Dacă ai întrebări, răspunde la acest email.</p>

        <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
          ONRC Certificate Platform · Servicii profesionale de obținere documente
        </p>
      </div>
    `,
  });
}

export async function sendDocumentReadyEmail(order: {
  email: string;
  cui: string;
  companyName: string | null;
  documentType: string;
  id: string;
  pdfPath: string;
}) {
  const docLabel = order.documentType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const pdfBuffer = fs.readFileSync(order.pdfPath);

  await getResend().emails.send({
    from: process.env.EMAIL_FROM!,
    to: order.email,
    subject: "Documentul tău ONRC este gata - Îl găsești atașat",
    attachments: [
      {
        filename: `${order.documentType}_${order.cui}.pdf`,
        content: pdfBuffer,
      },
    ],
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #16a34a;">Documentul tău este gata!</h2>
        <p>Bună ziua,</p>
        <p>Documentul solicitat este disponibil ca atașament la acest email.</p>

        <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
          <h3 style="margin: 0 0 12px; color: #374151;">Document livrat</h3>
          <p style="margin: 4px 0;"><strong>Nr. comandă:</strong> ${order.id}</p>
          <p style="margin: 4px 0;"><strong>CUI:</strong> ${order.cui}</p>
          ${order.companyName ? `<p style="margin: 4px 0;"><strong>Firmă:</strong> ${order.companyName}</p>` : ""}
          <p style="margin: 4px 0;"><strong>Document:</strong> ${docLabel}</p>
        </div>

        <p>Documentul PDF este atașat la acest email. Îl poți descărca și utiliza imediat.</p>
        <p>Mulțumim că ai ales serviciile noastre!</p>

        <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
          ONRC Certificate Platform · Servicii profesionale de obținere documente
        </p>
      </div>
    `,
  });
}

export async function sendErrorNotificationEmail(order: {
  email: string;
  cui: string;
  id: string;
  errorMessage?: string | null;
}) {
  await getResend().emails.send({
    from: process.env.EMAIL_FROM!,
    to: order.email,
    subject: "Problemă la procesarea comenzii - ONRC Certificate",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #dc2626;">Problemă la procesarea comenzii</h2>
        <p>Bună ziua,</p>
        <p>Am întâmpinat o problemă la obținerea documentului pentru CUI-ul <strong>${order.cui}</strong>.</p>
        <p>Echipa noastră a fost notificată și va rezolva problema în cel mai scurt timp posibil. Te vom contacta în maxim 24 de ore.</p>
        <p><strong>Nr. comandă:</strong> ${order.id}</p>
        <p>Ne cerem scuze pentru neplăcere.</p>

        <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
          ONRC Certificate Platform
        </p>
      </div>
    `,
  });
}
