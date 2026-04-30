import { chromium, Browser, Page } from "playwright";
import path from "path";
import fs from "fs";

const ONRC_PORTAL_URL = "https://portal.onrc.ro";
const PDF_OUTPUT_DIR = path.join(process.cwd(), "pdfs");

if (!fs.existsSync(PDF_OUTPUT_DIR)) {
  fs.mkdirSync(PDF_OUTPUT_DIR, { recursive: true });
}

export async function downloadCertificatConstatator(
  cui: string,
  orderId: string
): Promise<{ pdfPath: string; companyName: string | null }> {
  const username = process.env.ONRC_USERNAME!;
  const password = process.env.ONRC_PASSWORD!;

  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const context = await browser.newContext({
      acceptDownloads: true,
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
    });

    const page = await context.newPage();

    // Login
    await loginToOnrc(page, username, password);

    // Search company by CUI
    const companyName = await searchCompanyByCui(page, cui);

    // Download certificate
    const pdfPath = await downloadCertificate(page, cui, orderId);

    await browser.close();
    return { pdfPath, companyName };
  } catch (error) {
    if (browser) await browser.close();
    throw error;
  }
}

async function loginToOnrc(page: Page, username: string, password: string) {
  await page.goto(`${ONRC_PORTAL_URL}/`, { waitUntil: "networkidle" });

  // Navigate to login page
  const loginButton = page.locator('a:has-text("Autentificare"), a:has-text("Login"), [href*="login"]').first();
  if (await loginButton.isVisible({ timeout: 5000 })) {
    await loginButton.click();
  } else {
    await page.goto(`${ONRC_PORTAL_URL}/login`, { waitUntil: "networkidle" });
  }

  await page.fill('input[type="email"], input[name="username"], input[name="email"], #username', username);
  await page.fill('input[type="password"], input[name="password"], #password', password);

  await page.click('button[type="submit"], input[type="submit"], button:has-text("Autentificare"), button:has-text("Intră în cont")');

  await page.waitForNavigation({ waitUntil: "networkidle", timeout: 30000 });

  const isLoggedIn = await page.locator('[class*="user"], [class*="account"], [class*="profil"], a:has-text("Deconectare"), a:has-text("Ieșire")').isVisible({ timeout: 5000 }).catch(() => false);

  if (!isLoggedIn) {
    throw new Error("Autentificare eșuată pe portal.onrc.ro. Verificați credențialele din .env");
  }
}

async function searchCompanyByCui(page: Page, cui: string): Promise<string | null> {
  // Navigate to company search
  await page.goto(`${ONRC_PORTAL_URL}/recom/cereri/informatii-firme`, { waitUntil: "networkidle" });

  // Try to find CUI search input
  const cuiInput = page.locator('input[placeholder*="CUI"], input[name*="cui"], input[name*="CUI"], input[id*="cui"]').first();

  if (await cuiInput.isVisible({ timeout: 10000 })) {
    await cuiInput.fill(cui);
    await page.keyboard.press("Enter");
    await page.waitForLoadState("networkidle");
  }

  // Extract company name if visible
  const companyNameEl = page.locator('[class*="company-name"], [class*="denumire"], h2, h3').first();
  const companyName = await companyNameEl.textContent({ timeout: 5000 }).catch(() => null);

  return companyName?.trim() || null;
}

async function downloadCertificate(page: Page, cui: string, orderId: string): Promise<string> {
  const pdfFilename = `certificat_${cui}_${orderId}_${Date.now()}.pdf`;
  const pdfPath = path.join(PDF_OUTPUT_DIR, pdfFilename);

  // Look for "Certificat Constatator" link/button
  const certButton = page.locator(
    'a:has-text("Certificat constatator"), button:has-text("Certificat constatator"), [title*="Certificat"]'
  ).first();

  if (!(await certButton.isVisible({ timeout: 10000 }))) {
    throw new Error("Nu s-a găsit butonul pentru certificat constatator pe portal ONRC");
  }

  // Start download
  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 60000 }),
    certButton.click(),
  ]);

  await download.saveAs(pdfPath);

  if (!fs.existsSync(pdfPath)) {
    throw new Error("PDF-ul nu a fost salvat corect");
  }

  return pdfPath;
}
