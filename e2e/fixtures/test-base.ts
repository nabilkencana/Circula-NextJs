import { test as baseTest, expect, Page, APIRequestContext } from "@playwright/test";

export const API_BASE_URL = "https://learn.smktelkom-mlg.sch.id/bank_sampah";
export const APP_KEY = "1d99c078-9a3f-45e0-978e-8e0806338593";

export const DEFAULT_ADMIN = {
  username: "admin_banksampah",
  password: "admin123",
  namaUnit: "Bank Sampah Asri Jaya",
};

export const DEFAULT_NASABAH = {
  username: "nasabah_budi",
  password: "password123",
  namaNasabah: "Budi Santoso",
};

export const DEFAULT_NASABAH_2 = {
  username: "nasabah_siti",
  password: "password123",
  namaNasabah: "Siti Aminah",
};

export interface CapturedConsoleEntry {
  type: string;
  text: string;
  location?: string;
  timestamp: string;
}

export interface ExtendedTestFixtures {
  consoleErrors: CapturedConsoleEntry[];
  captureConsoleLogs: boolean;
}

/**
 * Extended test fixture with automatic console log & error capturing.
 */
export const test = baseTest.extend<ExtendedTestFixtures>({
  captureConsoleLogs: [true, { option: true }],
  consoleErrors: async ({ page, captureConsoleLogs }, use, testInfo) => {
    const errors: CapturedConsoleEntry[] = [];

    if (captureConsoleLogs) {
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          errors.push({
            type: "console.error",
            text: msg.text(),
            location: msg.location() ? `${msg.location().url}:${msg.location().lineNumber}` : undefined,
            timestamp: new Date().toISOString(),
          });
        }
      });

      page.on("pageerror", (err) => {
        errors.push({
          type: "uncaught.pageerror",
          text: err.message,
          location: err.stack,
          timestamp: new Date().toISOString(),
        });
      });
    }

    await use(errors);

    // If there were any errors captured, attach them to the Playwright report
    if (errors.length > 0) {
      await testInfo.attach("browser-console-errors", {
        body: JSON.stringify(errors, null, 2),
        contentType: "application/json",
      });
    }
  },
});

export { expect };

let hasSeeded = false;

/**
 * Call POST /api/v1/seed to ensure sample data is populated in backend.
 */
export async function ensureSeedData(request: APIRequestContext, force = false) {
  if (hasSeeded && !force) return null;
  try {
    const res = await request.post(`${API_BASE_URL}/api/v1/seed`, {
      headers: {
        "x-app-key": APP_KEY,
      },
    });
    const json = await res.json();
    hasSeeded = true;
    return json;
  } catch (err) {
    console.warn("[ensureSeedData] Seed API error:", err);
    return null;
  }
}

/**
 * Generate unique data for nasabah registration.
 */
export function generateUniqueNasabah() {
  const ts = Date.now().toString().slice(-6);
  const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
  return {
    username: `nas_${ts}`,
    namaNasabah: `Nasabah Uji ${ts}`,
    telp: `0812${randomDigits.toString().slice(0, 8)}`,
    alamat: `Jl. Percobaan No. ${ts}, Kota Malang`,
    password: "password123",
  };
}

/**
 * Generate unique data for admin unit registration.
 */
export function generateUniqueUnit() {
  const ts = Date.now().toString().slice(-6);
  const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
  return {
    username: `adm_${ts}`,
    namaUnit: `Bank Sampah Unit ${ts}`,
    namaPengelola: `Pengelola ${ts}`,
    telp: `0857${randomDigits.toString().slice(0, 8)}`,
    password: "admin123",
  };
}

/**
 * Helper to log in as nasabah via UI.
 */
export async function loginAsNasabah(page: Page, username = DEFAULT_NASABAH.username, password = DEFAULT_NASABAH.password) {
  await page.goto("/login");
  await page.waitForLoadState("domcontentloaded");

  // Ensure nasabah tab is selected
  const nasabahTab = page.locator('button:has-text("Masuk sebagai Nasabah")');
  if (await nasabahTab.isVisible()) {
    await nasabahTab.click();
  }

  await page.locator('input#username, input[name="username"]').fill(username);
  await page.locator('input#password, input[name="password"]').fill(password);
  await page.locator('button[type="submit"]:has-text("Masuk ke Sistem"), button[type="submit"]').click();

  // If success modal appears, click redirect link immediately to speed up test
  const redirectBtn = page.locator('a:has-text("Lanjut ke")');
  try {
    await redirectBtn.waitFor({ state: "visible", timeout: 10000 });
    await redirectBtn.click();
  } catch {
    // modal might have auto-redirected already
  }

  // Wait for redirect to complete
  await expect(page).not.toHaveURL(/\/login/, { timeout: 15000 });
}

/**
 * Helper to log in as admin via UI.
 */
export async function loginAsAdmin(page: Page, username = DEFAULT_ADMIN.username, password = DEFAULT_ADMIN.password) {
  await page.goto("/login");
  await page.waitForLoadState("domcontentloaded");

  const adminTab = page.locator('button:has-text("Masuk sebagai Admin Unit")');
  await adminTab.click();

  await page.locator('input#username, input[name="username"]').fill(username);
  await page.locator('input#password, input[name="password"]').fill(password);
  await page.locator('button[type="submit"]:has-text("Masuk ke Sistem"), button[type="submit"]').click();

  // If success modal appears, click redirect link immediately to speed up test
  const redirectBtn = page.locator('a:has-text("Lanjut ke")');
  try {
    await redirectBtn.waitFor({ state: "visible", timeout: 10000 });
    await redirectBtn.click();
  } catch {
    // modal might have auto-redirected already
  }

  // Wait for redirect to admin dashboard
  await expect(page).toHaveURL(/\/admin/, { timeout: 15000 });
}
