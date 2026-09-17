import { test, expect, ensureSeedData, loginAsAdmin } from "./fixtures/test-base";

test.describe("Alur Manajemen Operasional Admin (Admin CRUD Suite)", () => {
  test.beforeAll(async ({ request }) => {
    await ensureSeedData(request);
  });

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test("4.1 CRUD Data Nasabah Bank Sampah", async ({ page, consoleErrors }) => {
    const ts = Date.now().toString().slice(-4);
    const newUsername = `nas_test_${ts}`;
    const newName = `Nasabah Uji ${ts}`;

    await test.step("Navigasi ke halaman manajemen data nasabah", async () => {
      await page.goto("/admin/nasabah");
      await expect(page.getByRole("heading", { level: 1, name: /Manajemen & Buku Induk/i })).toBeVisible({ timeout: 10000 });
    });

    await test.step("Buka modal drawer tambah nasabah baru", async () => {
      const addBtn = page.getByRole("button", { name: /Tambah Nasabah Baru/i });
      await addBtn.click();
      await expect(page.getByText(/Tambah Data Nasabah Manual/i)).toBeVisible({ timeout: 5000 });
    });

    await test.step("Isi data nasabah baru dan submit", async () => {
      await page.locator('input[placeholder*="Budi Santoso"]').fill(newName);
      await page.locator('input[placeholder*="nasabah_budi"]').fill(newUsername);
      await page.locator('input[type="password"]').fill("password123");
      await page.locator('input[placeholder*="085678901234"]').fill("081234567899");
      await page.locator('textarea[placeholder*="Sukun"]').fill("Jl. Melati No. 10, RT 03/05, Malang");

      await page.getByRole("button", { name: /Simpan Data Nasabah/i }).click();
    });

    await test.step("Verifikasi data nasabah baru muncul di tabel", async () => {
      await expect(page.locator(`text=${newName}`).first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("Uji pembatalan pada Modal Konfirmasi Hapus", async () => {
      const row = page.locator(`tr:has-text("${newName}")`).first();
      const deleteBtn = row.locator("button[title='Hapus Nasabah']");
      await deleteBtn.click();

      // Modal konfirmasi hapus kustom harus muncul
      const confirmDialog = page.getByText(/Hapus Data Nasabah\?/i);
      await expect(confirmDialog).toBeVisible({ timeout: 5000 });

      // Klik Batal
      const cancelBtn = page.getByRole("button", { name: /Batal/i });
      await cancelBtn.click();

      // Data masih tetap ada
      await expect(page.locator(`text=${newName}`).first()).toBeVisible();
    });
  });

  test("4.2 CRUD Master Kategori Sampah Daur Ulang", async ({ page, consoleErrors }) => {
    const ts = Date.now().toString().slice(-4);
    const catName = `Plastik HDPE ${ts}`;

    await test.step("Navigasi ke halaman manajemen kategori sampah", async () => {
      await page.goto("/admin/kategori-sampah");
      await expect(page.getByRole("heading", { level: 1, name: /Master Kategori/i })).toBeVisible({ timeout: 10000 });
    });

    await test.step("Buka modal tambah kategori baru", async () => {
      const addBtn = page.getByRole("button", { name: /Tambah Kategori Baru/i });
      await addBtn.click();
      await expect(page.getByText(/Tambah Kategori Baru/i).first()).toBeVisible({ timeout: 5000 });
    });

    await test.step("Isi data kategori dan submit", async () => {
      await page.locator('input[placeholder*="Botol Plastik PET"]').fill(catName);
      await page.locator('input[placeholder="3500"]').fill("4000");
      await page.locator('input[placeholder="10"]').fill("12");
      await page.locator('textarea[placeholder*="Botol bening mineral"]').fill("Plastik botol bersih dan kering.");

      const submitBtn = page.getByRole("button", { name: /Simpan Master Kategori/i });
      await submitBtn.click();
    });

    await test.step("Verifikasi kategori baru tampil di daftar", async () => {
      await expect(page.locator(`text=${catName}`).first()).toBeVisible({ timeout: 10000 });
    });
  });

  test("4.3 CRUD Master Katalog Hadiah & Voucher", async ({ page, consoleErrors }) => {
    const ts = Date.now().toString().slice(-4);
    const rewardName = `Voucher Pulsa ${ts}`;

    await test.step("Navigasi ke halaman katalog hadiah admin", async () => {
      await page.goto("/admin/hadiah");
      await expect(page.getByRole("heading", { name: /Master Katalog Hadiah/i })).toBeVisible({ timeout: 10000 });
    });

    await test.step("Buka form tambah hadiah baru", async () => {
      const addBtn = page.getByRole("button", { name: /Tambah Hadiah Baru/i });
      await addBtn.click();
      await expect(page.getByText(/Tambah Hadiah Baru/i).first()).toBeVisible({ timeout: 5000 });
    });

    await test.step("Isi form hadiah dan submit", async () => {
      await page.locator('input[placeholder*="Minyak Goreng"]').fill(rewardName);
      await page.locator('input[placeholder="75"]').fill("50");
      await page.locator('input[placeholder="50"]').fill("25");
      await page.locator('textarea[placeholder*="Kebutuhan pokok"]').fill("Voucher belanja pulsa/data elektrik.");

      const submitBtn = page.getByRole("button", { name: /Simpan Master Hadiah/i });
      await submitBtn.click();
    });

    await test.step("Verifikasi kartu hadiah baru muncul di inventori", async () => {
      await expect(page.locator(`text=${rewardName}`).first()).toBeVisible({ timeout: 10000 });
    });
  });

  test("4.4 Update Profil Unit Bank Sampah dengan Modal Konfirmasi Diff", async ({ page, consoleErrors }) => {
    await test.step("Buka halaman profil unit bank sampah", async () => {
      await page.goto("/admin/profil");
      await expect(page.getByRole("heading", { level: 1, name: /Profil & Pengaturan Unit Operasional/i })).toBeVisible({ timeout: 10000 });
      // Tunggu hingga data unit selesai di-fetch dari API
      await expect(page.locator('input[name="namaUnit"]')).not.toHaveValue("", { timeout: 10000 });
    });

    await test.step("Ubah data profil unit dan pastikan seluruh field wajib terisi", async () => {
      const pengelolaInput = page.locator('input[name="namaPengelola"]');
      await pengelolaInput.fill("Bapak H. Sukirman Update");

      const alamatInput = page.locator('textarea[name="alamatLengkap"]');
      await alamatInput.fill("Balai RW 05, Jl. Danau Ranau No. 1, Malang");

      const jamInput = page.locator('input[name="jamOperasional"]');
      await jamInput.fill("Sabtu & Minggu (08:00 - 15:00 WIB)");

      const kapasitasInput = page.locator('input[name="kapasitasGudang"]');
      await kapasitasInput.fill("Maks. 5 Ton / Periode");

      const simpanBtn = page.getByRole("button", { name: /Simpan Pembaruan Profil/i });
      await simpanBtn.click();
    });

    await test.step("Verifikasi Modal Konfirmasi Simpan Profil (Diff Preview)", async () => {
      // Modal konfirmasi diff harus muncul sebelum submit
      await expect(page.getByText(/Konfirmasi Perubahan Profil Unit/i)).toBeVisible({ timeout: 5000 });

      // Klik Ya, Simpan Perubahan Profil
      const confirmBtn = page.getByRole("button", { name: /Ya, Simpan Perubahan Profil/i });
      await confirmBtn.click();

      // Toast feedback sukses harus muncul
      await expect(page.locator("text=/berhasil disimpan/i").first()).toBeVisible({ timeout: 10000 });
    });
  });
});

