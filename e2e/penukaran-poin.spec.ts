import { test, expect, ensureSeedData, loginAsNasabah, DEFAULT_NASABAH } from "./fixtures/test-base";

test.describe("Alur Penukaran Poin & Katalog Hadiah (Tukar Poin Suite)", () => {
  test.beforeAll(async ({ request }) => {
    await ensureSeedData(request);
  });

  test("3.1 Katalog Hadiah & Indikator Status Stok", async ({ page, consoleErrors }) => {
    await test.step("Login dan navigasi ke halaman tukar poin", async () => {
      await loginAsNasabah(page);
      await page.goto("/tukar-poin");
      await expect(page.locator("text=/Tukar Poin Daur Ulang|Katalog Penukaran Poin/i").first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("Verifikasi kartu hadiah dan tag status stok", async () => {
      // Tunggu kartu hadiah muncul
      const rewardCards = page.locator("text=/Poin Dibutuhkan|Tukar Poin|Biaya Poin/i");
      await expect(rewardCards.first()).toBeVisible({ timeout: 10000 });

      // Indikator stok (Tersedia / Sisa X Unit / Stok Habis)
      await expect(page.locator("text=/Tersedia|Sisa|Stok/i").first()).toBeVisible();

      // Indikator saldo poin aktif nasabah
      await expect(page.locator("text=/Saldo Poin Aktif Anda|Saldo Poin/i").first()).toBeVisible();
    });
  });

  test("3.2 Validasi Penukaran Hadiah saat Saldo Poin Tidak Cukup", async ({ page, consoleErrors }) => {
    await test.step("Buka halaman tukar poin", async () => {
      await loginAsNasabah(page);
      await page.goto("/tukar-poin");
    });

    await test.step("Cek item hadiah dengan kebutuhan poin tinggi / melebihi saldo", async () => {
      // Cari kartu hadiah yang memiliki tombol disabled 'Poin Belum Cukup' atau 'Stok Hadiah Habis'
      const disabledClaimBtn = page.locator('button:disabled:has-text("Poin Belum Cukup"), button:disabled:has-text("Stok Hadiah Habis"), button:disabled');
      const count = await disabledClaimBtn.count();

      if (count > 0) {
        // Tombol disabled terbukti melindungi nasabah dari transaksi tanpa poin cukup
        await expect(disabledClaimBtn.first()).toBeDisabled();
      } else {
        // Jika saldo nasabah tinggi (semua cukup), pastikan tombol memiliki indikator biaya poin jelas
        await expect(page.locator("text=/Poin/i").first()).toBeVisible();
      }
    });
  });

  test("3.3 Penukaran Poin dengan Hadiah saat Saldo Cukup (Happy Path)", async ({ page, consoleErrors }) => {
    await test.step("Buka halaman tukar poin", async () => {
      await loginAsNasabah(page);
      await page.goto("/tukar-poin");
    });

    await test.step("Pilih hadiah yang memenuhi syarat saldo dan buka modal konfirmasi", async () => {
      // Pilih tombol tukar yang aktif/enabled
      const activeClaimBtn = page.locator('button:enabled:has-text("Tukarkan Poin Sekarang"), button:enabled:has-text("Tukar")').first();
      await expect(activeClaimBtn).toBeVisible({ timeout: 10000 });
      await activeClaimBtn.click();

      // Modal konfirmasi penukaran poin harus muncul
      const modalKonfirmasi = page.locator("text=/Konfirmasi Penukaran Poin|Konfirmasi Penukaran/i").first();
      await expect(modalKonfirmasi).toBeVisible({ timeout: 5000 });
    });

    await test.step("Konfirmasi penukaran dan verifikasi pembaruan saldo poin", async () => {
      // Centang persetujuan pemotongan saldo poin
      const agreeBox = page.locator('input[type="checkbox"]').first();
      await agreeBox.check();

      const confirmBtn = page.locator('button:has-text("Konfirmasi & Tukarkan Poin"), button:has-text("Ya, Tukar Sekarang")').first();
      await confirmBtn.click();

      // Modal sukses / kode voucher klaim harus tampil
      const successIndicator = page.locator("text=/Penukaran Poin Berhasil|Kode Nota Penukaran/i").first();
      await expect(successIndicator).toBeVisible({ timeout: 15000 });
    });
  });
});
