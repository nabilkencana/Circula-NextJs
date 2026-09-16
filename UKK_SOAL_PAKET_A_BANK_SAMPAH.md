# UJI KOMPETENSI KEAHLIAN (UKK) TAHUN PELAJARAN 2026/2027
## SOAL UJI KOMPETENSI - PAKET A
- **Satuan Pendidikan**: Sekolah Menengah Kejuruan (SMK Telkom Malang)
- **Kompetensi Keahlian**: Rekayasa Perangkat Lunak (RPL)
- **Bentuk Soal**: Penugasan Perorangan (Praktik)
- **Judul Tugas**: Aplikasi Bank Sampah Digital & Daur Ulang (Eco-Waste Management System)
- **Paket Soal**: Paket A
- **API Base URL**: `https://learn.smktelkom-mlg.sch.id/bank_sampah/`

---

## I. GAMBAR KERJA & KEBUTUHAN FITUR SISTEM

Sistem dikembangkan untuk dua jenis pengguna: **Nasabah (Siswa / Masyarakat)** dan **Admin Bank Sampah**.

### 1. Kebutuhan Fitur Nasabah
1. **Registrasi Akun**: Nasabah dapat register mandiri sebagai pengguna baru (mendukung upload foto profil).
2. **Login**: Nasabah dapat login ke aplikasi menggunakan username dan password.
3. **Katalog Kategori Sampah**: Melihat daftar jenis sampah daur ulang beserta harga per kg (Rp/kg) dan nilai reward poin per kg.
4. **Pengajuan Penyetoran Sampah**: Mengajukan penyetoran sampah (multi-item: memilih jenis sampah, estimasi berat dalam Kg, tanggal penyetoran, dan catatan penjemputan/pengantaran).
5. **Monitoring Status Penyetoran**: Melihat status pengajuan (`menunggu_konfirmasi`, `diverifikasi`, `ditolak`, `selesai`).
6. **Buku Tabungan & Histori**: Melihat saldo poin saat ini dan histori penyetoran berdasarkan filter bulan (`?bulan=YYYY-MM`).
7. **Penukaran Poin (Redeem Rewards)**: Melakukan penukaran akumulasi poin dengan voucher pulsa, sembako, atau hadiah yang tersedia.
8. **Cetak Nota & Bukti Transaksi**: Mencetak/mengunduh bukti tanda terima digital (STR-XXXX untuk setor, TKR-XXXX untuk penukaran poin).

### 2. Kebutuhan Fitur Admin Bank Sampah
1. **Registrasi Unit Bank Sampah**: Mendaftarkan identitas unit bank sampah baru (nama unit, nama pengelola, no telp).
2. **Login Admin**: Login ke portal/konsol pengelolaan unit bank sampah.
3. **Profil Unit**: Melihat dan memperbarui data profil unit bank sampah.
4. **CRUD Data Nasabah**: Mengelola data nasabah (tambah nasabah baru, lihat daftar nasabah, detail, perbarui data, hapus).
5. **CRUD Kategori Sampah**: Mengelola master jenis sampah (nama kategori, harga beli per kg, reward poin per kg, jenis: `plastik`, `kertas`, `logam`, `kaca`, dan foto sampel).
6. **CRUD Katalog Hadiah / Voucher**: Mengelola data barang/voucher reward penukaran poin (nama hadiah, poin dibutuhkan, stok, foto produk).
7. **Verifikasi & Penimbangan Lapangan**: Mengonfirmasi pengajuan setor, menimbang ulang bobot riil (`beratKgReal`), menghitung poin aktual, serta mengubah status transaksi.
8. **Histori Transaksi Keseluruhan**: Melihat seluruh data transaksi penyetoran dan penukaran poin nasabah dengan filter status dan bulan.
9. **Rekapitulasi & Laporan Bulanan**: Rekapitulasi total tonase sampah (Kg dan Ton), estimasi pembayaran rupiah ke nasabah, dan poin diterbitkan/ditukarkan per bulan.

---

## II. ENTITAS DATABASE (ERD)
1. **users**: `id` (PK), `username`, `password`, `role` (ENUM: `admin_bank`, `nasabah`)
2. **nasabah**: `id` (PK), `nama_nasabah`, `alamat`, `telp`, `saldo_poin`, `foto`, `FK id_user`
3. **admin_bank**: `id` (PK), `nama_unit`, `nama_pengelola`, `telp`, `FK id_user`
4. **kategori_sampah**: `id` (PK), `nama_kategori`, `harga_per_kg`, `poin_per_kg`, `jenis` (ENUM: `plastik`, `kertas`, `logam`, `kaca`), `foto`
5. **setor_sampah**: `id` (PK), `kode_setor`, `tanggal`, `FK id_admin`, `FK id_nasabah`, `status` (ENUM: `menunggu_konfirmasi`, `diverifikasi`, `selesai`, `ditolak`), `total_berat_kg`, `estimasi_total_poin`, `catatan`
6. **detail_setor**: `id` (PK), `FK id_setor`, `FK id_kategori_sampah`, `berat_kg`, `subtotal_poin`
7. **hadiah**: `id` (PK), `nama_hadiah`, `poin_dibutuhkan`, `stok`, `foto`
8. **penukaran_poin**: `id` (PK), `kode_penukaran`, `tanggal`, `FK id_setor / id_nasabah`, `FK id_hadiah`, `poin_terpakai`, `status` (ENUM: `diproses`, `selesai`)

---

## III. ATURAN GLOBAL KONTRAK REST API

1. **Mekanisme Multi-Tenant (Header `x-app-key`)**:
   - Seluruh request ke backend (kecuali registrasi/login maker siswa) **WAJIB** menyertakan header:
     `x-app-key: <appKey_milik_siswa>`
   - App Key diperoleh saat pendaftaran App Maker di `POST /api/v1/maker/register`.
2. **Autentikasi Pengguna (JWT Bearer Token)**:
   - Endpoint yang membutuhkan hak akses Nasabah atau Admin wajib menyertakan header:
     `Authorization: Bearer <token_jwt>`
3. **Format Respons Standar**:
   - Sukses:
     ```json
     {
       "statusCode": 200,
       "success": true,
       "message": "keterangan",
       "data": { ... }
     }
     ```
   - Gagal:
     ```json
     {
       "statusCode": 400,
       "success": false,
       "message": "pesan error",
       "errors": null,
       "timestamp": "2026-08-26T09:35:50.328Z"
     }
     ```
4. **Inisialisasi Cepat (Seed Data)**:
   - Peserta dapat menjalankan `POST /api/v1/seed` dengan header `x-app-key` untuk menghasilkan:
     - 1 Akun Admin (`admin_banksampah` / `admin123`)
     - 2 Akun Nasabah aktif (`nasabah_budi` & `nasabah_siti` / `password123`)
     - 4 Kategori Sampah baku (Botol Plastik PET, Kardus Bekas, Kaleng Aluminium, Botol Kaca)
     - 3 Katalog Hadiah (Voucher Pulsa 25k, Minyak Goreng 1L, Beras 2.5kg)
     - Transaksi setor dan penukaran sample

---

## IV. DAFTAR LENGKAP ENDPOINT (37 ENDPOINTS)

### 1. App Maker (Akun Siswa Frontend)
- `POST /api/v1/maker/register` : Registrasi Siswa baru -> dapat `appKey` & `token`
- `POST /api/v1/maker/login` : Login Akun Siswa Frontend
- `GET /api/v1/maker/profile` : Profil Siswa & Statistik Keseluruhan Data (`x-app-key`)
- `GET /api/v1/maker/check-key?email=...` : Cari App Key berdasarkan Email Siswa

### 2. Autentikasi Pengguna
- `POST /api/v1/auth/nasabah/register` : Registrasi Akun Nasabah Baru (upload foto)
- `POST /api/v1/auth/admin/register` : Pendaftaran Unit Bank Sampah Baru
- `POST /api/v1/auth/login` : Login User (Nasabah maupun Admin Bank)
- `GET /api/v1/auth/me` : Cek Profil & Role User yang Sedang Login (`Bearer`)

### 3. Admin: CRUD Data Nasabah
- `GET /api/v1/admin/nasabah` : Daftar seluruh nasabah
- `POST /api/v1/admin/nasabah` : Tambah nasabah baru
- `GET /api/v1/admin/nasabah/{id}` : Detail data nasabah
- `PUT /api/v1/admin/nasabah/{id}` : Update data nasabah
- `DELETE /api/v1/admin/nasabah/{id}` : Hapus data nasabah

### 4. Kategori Sampah Daur Ulang
- `GET /api/v1/kategori-sampah` : Daftar kategori sampah, harga/kg & poin/kg
- `POST /api/v1/kategori-sampah` : Tambah kategori baru (Admin)
- `GET /api/v1/kategori-sampah/{id}` : Detail kategori sampah
- `PUT /api/v1/kategori-sampah/{id}` : Update kategori sampah (Admin)
- `DELETE /api/v1/kategori-sampah/{id}` : Hapus kategori sampah (Admin)

### 5. Penyetoran Sampah (Pengajuan & Verifikasi Timbangan)
- `POST /api/v1/setor-sampah/pengajuan` : Nasabah mengajukan penyetoran sampah (multi-item)
- `GET /api/v1/setor-sampah/my-setor` : Histori & status penyetoran sendiri (`?bulan=YYYY-MM`)
- `GET /api/v1/setor-sampah/admin/list` : Admin list pengajuan penyetoran (`?status=...&bulan=...`)
- `GET /api/v1/setor-sampah/{id}` : Detail transaksi / Struk nota penyetoran
- `PUT /api/v1/setor-sampah/admin/verify/{id}` : Admin verifikasi timbangan real & status

### 6. Katalog Hadiah & Voucher Penukaran
- `GET /api/v1/hadiah` : Katalog hadiah / voucher
- `POST /api/v1/hadiah` : Tambah hadiah baru (Admin)
- `GET /api/v1/hadiah/{id}` : Detail hadiah
- `PUT /api/v1/hadiah/{id}` : Update hadiah (Admin)
- `DELETE /api/v1/hadiah/{id}` : Hapus hadiah (Admin)

### 7. Penukaran Poin & Nota Transaksi
- `POST /api/v1/penukaran-poin/tukar` : Nasabah menukar poin dengan hadiah
- `GET /api/v1/penukaran-poin/my-penukaran` : Histori penukaran poin milik nasabah
- `GET /api/v1/penukaran-poin/admin/list` : Admin list seluruh transaksi penukaran (`?bulan=YYYY-MM`)
- `PUT /api/v1/penukaran-poin/admin/status/{id}` : Admin update status penukaran (`diproses` / `selesai`)
- `GET /api/v1/penukaran-poin/nota/{id}` : Struk bukti nota transaksi penukaran

### 8. Admin: Rekapitulasi & Laporan Bulanan
- `GET /api/v1/rekapitulasi/bulanan?bulan=YYYY-MM` : Rekap total tonase (Kg & Ton), estimasi pembayaran rupiah, breakdown jenis sampah (plastik, kertas, logam, kaca), dan poin terpakai.

### 9. Dashboard & Analytics
- `GET /api/v1/dashboard/summary` : Ringkasan nasabah (saldo saat ini, total kg, total poin didapat, total poin ditukar, transaksi terakhir)
- `GET /api/v1/dashboard/stats` : Statistik admin (total nasabah, kategori, transaksi setor, hadiah, total tonase kg, total poin)

### 10. Testing & Utility
- `POST /api/v1/seed` : Inisialisasi data contoh (admin, nasabah, 4 kategori sampah, 3 hadiah, transaksi)

---

## V. SPESIFIKASI DTO KUNCI

| DTO | Field Kunci | Keterangan |
|---|---|---|
| `RegisterAppMakerDto` | `email`, `password`, `namaSiswa`, `kelas`, `namaApp` | Mendapatkan `appKey` |
| `RegisterNasabahBankDto` | `username`, `password`, `namaNasabah`, `alamat`, `telp`, `foto` | Registrasi nasabah |
| `RegisterAdminBankDto` | `username`, `password`, `namaUnit`, `namaPengelola`, `telp` | Pendaftaran unit baru |
| `LoginUserDto` | `username`, `password` | Login Nasabah / Admin |
| `CreateKategoriSampahDto`| `namaKategori`, `hargaPerKg`, `poinPerKg`, `jenis`, `foto` | `jenis`: plastik/kertas/logam/kaca |
| `CreateSetorSampahDto` | `tanggal`, `catatan`, `items: [{kategoriSampahId, beratKg}]` | Pengajuan setor nasabah |
| `VerifySetorSampahDto` | `status`, `catatanAdmin`, `itemsReal: [{kategoriSampahId, beratKgReal}]` | Verifikasi timbangan |
| `CreateHadiahDto` | `namaHadiah`, `poinDibutuhkan`, `stok`, `foto` | Master katalog reward |
| `CreatePenukaranPoinDto` | `hadiahId` | Klaim hadiah dengan poin |
