import { test, expect, ensureSeedData, generateUniqueNasabah, generateUniqueUnit, DEFAULT_NASABAH, DEFAULT_ADMIN } from "./fixtures/test-base";

test.describe("Alur Autentikasi & Route Guard (Auth Suite)", () => {
  test.beforeAll(async ({ request }) => {
    // Pastikan data seed tersedia sebelum test berjalan
    await ensureSeedData(request);
  });

  test("1.1 Register Akun Nasabah Baru (Happy Path) dengan Validasi Real-time & Auto-Redirect", async ({ page, consoleErrors }) => {
    const data = generateUniqueNasabah();

    await test.step("Buka halaman pendaftaran nasabah", async () => {
      await page.goto("/register");
      await expect(page).toHaveTitle(/CIRCULA/);
      await expect(page.locator("text=/Pendaftaran Nasabah Baru|Ubah Sampah Terpilah/i").first()).toBeVisible();
    });

    await test.step("Isi seluruh field pendaftaran nasabah dengan data valid", async () => {
      // Username
      const usernameInput = page.locator('input#username, input[name="username"]');
      await usernameInput.fill(data.username);
      await usernameInput.blur();

      // Nama Lengkap
      const namaInput = page.locator('input#namaLengkap, input[name="namaLengkap"]');
      await namaInput.fill(data.namaNasabah);
      await namaInput.blur();

      // No WhatsApp
      const telpInput = page.locator('input#nomorWhatsapp, input[name="nomorWhatsapp"]');
      await telpInput.fill(data.telp);
      await telpInput.blur();

      // Alamat
      const alamatInput = page.locator('textarea#alamatLengkap, textarea[name="alamatLengkap"]');
      await alamatInput.fill(data.alamat);
      await alamatInput.blur();

      // Password & Confirm Password
      const passwordInput = page.locator('input#password, input[name="password"]');
      await passwordInput.fill(data.password);
      await passwordInput.blur();

      const confirmInput = page.locator('input#confirmPassword, input[name="confirmPassword"]');
      if (await confirmInput.isVisible()) {
        await confirmInput.fill(data.password);
        await confirmInput.blur();
      }

      // Check terms checkbox
      const checkbox = page.locator('[role="checkbox"]').first();
      if (await checkbox.isVisible()) {
        await checkbox.click();
      }
    });

    await test.step("Submit form pendaftaran", async () => {
      const submitBtn = page.locator('button[type="submit"]:has-text("Daftar Akun Nasabah"), button[type="submit"]').first();
      await expect(submitBtn).toBeEnabled();
      await submitBtn.click();
    });

    await test.step("Verifikasi modal sukses & auto-redirect ke /login", async () => {
      // Modal pendaftaran sukses harus muncul
      const modalHeading = page.getByText(/Pendaftaran Berhasil/i);
      await expect(modalHeading).toBeVisible({ timeout: 10000 });

      // Verifikasi link redirect langsung atau auto-redirect ke halaman /login
      const masukLink = page.getByRole("link", { name: /Masuk ke Akun Sekarang/i });
      if (await masukLink.isVisible()) {
        await masukLink.click();
      }
      await page.waitForURL((url) => url.pathname.includes("/login"), { timeout: 10000 });
      await expect(page.getByRole("heading", { name: /Akses Ekosistem/i })).toBeVisible();
    });
  });

  test("1.2 Register dengan Username yang Sudah Terdaftar (Error Path)", async ({ page, consoleErrors }) => {
    // Gunakan username yang pasti sudah ada dari seed
    const existingUsername = DEFAULT_NASABAH.username;

    await test.step("Buka form pendaftaran nasabah", async () => {
      await page.goto("/register");
    });

    await test.step("Isi form dengan username yang sudah terpakai", async () => {
      await page.locator('input#username, input[name="username"]').fill(existingUsername);
      await page.locator('input#namaLengkap, input[name="namaLengkap"]').fill("Duplikat User");
      await page.locator('input#nomorWhatsapp, input[name="nomorWhatsapp"]').fill("081299998888");
      await page.locator('textarea#alamatLengkap, textarea[name="alamatLengkap"]').fill("Jl. Contoh Duplikat No 1");
      await page.locator('input#password, input[name="password"]').fill("password123");

      const confirmInput = page.locator('input#confirmPassword, input[name="confirmPassword"]');
      if (await confirmInput.isVisible()) {
        await confirmInput.fill("password123");
      }

      // Check terms checkbox
      const checkbox = page.locator('[role="checkbox"]').first();
      if (await checkbox.isVisible()) {
        await checkbox.click();
      }

      const submitBtn = page.locator('button[type="submit"]:has-text("Daftar Akun Nasabah"), button[type="submit"]').first();
      await submitBtn.click();
    });

    await test.step("Verifikasi pesan error muncul dan tidak terjadi redirect", async () => {
      // Tunggu pesan error dari API atau banner peringatan
      const errorIndicator = page.locator("text=/sudah terdaftar|sudah digunakan|error|gagal/i").first();
      await expect(errorIndicator).toBeVisible({ timeout: 10000 });

      // URL harus tetap di halaman /register
      expect(page.url()).toContain("/register");
    });
  });

  test("1.3 Login Nasabah dengan Kredensial Benar (Happy Path)", async ({ page, consoleErrors }) => {
    await test.step("Buka halaman login", async () => {
      await page.goto("/login");
      await expect(page.getByRole("heading", { name: /Akses Ekosistem/i })).toBeVisible();
    });

    await test.step("Pilih tab Nasabah dan masukkan kredensial valid", async () => {
      const tabNasabah = page.locator('button:has-text("Masuk sebagai Nasabah")');
      if (await tabNasabah.isVisible()) {
        await tabNasabah.click();
      }

      await page.locator('input[type="text"], input[name="username"]').fill(DEFAULT_NASABAH.username);
      await page.locator('input[type="password"]').fill(DEFAULT_NASABAH.password);
    });

    await test.step("Klik masuk dan verifikasi modal sukses login", async () => {
      await page.locator('button[type="submit"]:has-text("Masuk ke Sistem"), button[type="submit"]').click();

      // Modal sukses login harus muncul (Autentikasi Berhasil!)
      await expect(page.getByText(/Autentikasi Berhasil/i)).toBeVisible({ timeout: 10000 });

      // Auto-redirect ke halaman tujuan
      await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 10000 });
      expect(page.url()).not.toContain("/login");
    });
  });

  test("1.4 Login Nasabah dengan Kredensial Salah (Error Path)", async ({ page, consoleErrors }) => {
    await test.step("Buka halaman login", async () => {
      await page.goto("/login");
    });

    await test.step("Masukkan username salah dan submit", async () => {
      await page.locator('input[type="text"], input[name="username"]').fill("user_ngawur_pasti_salah");
      await page.locator('input[type="password"]').fill("password_keliru");
      await page.locator('button[type="submit"]:has-text("Masuk ke Sistem"), button[type="submit"]').click();
    });

    await test.step("Verifikasi feedback error muncul dan tetap di halaman login", async () => {
      // Banner error atau text error harus tampil
      const errorMsg = page.locator("text=/tidak valid|salah|gagal|tidak ditemukan/i").first();
      await expect(errorMsg).toBeVisible({ timeout: 10000 });

      // Tetap di /login
      expect(page.url()).toContain("/login");
    });
  });

  test("1.5 Register Unit Bank Sampah Baru & Login Admin Unit", async ({ page, consoleErrors }) => {
    const adminData = generateUniqueUnit();

    await test.step("Buka halaman pendaftaran unit bank sampah", async () => {
      await page.goto("/admin/register");
      await expect(page.locator("text=/Daftarkan Unit Bank Sampah Anda|Formulir Pendaftaran Unit/i").first()).toBeVisible({ timeout: 10000 });
    });

    await test.step("Isi data unit bank sampah dan submit", async () => {
      await page.locator('input#namaUnit, input[name="namaUnit"]').fill(adminData.namaUnit);
      await page.locator('input#namaPengelola, input[name="namaPengelola"]').fill(adminData.namaPengelola);
      await page.locator('input#telp, input[name="telp"]').fill(adminData.telp);
      await page.locator('input#username, input[name="username"]').fill(adminData.username);
      await page.locator('input#password, input[name="password"]').fill(adminData.password);

      const confirmInput = page.locator('input#confirmPassword, input[name="confirmPassword"]');
      if (await confirmInput.isVisible()) {
        await confirmInput.fill(adminData.password);
      }

      // Check compliance checkbox
      const checkbox = page.locator('[role="checkbox"]').first();
      if (await checkbox.isVisible()) {
        await checkbox.click();
      }

      const submitBtn = page.getByRole("button", { name: /Daftarkan Unit Bank Sampah/i });
      await submitBtn.click();
    });

    await test.step("Verifikasi modal sukses pendaftaran unit", async () => {
      await expect(page.getByText(/Registrasi Unit Berhasil/i)).toBeVisible({ timeout: 10000 });
      // Klik tombol redirect ke konsol admin
      const loginLink = page.getByRole("link", { name: /Masuk ke Konsol Admin/i });
      if (await loginLink.isVisible()) {
        await loginLink.click();
      }
      await page.waitForURL((url) => url.pathname.includes("/login"), { timeout: 10000 });
    });

    await test.step("Login menggunakan akun admin unit", async () => {
      await page.locator('button:has-text("Masuk sebagai Admin Unit")').click();
      await page.locator('input[type="text"], input[name="username"]').fill(DEFAULT_ADMIN.username);
      await page.locator('input[type="password"]').fill(DEFAULT_ADMIN.password);
      await page.locator('button[type="submit"]:has-text("Masuk ke Sistem"), button[type="submit"]').click();

      // Tunggu redirect ke /admin/dashboard
      await page.waitForURL((url) => url.pathname.includes("/admin/dashboard"), { timeout: 10000 });
      await expect(page.getByRole("heading", { name: /Dashboard Operasional/i })).toBeVisible();
    });
  });

  test("1.6 Route Guard Enforcement (Proteksi Akses Halaman Admin)", async ({ page, consoleErrors }) => {
    await test.step("Akses rute terlindungi admin tanpa login", async () => {
      // Bersihkan session storage / cookies
      await page.context().clearCookies();
      await page.goto("/login");
      await page.evaluate(() => localStorage.clear());

      // Coba akses langsung ke /admin/dashboard
      await page.goto("/admin/dashboard");

      // Harus dialihkan kembali ke /login karena belum terautentikasi
      await page.waitForURL((url) => url.pathname.includes("/login"), { timeout: 10000 });
      expect(page.url()).toContain("/login");
    });
  });
});
