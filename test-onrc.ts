import { chromium, Page } from "playwright";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config();

const CUI_TEST = "40355800";
const SCREENSHOTS_DIR = path.join(__dirname, "screenshots");
const PORTAL_URL = "https://portal.onrc.ro";

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

let stepNr = 0;

async function screenshot(page: Page, label: string) {
  stepNr++;
  const filename = `${String(stepNr).padStart(2, "0")}-${label.replace(/\s+/g, "-")}.png`;
  const filepath = path.join(SCREENSHOTS_DIR, filename);
  await page.screenshot({ path: filepath, fullPage: true });
  console.log(`  📸 Screenshot salvat: screenshots/${filename}`);
}

async function log(msg: string) {
  console.log(`\n${"─".repeat(60)}\n▶ ${msg}\n${"─".repeat(60)}`);
}

async function main() {
  const username = process.env.ONRC_USERNAME;
  const password = process.env.ONRC_PASSWORD;

  if (!username || !password) {
    console.error("❌ ONRC_USERNAME sau ONRC_PASSWORD lipsesc din .env");
    process.exit(1);
  }

  console.log("🚀 Pornesc browserul Playwright (vizibil)...");
  console.log(`👤 Username: ${username}`);
  console.log(`🔍 CUI de testat: ${CUI_TEST}\n`);

  const browser = await chromium.launch({
    headless: false,
    slowMo: 600,
    args: ["--start-maximized"],
  });

  const context = await browser.newContext({
    viewport: null,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
  });

  const page = await context.newPage();

  try {
    // ─── PASUL 1: Deschide portalul ───────────────────────────────────────────
    await log("PASUL 1: Deschid portal.onrc.ro");
    await page.goto(PORTAL_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(2000);
    await screenshot(page, "01-homepage");
    console.log(`  ✅ Pagina încărcată: ${page.url()}`);
    console.log(`  📄 Titlu: ${await page.title()}`);

    // ─── PASUL 2: Găsește butonul de login ────────────────────────────────────
    await log("PASUL 2: Caut butonul de autentificare");

    const loginSelectors = [
      'a:has-text("Autentificare")',
      'a:has-text("Conectare")',
      'a:has-text("Login")',
      'a:has-text("Intră")',
      '[href*="login"]',
      '[href*="autentificare"]',
      'button:has-text("Autentificare")',
    ];

    let loginFound = false;
    for (const sel of loginSelectors) {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 2000 }).catch(() => false)) {
        console.log(`  ✅ Găsit buton login: "${sel}"`);
        await el.click();
        loginFound = true;
        break;
      }
    }

    if (!loginFound) {
      console.log("  ⚠️  Buton login negăsit direct, încerc URL direct...");
      await page.goto(`${PORTAL_URL}/login`, { waitUntil: "domcontentloaded" });
    }

    await page.waitForTimeout(2000);
    await screenshot(page, "02-login-page");
    console.log(`  📄 URL curent: ${page.url()}`);

    // ─── PASUL 3: Completează credențialele ───────────────────────────────────
    await log("PASUL 3: Completez credențialele de login");

    const emailSelectors = [
      'input[type="email"]',
      'input[name="email"]',
      'input[name="username"]',
      'input[name="utilizator"]',
      'input[placeholder*="email" i]',
      'input[placeholder*="utilizator" i]',
      "#email",
      "#username",
    ];

    let emailFilled = false;
    for (const sel of emailSelectors) {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 2000 }).catch(() => false)) {
        await el.click();
        await el.fill(username);
        console.log(`  ✅ Email completat (selector: ${sel})`);
        emailFilled = true;
        break;
      }
    }

    if (!emailFilled) {
      await screenshot(page, "03-ERROR-no-email-field");
      console.log("  ❌ Nu am găsit câmpul de email. Screenshot salvat.");
      console.log("  📋 HTML-ul paginii (primele 3000 chars):");
      console.log((await page.content()).substring(0, 3000));
      await browser.close();
      return;
    }

    const passwordSelectors = [
      'input[type="password"]',
      'input[name="password"]',
      'input[name="parola"]',
      "#password",
      "#parola",
    ];

    for (const sel of passwordSelectors) {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 2000 }).catch(() => false)) {
        await el.click();
        await el.fill(password);
        console.log(`  ✅ Parola completată (selector: ${sel})`);
        break;
      }
    }

    await screenshot(page, "03-credentials-filled");

    // ─── PASUL 4: Submit login ─────────────────────────────────────────────────
    await log("PASUL 4: Trimit formularul de login");

    const submitSelectors = [
      'button[type="submit"]',
      'input[type="submit"]',
      'button:has-text("Autentificare")',
      'button:has-text("Conectare")',
      'button:has-text("Intră")',
      'button:has-text("Login")',
    ];

    for (const sel of submitSelectors) {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 2000 }).catch(() => false)) {
        console.log(`  ✅ Click submit (selector: ${sel})`);
        await el.click();
        break;
      }
    }

    await page.waitForTimeout(4000);
    await screenshot(page, "04-after-login");
    console.log(`  📄 URL după login: ${page.url()}`);

    // Verifică dacă e logat
    const isLoggedIn = await page
      .locator(
        '[class*="user-name"], [class*="logout"], a:has-text("Deconectare"), a:has-text("Ieșire"), .user-info'
      )
      .isVisible({ timeout: 5000 })
      .catch(() => false);

    if (isLoggedIn) {
      console.log("  ✅ LOGIN REUȘIT!");
    } else {
      console.log("  ⚠️  Nu pot confirma loginul - continui oricum...");
    }

    // ─── PASUL 5: Navighează la InfoCert ──────────────────────────────────────
    await log("PASUL 5: Caut secțiunea InfoCert / Informații firme");

    const infocertSelectors = [
      'a:has-text("InfoCert")',
      'a:has-text("Informații firme")',
      'a:has-text("Informatii firme")',
      'a:has-text("Certificat constatator")',
      '[href*="infocert"]',
      '[href*="informatii"]',
      '[href*="recom"]',
      'a:has-text("RECOM")',
    ];

    let infocertFound = false;
    for (const sel of infocertSelectors) {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 3000 }).catch(() => false)) {
        const text = await el.textContent();
        console.log(`  ✅ Găsit link InfoCert: "${text?.trim()}" (selector: ${sel})`);
        await el.click();
        infocertFound = true;
        break;
      }
    }

    if (!infocertFound) {
      console.log("  ⚠️  Link InfoCert negăsit, încerc URL direct...");
      await page.goto(`${PORTAL_URL}/recom/cereri/informatii-firme`, {
        waitUntil: "domcontentloaded",
      });
    }

    await page.waitForTimeout(3000);
    await screenshot(page, "05-infocert-section");
    console.log(`  📄 URL InfoCert: ${page.url()}`);

    // ─── PASUL 6: Caută după CUI ──────────────────────────────────────────────
    await log(`PASUL 6: Caut firma cu CUI ${CUI_TEST} (Kaufland Romania)`);

    const cuiSelectors = [
      'input[placeholder*="CUI" i]',
      'input[placeholder*="cod fiscal" i]',
      'input[name*="cui" i]',
      'input[id*="cui" i]',
      'input[name*="CUI"]',
    ];

    let cuiFilled = false;
    for (const sel of cuiSelectors) {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 3000 }).catch(() => false)) {
        await el.click();
        await el.fill(CUI_TEST);
        console.log(`  ✅ CUI completat: ${CUI_TEST} (selector: ${sel})`);
        cuiFilled = true;
        break;
      }
    }

    if (!cuiFilled) {
      await screenshot(page, "06-ERROR-no-cui-field");
      console.log("  ❌ Nu am găsit câmpul CUI.");
      console.log("  📋 Link-uri disponibile pe pagină:");
      const links = await page.locator("a").all();
      for (const link of links.slice(0, 20)) {
        const text = await link.textContent();
        const href = await link.getAttribute("href");
        if (text?.trim()) console.log(`     - "${text.trim()}" → ${href}`);
      }
    } else {
      await page.keyboard.press("Enter");
      await page.waitForTimeout(3000);
      await screenshot(page, "06-search-results");
      console.log(`  📄 URL după căutare: ${page.url()}`);
    }

    // ─── PASUL 7: Extrage informații firmă ────────────────────────────────────
    await log("PASUL 7: Extrag informații despre firmă");

    const companyInfo = await extractCompanyInfo(page);
    if (companyInfo) {
      console.log("  📊 INFORMAȚII FIRMĂ:");
      console.log(`     Denumire:  ${companyInfo.name || "N/A"}`);
      console.log(`     CUI:       ${companyInfo.cui || "N/A"}`);
      console.log(`     Stare:     ${companyInfo.status || "N/A"}`);
      console.log(`     Sediu:     ${companyInfo.address || "N/A"}`);
      console.log(`     J Nr:      ${companyInfo.jNumber || "N/A"}`);
    } else {
      console.log("  ℹ️  Nu am putut extrage informații structurate");
    }

    await screenshot(page, "07-company-info");

    // ─── PASUL 8: Ajunge la pagina de plată (fără a plăti) ───────────────────
    await log("PASUL 8: Caut butonul Certificat Constatator (fără a plăti)");

    const certSelectors = [
      'a:has-text("Certificat constatator")',
      'button:has-text("Certificat constatator")',
      'a:has-text("Adaugă în coș")',
      'button:has-text("Adaugă")',
      '[title*="Certificat constatator" i]',
      'a:has-text("Solicit")',
      'button:has-text("Solicit")',
    ];

    let certFound = false;
    for (const sel of certSelectors) {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 3000 }).catch(() => false)) {
        const text = await el.textContent();
        console.log(`  ✅ Găsit: "${text?.trim()}" → CLICK (fără plată)`);
        await el.click();
        certFound = true;
        break;
      }
    }

    if (!certFound) {
      console.log("  ⚠️  Buton certificat negăsit pe această pagină");
      console.log("  📋 Butoane/link-uri disponibile:");
      const buttons = await page.locator("button, a").all();
      for (const btn of buttons.slice(0, 30)) {
        const text = await btn.textContent();
        if (text && text.trim().length > 2 && text.trim().length < 60) {
          console.log(`     - "${text.trim()}"`);
        }
      }
    }

    await page.waitForTimeout(3000);
    await screenshot(page, "08-before-payment-STOP");
    console.log(`  📄 URL final (înainte de plată): ${page.url()}`);
    console.log("\n  🛑 OPRIT - nu am efectuat nicio plată");

  } catch (error) {
    console.error("\n❌ Eroare:", error instanceof Error ? error.message : error);
    await screenshot(page, "ERROR-crash").catch(() => {});
  } finally {
    console.log("\n" + "═".repeat(60));
    console.log("✅ Test finalizat. Screenshots salvate în /screenshots/");
    console.log("   Browserul rămâne deschis 10 secunde...");
    console.log("═".repeat(60));
    await page.waitForTimeout(10000);
    await browser.close();
  }
}

async function extractCompanyInfo(page: Page) {
  try {
    const pageText = await page.textContent("body") || "";

    const nameMatch = pageText.match(/KAUFLAND[^,\n]*/i) ||
      pageText.match(/Denumire[:\s]+([^\n]+)/i);
    const cuiMatch = pageText.match(/CUI[:\s]*[RO]*\s*(40355800)/i) ||
      pageText.match(/Cod fiscal[:\s]*([0-9]+)/i);
    const jMatch = pageText.match(/J\d+\/\d+\/\d+/);
    const statusMatch = pageText.match(/Stare[:\s]+([^\n]+)/i) ||
      pageText.match(/(Înregistrat|Activ|Radiat|Dizolvat)/i);

    const addressEl = page.locator('[class*="adresa"], [class*="sediu"], [class*="address"]').first();
    const address = await addressEl.textContent({ timeout: 2000 }).catch(() => null);

    return {
      name: nameMatch?.[0]?.trim(),
      cui: cuiMatch?.[1]?.trim(),
      jNumber: jMatch?.[0]?.trim(),
      status: statusMatch?.[1]?.trim(),
      address: address?.trim(),
    };
  } catch {
    return null;
  }
}

main().catch(console.error);
