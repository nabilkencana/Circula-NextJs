import { test, expect, ensureSeedData, loginAsAdmin } from "./fixtures/test-base";

test.describe("Alur Verifikasi Setoran & Laporan Bulanan (Admin Ops Suite)", () => {
  test.beforeAll(async ({ request }) => {
    await ensureSeedData(request);
  });

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test("5.1 Verifikasi Timbangan Setoran Sampah (QuickVerifyModal) & Pembaruan Poin", async ({ page, consoleErrors }) => {
    await test.step("Buka buku transaksi penyetoran admin", async () => {
      await page.goto("/admin/transaksi");
      await expect(page.getByRole("heading", { level: 1, name: /Data Transaksi Penyetoran/i })).toBeVisible({ timeout: 10000 });
    });

    await test.step("Periksa switcher STR vs TKR", async () => {
      const tkrTab = page.getByRole("button", { name: /Penukaran Poin Hadiah \(TKR\)/i });
      await tkrTab.click();
      await expect(page.locator("text=/ITEM HADIAH|KODE & TANGGAL/i").first()).toBeVisible({ timeout: 5000 });

      const strTab = page.getByRole("button", { name: /Penyetoran Sampah \(STR\)/i });
      await strTab.click();
      await expect(page.locator("text=/NASABAH PENYETOR|RINCIAN TIMBANGAN/i").first()).toBeVisible({ timeout: 5000 });
    });

    await test.step("Buka modal Timbang & Verifikasi jika terdapat antrean transaksi", async () => {
      const verifyBtn = page.locator('button:has-text("Timbang & Verifikasi")').first();
      const hasPending = await verifyBtn.isVisible();

      if (hasPending) {
        await verifyBtn.click();

        // Verifikasi QuickVerifyModal terbuka
        await expect(page.getByText(/Verifikasi Timbangan Penyetoran/i)).toBeVisible({ timeout: 5000 });

        // Verifikasi pilihan status (Selesai, Diverifikasi, Ditolak)
        await expect(page.locator('button:has-text("Selesai")').first()).toBeVisible();
        await expect(page.locator('button:has-text("Diverifikasi")').first()).toBeVisible();
        await expect(page.locator('button:has-text("Ditolak")').first()).toBeVisible();

        // Uji tombol pintas catatan (Quick Note Pills)
        const notePill = page.locator('button:has-text("Sesuai timbangan riil"), button:has-text("Kondisi bersih")').first();
        if (await notePill.isVisible()) {
          await notePill.click();
        }

        // Simpan & Verifikasi
        const saveVerifyBtn = page.locator('button:has-text("Verifikasi & Selesaikan"), button:has-text("Simpan Verifikasi")').first();
        await saveVerifyBtn.click();

        // Verifikasi toast notifikasi sukses muncul
        await expect(page.locator("text=/berhasil diselesaikan|berhasil diverifikasi/i").first()).toBeVisible({ timeout: 10000 });
      } else {
        // Jika tidak ada antrean pending, verifikasi buku transaksi tetap tampil bersih
        await expect(page.getByRole("heading", { level: 1, name: /Data Transaksi Penyetoran/i })).toBeVisible();
      }
    });
  });

  test("5.2 Rekapitulasi & Laporan Bulanan (Tonase, Valuasi Kas & Breakdown Material)", async ({ page, consoleErrors }) => {
    await test.step("Navigasi ke halaman rekapitulasi laporan admin", async () => {
      await page.goto("/admin/laporan");
      await expect(page.getByRole("heading", { level: 1, name: /Laporan Tonase & Valuasi Ekonomi Sampah/i })).toBeVisible({ timeout: 10000 });
    });

    await test.step("Verifikasi 3 KPI Cards Ringkasan Eksekutif", async () => {
      await expect(page.locator("text=/TOTAL TONASE MASUK/i").first()).toBeVisible();
      await expect(page.locator("text=/ESTIMASI VALUASI KAS/i").first()).toBeVisible();
      await expect(page.locator("text=/POIN TERDISTRIBUSI/i").first()).toBeVisible();
    });

    await test.step("Verifikasi rincian breakdown material (Plastik, Kertas, Logam, Kaca)", async () => {
      await expect(page.locator("text=/Rincian Breakdown per Jenis Material/i")).toBeVisible();
      await expect(page.locator("text=/Plastik/i").first()).toBeVisible();
      await expect(page.locator("text=/Kertas/i").first()).toBeVisible();
      await expect(page.locator("text=/Logam/i").first()).toBeVisible();
      await expect(page.locator("text=/Kaca/i").first()).toBeVisible();
    });

    await test.step("Uji filter pergantian periode bulan", async () => {
      const sepPill = page.locator('button:has-text("Sep 2026")').first();
      if (await sepPill.isVisible()) {
        await sepPill.click();
        await expect(page.locator('button:has-text("Periode: ")')).toContainText(/September 2026/i, { timeout: 5000 });
      }

      const aguPill = page.locator('button:has-text("Agu 2026")').first();
      if (await aguPill.isVisible()) {
        await aguPill.click();
        await expect(page.locator('button:has-text("Periode: ")')).toContainText(/Agustus 2026/i, { timeout: 5000 });
      }
    });

    await test.step("Verifikasi ketersediaan tombol ekspor CSV dan cetak PDF", async () => {
      await expect(page.getByRole("button", { name: /Unduh CSV/i })).toBeVisible();
      await expect(page.getByRole("button", { name: /Cetak Laporan PDF/i })).toBeVisible();
    });
  });
});

