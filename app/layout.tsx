import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Certificate ONRC — Obține rapid certificatul constatator",
  description:
    "Serviciu profesional de obținere certificate constatoare de la ONRC. Rapid, sigur, livrat pe email în 2 ore. Fără cozi, fără deplasări.",
  keywords: "certificat constatator, ONRC, Romania, CUI, firme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${geist.variable} bg-background`}>
      <body className="min-h-screen flex flex-col font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
