import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-04-22.dahlia",
    });
  }
  return _stripe;
}

export const DOCUMENT_TYPES = [
  { value: "certificat_constatator", label: "Certificat Constatator", price: 4900 },
  { value: "certificat_constatator_urgenta", label: "Certificat Constatator (Urgență 24h)", price: 7900 },
  { value: "informatii_firme", label: "Informații despre firmă (extras)", price: 2900 },
] as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[number]["value"];

export function getDocumentType(value: string) {
  return DOCUMENT_TYPES.find((d) => d.value === value);
}
