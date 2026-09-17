import { test, expect, ensureSeedData, loginAsNasabah, loginAsAdmin } from "./fixtures/test-base";

test.describe("Pengujian Non-Fungsional & Audit Console (Non-Functional Suite)", () => {
  test.beforeAll(async ({ request }) => {
    await ensureSeedData(request);
  });

  test("6.1 Responsivitas Multi-Viewport (Laptop, Tablet, Mobile)", async ({ page, consoleErrors }) => {
    // 1. Laptop Viewport (1440 x 960)
    await test.step("Uji tampilan Laptop Desktop (1440x960)", async () => {
      await page.setViewportSize({ width: 1440, height: 960 });
      await page.goto("/kategori-sampah");
      await expect(page.getByRole("heading", { level: 1, name: /Katalog/i })).toBeVisible();

      // Pastikan navbar desktop terlihat
      await expect(page.getByRole("navigation", { name: /Navigasi Utama/i })).toBeVisible();
    });

    // 2. Tablet Viewport (768 x 1024)
    await test.step("Uji tampilan Tablet (768x1024)", async () => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto("/kategori-sampah");
      await expect(page.getByRole("heading", { level: 1, name: /Katalog/i })).toBeVisible();

      // Cek apakah horizontal overflow terhindar
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // toleransi 2px sub-pixel
    });

    // 3. Mobile Viewport (390 x 844)
    await test.step("Uji tampilan Mobile Smartphone (390x844)", async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto("/login");
      await expect(page.getByRole("heading", { name: /Akses Ekosistem/i })).toBeVisible();

      // Tombol submit form login harus terlihat jelas di mobile
      const submitBtn = page.locator('button[type="submit"]');
      await expect(submitBtn).toBeVisible();
    });
  });

  test("6.2 Aksesibilitas Elemen & Semantic Role Locators", async ({ page, consoleErrors }) => {
    await test.step("Periksa elemen formulir login menggunakan getByRole & getByLabel", async () => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto("/login");

      // Periksa keberadaan elemen semantik
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("button", { name: /Masuk sebagai Nasabah/i })).toBeVisible();
      await expect(page.getByRole("button", { name: /Masuk sebagai Admin Unit/i })).toBeVisible();
      await expect(page.getByRole("button", { name: /Masuk ke/i })).toBeVisible();
    });

    await test.step("Periksa heading dan struktur semantik pada halaman katalog", async () => {
      await page.goto("/kategori-sampah");
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.getByRole("main")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();
    });
  });

  test("6.3 Audit Bebas Uncaught Page Error pada Navigasi Halaman Kunci", async ({ page, consoleErrors }) => {
    const criticalPages = [
      "/",
      "/login",
      "/register",
      "/kategori-sampah",
      "/admin/register",
    ];

    for (const path of criticalPages) {
      await test.step(`Kunjungi ${path} dan pantau console errors`, async () => {
        await page.goto(path);
        await page.waitForLoadState("domcontentloaded");

        // Periksa apakah ada unhandled page error (crash JavaScript)
        const fatalErrors = consoleErrors.filter((e) => e.type === "uncaught.pageerror");
        expect(fatalErrors.length, `Terdeteksi fatal unhandled error di ${path}: ${JSON.stringify(fatalErrors)}`).toBe(0);
      });
    }
  });
});
