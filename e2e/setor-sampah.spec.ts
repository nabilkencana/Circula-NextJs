import { test, expect, ensureSeedData, loginAsNasabah, DEFAULT_NASABAH } from "./fixtures/test-base";

test.describe("Alur Setor Sampah, Katalog & Histori (Setor Suite)", () => {
  test.beforeAll(async ({ request }) => {
    await ensureSeedData(request);
  });

  test("2.1 Lihat Daftar Katalog Sampah & Estimator Poin", async ({ page, consoleErrors }) => {
    await test.step("Buka halaman katalog sampah", async () => {
      await page.goto("/kategori-sampah");
      await expect(page).toHaveTitle(/CIRCULA/);
      await expect(page.locator("text=/Katalog & Standar Harga|Katalog Komoditas/i").first()).toBeVisible();
    });

    await test.step("Verifikasi kartu komoditas menampilkan data harga/kg dan poin/kg", async () => {
      // Pastikan ada kartu sampah ter-render (misal Botol Plastik, Kardus, dll)
      const catalogCards = page.locator(".katalog-card, div:has-text('Poin / kg')");
      await expect(catalogCards.first()).toBeVisible({ timeout: 10000 });

      // Verifikasi tag harga dan poin per kg
      await expect(page.locator("text=/\\d+\\s*Poin\\s*\\/\\s*kg/i").first()).toBeVisible();
      await expect(page.locator("text=/Rp\\s*[0-9.]+/i").first()).toBeVisible();
    });

    await test.step("Buka dan uji Live Point Estimator Modal", async () => {
      const estimatorBtn = page.locator('button:has-text("Ajukan Setor Ini"), button:has-text("Hitung Estimasi Poin")').first();
      if (await estimatorBtn.isVisible()) {
        await estimatorBtn.click();
        await expect(page.locator("text=/Simulasi Nilai Setor Sampah|Kalkulator Estimasi Poin/i").first()).toBeVisible();
        // Tutup modal
        const closeBtn = page.locator("button[aria-label='Tutup modal'], button:has-text('Tutup'), button:has([data-lucide='x'])").first();
        if (await closeBtn.isVisible()) await closeBtn.click();
      }
    });
  });

  test("2.2 Validasi Pengajuan Setor Sampah Kosong / Tanpa Item", async ({ page, consoleErrors }) => {
    await test.step("Login sebagai nasabah dan buka form setor", async () => {
      await loginAsNasabah(page);
      if (!page.url().includes("/setor/ajukan")) {
        await page.goto("/setor/ajukan");
      }
      await expect(page.locator("text=/Jadwalkan Penyetoran|Formulir Penyetoran/i").first()).toBeVisible();
    });

    await test.step("Verifikasi tombol submit terproteksi jika data kosong/berat 0", async () => {
      // Hapus atau kosongkan input berat
      const weightInputs = page.locator('input[aria-label="Nilai berat dalam kilogram"], input[type="number"]');
      const count = await weightInputs.count();
      for (let i = 0; i < count; i++) {
        await weightInputs.nth(i).fill("0");
      }

      const submitBtn = page.locator('button:has-text("Kirim Pengajuan Setor"), button:has-text("Lanjut Konfirmasi")').first();
      // Tombol harus disabled atau memunculkan peringatan
      const isDisabled = await submitBtn.isDisabled();
      if (!isDisabled) {
        await submitBtn.click();
        await expect(page.locator("text=/minimal|wajib|tidak boleh 0|centang konfirmasi/i").first()).toBeVisible();
      } else {
        expect(isDisabled).toBe(true);
      }
    });
  });

  test("2.3 Ajukan Penyetoran Sampah Multi-Item & Modal Konfirmasi Pra-Submit (Happy Path)", async ({ page, consoleErrors }) => {
    await test.step("Login sebagai nasabah dan isi form setor multi-item", async () => {
      await loginAsNasabah(page);
      if (!page.url().includes("/setor/ajukan")) {
        await page.goto("/setor/ajukan");
      }

      // Tunggu input berat item pertama siap
      const firstWeight = page.locator('input[aria-label="Nilai berat dalam kilogram"]').first();
      await expect(firstWeight).toBeVisible({ timeout: 15000 });
      await firstWeight.fill("4.5");

      // Tambah item kedua
      const addItemBtn = page.locator('button:has-text("Tambah Item"), button:has-text("Tambah Jenis Sampah")').first();
      await addItemBtn.click();
      const secondWeight = page.locator('input[aria-label="Nilai berat dalam kilogram"]').nth(1);
      await expect(secondWeight).toBeVisible({ timeout: 10000 });
      await secondWeight.fill("3.0");

      // Catatan penyetoran
      const catatanInput = page.locator('textarea[placeholder*="catatan"], textarea');
      if (await catatanInput.isVisible()) {
        await catatanInput.fill("Setoran sampah pilah rumah tangga dari pengujian otomatis Playwright");
      }

      // Pastikan konfirmasi standar pemilahan 3R tercentang
      const termsBox = page.locator('[data-testid="terms-checkbox"]').first();
      await termsBox.scrollIntoViewIfNeeded();
      const isChecked = await termsBox.getAttribute("aria-checked");
      if (isChecked !== "true") {
        await termsBox.click();
      }
      await expect(termsBox).toHaveAttribute("aria-checked", "true");
    });

    await test.step("Klik Lanjut Konfirmasi dan verifikasi Modal Konfirmasi Pra-Submit", async () => {
      const lanjutBtn = page.locator('button:has-text("Kirim Pengajuan Setor"), button:has-text("Lanjut Konfirmasi")').first();
      await lanjutBtn.scrollIntoViewIfNeeded();
      await lanjutBtn.click();

      // Modal konfirmasi harus tampil dengan rincian sebelum dikirim ke API
      await expect(page.locator("text=/Konfirmasi Pengajuan Penyetoran|Ringkasan Pengajuan/i").first()).toBeVisible({ timeout: 10000 });
      await expect(page.locator("text=/Total Estimasi/i").first()).toBeVisible();
      await expect(page.locator("text=/Poin/i").first()).toBeVisible();
    });

    await test.step("Konfirmasi submit dan verifikasi penerbitan kode setor", async () => {
      const confirmSubmitBtn = page.getByRole("button", { name: /Ya, Ajukan Setor Sekarang/i });
      await confirmSubmitBtn.click();

      // Modal sukses harus menampilkan kode transaksi STR
      await expect(page.locator("text=/Pengajuan Setor Berhasil|Pengajuan Berhasil/i").first()).toBeVisible({ timeout: 15000 });
      await expect(page.locator("text=/STR-/i").first()).toBeVisible();
    });
  });

  test("2.4 Status & Histori Penyetoran dengan Filter Bulan & Status", async ({ page, consoleErrors }) => {
    await test.step("Login dan buka halaman riwayat penyetoran", async () => {
      await loginAsNasabah(page);
      await page.goto("/setor/status");
      await expect(page.locator("text=/Status & Verifikasi|Status & Histori/i").first()).toBeVisible();
    });

    await test.step("Verifikasi Card Saldo Poin Prominent", async () => {
      // Card saldo terkemuka harus menampilkan poin dan ringkasan
      await expect(page.locator("text=/Saldo Poin/i").first()).toBeVisible();
    });

    await test.step("Uji filter status penyetoran", async () => {
      // Filter status Selesai
      const selesaiTab = page.locator('button:has-text("Selesai")').first();
      await selesaiTab.click();
      await expect(page).toHaveURL(/status=selesai/);

      // Filter status Semua / Menunggu
      const allTab = page.locator('button:has-text("Semua Status"), button:has-text("Menunggu Konfirmasi")').first();
      await allTab.click();
    });
  });

  test("2.5 Cetak & Lihat Struk Nota Transaksi Digital", async ({ page, consoleErrors }) => {
    await test.step("Buka struk nota penyetoran", async () => {
      await loginAsNasabah(page);
      await page.goto("/setor/status");

      // Switch ke tab Selesai agar transaksi selesai tampil
      const selesaiTab = page.locator('button:has-text("Selesai")').first();
      if (await selesaiTab.isVisible()) {
        await selesaiTab.click();
      }

      // Cari tombol lihat nota / cetak struk pertama
      const notaLink = page.locator('a[href*="/nota/"]').first();
      if (await notaLink.isVisible()) {
        await notaLink.click();
      } else {
        await page.goto("/nota/213f9d3e-6290-4ce9-9144-591fc192e208");
      }

      await expect(page.locator("text=/Bukti Transaksi & Struk Nota Digital|Nota Penyetoran/i").first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("Verifikasi elemen struk nota digital resmi", async () => {
      // Nomor transaksi & header unit
      await expect(page.locator("text=/Nomor Transaksi|Bank Sampah|Circula/i").first()).toBeVisible({ timeout: 10000 });

      // Tombol Cetak & Unduh PDF tersedia
      await expect(page.locator('button:has-text("Cetak"), button:has-text("Print")').first()).toBeVisible();
      await expect(page.locator('button:has-text("Unduh PDF"), button:has-text("PDF"), button:has-text("Download")').first()).toBeVisible();
    });
  });
});
