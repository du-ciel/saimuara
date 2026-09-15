# Dokumentasi Sistem Monitoring Saimuara

Dokumen ini menjelaskan struktur database, arsitektur *role* pengguna, serta spesifikasi tabel-tabel yang digunakan dalam Sistem Monitoring Saimuara dari Dinas Kelautan dan Perikanan (DKP) Provinsi Lampung.

---

## 1. Role & Akses Pengguna

Sistem ini membagi pengguna (user) ke dalam dua *role* utama yang menentukan hak akses dan visibilitas data mereka.

1. **Admin Provinsi (Lampung)**
   - Bertugas sebagai super-admin untuk memonitoring.
   - Dapat melihat, mencari, dan memantau seluruh data dari berbagai kabupaten/kota.
2. **Admin Kabupaten**
   - Bertugas sebagai admin di tingkat daerah/kabupaten.
   - Hanya dapat melakukan *input* (entry data) dan melihat data yang terikat (berelasi) dengan wilayah kabupatennya sendiri.

### Akun Uji Coba (Seeder)
Sistem dilengkapi dengan akun *default* (seeder) untuk memudahkan proses *testing* dan *development*:

| Nama | Email | Password | Role | Kabupaten |
| --- | --- | --- | --- | --- |
| Admin Provinsi Lampung | `admin_provinsi@dkp.lampung.go.id` | `password` | `admin_provinsi` | `null` |
| Admin Kabupaten Pesawaran | `admin_pesawaran@dkp.lampung.go.id` | `password` | `admin_kabupaten` | `Pesawaran` |
| Admin Kab. Lampung Selatan | `admin_lamsel@dkp.lampung.go.id` | `password` | `admin_kabupaten` | `Lampung Selatan` |

---

## 2. Struktur Database (Schema)

Sistem menggunakan database relasional SQL (MySQL/MariaDB/SQLite). Berikut adalah rincian masing-masing tabel:

### A. Tabel `users`
Tabel bawaan Laravel yang dimodifikasi untuk menampung akses login dan hak akses.

| Kolom | Tipe Data | Keterangan |
| --- | --- | --- |
| `id` | BigInt | Primary Key |
| `name` | String | Nama Pengguna |
| `email` | String | Email untuk login |
| `password` | String | Password terenkripsi (Bcrypt) |
| `role` | String | Tipe akun (`admin_provinsi` atau `admin_kabupaten`) |
| `kabupaten` | String | Nama kabupaten (Nullable). Kosong jika admin provinsi. |
| `created_at` / `updated_at` | Timestamp | Waktu pembuatan / modifikasi record |

---

### B. Tabel `pokdakans` (Data Profil Penerima Bantuan)
Digunakan sebagai data master (diinput satu kali di awal) untuk mencatat identitas Kelompok Pembudidaya Ikan dan bantuan fisik yang mereka terima.

| Kolom | Tipe Data | Keterangan |
| --- | --- | --- |
| `id` | BigInt | Primary Key |
| `user_id` | BigInt | Foreign key ke tabel `users` (Siapa yang menginput) |
| `nama_pokdakan` | String | Nama kelompok penerima |
| `nama_ketua` | String | Nama ketua kelompok |
| `no_whatsapp` | String | Kontak yang bisa dihubungi |
| `pekon_desa` | String | Nama Desa/Pekon |
| `kecamatan` | String | Nama Kecamatan |
| `kabupaten_kota` | String | Nama Kabupaten/Kota |
| `no_badan_hukum_sk` | String | Legalitas (Opsional) |
| `latitude` / `longitude` | String | Koordinat GPS (Opsional) |
| `tahun_anggaran` | Integer | Tahun diterimanya bantuan (misal: 2024) |
| `jumlah_mesin_pakan` | Integer | Jumlah fisik mesin pakan yang diterima |
| `spesifikasi_mesin` | Text | Spesifikasi mesin pakan (Opsional) |
| `jumlah_kolam_ras` | Integer | Jumlah fisik kolam mini RAS yang diterima |
| `spesifikasi_kolam` | Text | Spesifikasi kolam mini RAS (Opsional) |
| `created_at` / `updated_at` | Timestamp | - |

---

### C. Tabel `laporan_mesin_pakans`
Digunakan untuk mencatat pelaporan rutin secara berkala terkait operasional dan utilisasi Mesin Pakan Mandiri.

| Kolom | Tipe Data | Keterangan |
| --- | --- | --- |
| `id` | BigInt | Primary Key |
| `pokdakan_id` | BigInt | Foreign key ke tabel `pokdakans` |
| `tanggal_input` | Date | Tanggal pelaporan |
| `status_mesin` | String | Kondisi mesin (Baik / Rusak Ringan / Rusak Berat) |
| `produksi_pakan_kg` | Decimal | Total produksi pakan dalam hitungan kilogram |
| `bahan_baku_utama` | String | Komposisi bahan yang digunakan (misal: tepung ikan, dedak) |
| `biaya_produksi_per_kg`| Decimal | Estimasi biaya per kilogram pakan |
| `keterangan_kendala` | Text | Catatan tambahan atau kendala operasional (Opsional) |
| `created_at` / `updated_at` | Timestamp | - |

---

### D. Tabel `laporan_kolam_ras`
Digunakan untuk mencatat laporan rutin aktivitas budidaya ikan di Kolam Mini RAS, mulai dari awal tebar (Siklus) hingga data panen.

| Kolom | Tipe Data | Keterangan |
| --- | --- | --- |
| `id` | BigInt | Primary Key |
| `pokdakan_id` | BigInt | Foreign key ke tabel `pokdakans` |
| `tanggal_input` | Date | Tanggal pelaporan |
| `siklus_ke` | Integer | Menandakan urutan siklus panen ke-berapa |
| `status_siklus` | String | Status budidaya (misal: 'Berjalan', 'Panen', 'Gagal') |
| `tanggal_tebar` | Date | Tanggal awal benih ditebar |
| `komoditas_ikan` | String | Jenis ikan (Lele, Nila, dsb) |
| `jumlah_benih_ekor` | Integer | Total benih yang masuk |
| `ukuran_benih_cm` | String | Ukuran saat tebar (misal: 3-5 cm) |
| `kondisi_air` | Text | (Opsional) Kualitas air (suhu, DO, pH) |
| `kendala_penyakit` | Text | (Opsional) Hambatan teknis atau serangan penyakit |
| `tanggal_panen` | Date | (Opsional) Tanggal pemanenan |
| `total_panen_kg` | Decimal | (Opsional) Total bobot ikan yang dipanen |
| `harga_jual_per_kg` | Decimal | (Opsional) Harga di tingkat tengkulak/pasar |
| `total_pendapatan` | Decimal | (Opsional) Total omzet (`total_panen_kg` x `harga_jual_per_kg`) |
| `created_at` / `updated_at` | Timestamp | - |

---

## 3. Relasi (Relationships)
1. **User (1) - Pokdakan (N)**: Seorang Admin Kabupaten (`User`) dapat menginput dan mengelola banyak Kelompok Penerima (`Pokdakan`). Relasi ini melalui `user_id` di tabel `pokdakans`.
2. **Pokdakan (1) - Laporan Mesin Pakan (N)**: Satu kelompok (`Pokdakan`) akan memiliki banyak riwayat (`LaporanMesinPakan`) yang dilaporkan setiap periodenya. Relasi ini melalui `pokdakan_id` di tabel laporan.
3. **Pokdakan (1) - Laporan Kolam RAS (N)**: Satu kelompok (`Pokdakan`) akan memiliki banyak riwayat budidaya/panen (`LaporanKolamRas`). Relasi ini melalui `pokdakan_id` di tabel laporan.
