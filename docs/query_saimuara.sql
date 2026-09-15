-- =========================================================================
-- Kumpulan Query untuk Sistem Monitoring DKP Lampung
-- File ini mencakup DDL (Create Database & Tables) beserta DML (Insert Data).
-- Anda dapat menjalankan ini di phpMyAdmin, DBeaver, atau database client lainnya.
-- =========================================================================

-- =========================================================================
-- 1. CREATE DATABASE & TABLES
-- =========================================================================

CREATE DATABASE IF NOT EXISTS saimuara;
USE saimuara;

-- 1A. Tabel users
CREATE TABLE IF NOT EXISTS users (
    id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    email_verified_at timestamp NULL DEFAULT NULL,
    password varchar(255) NOT NULL,
    role varchar(255) NOT NULL DEFAULT 'admin_kabupaten',
    kabupaten varchar(255) DEFAULT NULL,
    remember_token varchar(100) DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY users_email_unique (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1B. Tabel pokdakans (Data Profil Penerima Bantuan)
CREATE TABLE IF NOT EXISTS pokdakans (
    id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    user_id bigint(20) unsigned NOT NULL,
    nama_pokdakan varchar(255) NOT NULL,
    nama_ketua varchar(255) NOT NULL,
    no_whatsapp varchar(255) NOT NULL,
    pekon_desa varchar(255) NOT NULL,
    kecamatan varchar(255) NOT NULL,
    kabupaten_kota varchar(255) NOT NULL,
    no_badan_hukum_sk varchar(255) DEFAULT NULL,
    latitude varchar(255) DEFAULT NULL,
    longitude varchar(255) DEFAULT NULL,
    tahun_anggaran int(11) NOT NULL,
    jumlah_mesin_pakan int(11) NOT NULL DEFAULT '0',
    spesifikasi_mesin text DEFAULT NULL,
    jumlah_kolam_ras int(11) NOT NULL DEFAULT '0',
    spesifikasi_kolam text DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    PRIMARY KEY (id),
    KEY pokdakans_user_id_foreign (user_id),
    CONSTRAINT pokdakans_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1C. Tabel laporan_mesin_pakans (Laporan Rutin Pemanfaatan Mesin Pakan)
CREATE TABLE IF NOT EXISTS laporan_mesin_pakans (
    id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    pokdakan_id bigint(20) unsigned NOT NULL,
    tanggal_input date NOT NULL,
    status_mesin varchar(255) NOT NULL,
    produksi_pakan_kg decimal(10,2) NOT NULL DEFAULT '0.00',
    bahan_baku_utama varchar(255) NOT NULL,
    biaya_produksi_per_kg decimal(12,2) NOT NULL DEFAULT '0.00',
    keterangan_kendala text DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    PRIMARY KEY (id),
    KEY laporan_mesin_pakans_pokdakan_id_foreign (pokdakan_id),
    CONSTRAINT laporan_mesin_pakans_pokdakan_id_foreign FOREIGN KEY (pokdakan_id) REFERENCES pokdakans (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1D. Tabel laporan_kolam_ras (Laporan Rutin Budidaya dan Panen Kolam RAS)
CREATE TABLE IF NOT EXISTS laporan_kolam_ras (
    id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    pokdakan_id bigint(20) unsigned NOT NULL,
    tanggal_input date NOT NULL,
    siklus_ke int(11) NOT NULL,
    status_siklus varchar(255) NOT NULL,
    tanggal_tebar date NOT NULL,
    komoditas_ikan varchar(255) NOT NULL,
    jumlah_benih_ekor int(11) NOT NULL,
    ukuran_benih_cm varchar(255) NOT NULL,
    kondisi_air text DEFAULT NULL,
    kendala_penyakit text DEFAULT NULL,
    tanggal_panen date DEFAULT NULL,
    total_panen_kg decimal(10,2) DEFAULT NULL,
    harga_jual_per_kg decimal(12,2) DEFAULT NULL,
    total_pendapatan decimal(15,2) DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    PRIMARY KEY (id),
    KEY laporan_kolam_ras_pokdakan_id_foreign (pokdakan_id),
    CONSTRAINT laporan_kolam_ras_pokdakan_id_foreign FOREIGN KEY (pokdakan_id) REFERENCES pokdakans (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =========================================================================
-- 2. QUERY INSERT ADMIN (1 PROVINSI + 15 KABUPATEN/KOTA LAMPUNG)
-- =========================================================================
-- Password untuk semua akun adalah: password
INSERT INTO users (name, email, password, role, kabupaten, created_at, updated_at) VALUES 
('Admin Provinsi Lampung', 'admin.provinsi@dkp.lampung.go.id', '$2y$12$N9/r5q8s1Pq.Ym3s/xX6P.uFhZkKz0D1q9K1W2Y.pT/y3G8Hq3C.y', 'admin_provinsi', NULL, NOW(), NOW()),
('Admin Kab. Lampung Barat', 'admin.lambar@dkp.lampung.go.id', '$2y$12$N9/r5q8s1Pq.Ym3s/xX6P.uFhZkKz0D1q9K1W2Y.pT/y3G8Hq3C.y', 'admin_kabupaten', 'Lampung Barat', NOW(), NOW()),
('Admin Kab. Tanggamus', 'admin.tanggamus@dkp.lampung.go.id', '$2y$12$N9/r5q8s1Pq.Ym3s/xX6P.uFhZkKz0D1q9K1W2Y.pT/y3G8Hq3C.y', 'admin_kabupaten', 'Tanggamus', NOW(), NOW()),
('Admin Kab. Lampung Selatan', 'admin.lamsel@dkp.lampung.go.id', '$2y$12$N9/r5q8s1Pq.Ym3s/xX6P.uFhZkKz0D1q9K1W2Y.pT/y3G8Hq3C.y', 'admin_kabupaten', 'Lampung Selatan', NOW(), NOW()),
('Admin Kab. Lampung Timur', 'admin.lamtim@dkp.lampung.go.id', '$2y$12$N9/r5q8s1Pq.Ym3s/xX6P.uFhZkKz0D1q9K1W2Y.pT/y3G8Hq3C.y', 'admin_kabupaten', 'Lampung Timur', NOW(), NOW()),
('Admin Kab. Lampung Tengah', 'admin.lamteng@dkp.lampung.go.id', '$2y$12$N9/r5q8s1Pq.Ym3s/xX6P.uFhZkKz0D1q9K1W2Y.pT/y3G8Hq3C.y', 'admin_kabupaten', 'Lampung Tengah', NOW(), NOW()),
('Admin Kab. Lampung Utara', 'admin.lamut@dkp.lampung.go.id', '$2y$12$N9/r5q8s1Pq.Ym3s/xX6P.uFhZkKz0D1q9K1W2Y.pT/y3G8Hq3C.y', 'admin_kabupaten', 'Lampung Utara', NOW(), NOW()),
('Admin Kab. Way Kanan', 'admin.waykanan@dkp.lampung.go.id', '$2y$12$N9/r5q8s1Pq.Ym3s/xX6P.uFhZkKz0D1q9K1W2Y.pT/y3G8Hq3C.y', 'admin_kabupaten', 'Way Kanan', NOW(), NOW()),
('Admin Kab. Tulang Bawang', 'admin.tuba@dkp.lampung.go.id', '$2y$12$N9/r5q8s1Pq.Ym3s/xX6P.uFhZkKz0D1q9K1W2Y.pT/y3G8Hq3C.y', 'admin_kabupaten', 'Tulang Bawang', NOW(), NOW()),
('Admin Kab. Pesawaran', 'admin.pesawaran@dkp.lampung.go.id', '$2y$12$N9/r5q8s1Pq.Ym3s/xX6P.uFhZkKz0D1q9K1W2Y.pT/y3G8Hq3C.y', 'admin_kabupaten', 'Pesawaran', NOW(), NOW()),
('Admin Kab. Pringsewu', 'admin.pringsewu@dkp.lampung.go.id', '$2y$12$N9/r5q8s1Pq.Ym3s/xX6P.uFhZkKz0D1q9K1W2Y.pT/y3G8Hq3C.y', 'admin_kabupaten', 'Pringsewu', NOW(), NOW()),
('Admin Kab. Mesuji', 'admin.mesuji@dkp.lampung.go.id', '$2y$12$N9/r5q8s1Pq.Ym3s/xX6P.uFhZkKz0D1q9K1W2Y.pT/y3G8Hq3C.y', 'admin_kabupaten', 'Mesuji', NOW(), NOW()),
('Admin Kab. Tulang Bawang Barat', 'admin.tubaba@dkp.lampung.go.id', '$2y$12$N9/r5q8s1Pq.Ym3s/xX6P.uFhZkKz0D1q9K1W2Y.pT/y3G8Hq3C.y', 'admin_kabupaten', 'Tulang Bawang Barat', NOW(), NOW()),
('Admin Kab. Pesisir Barat', 'admin.pesbar@dkp.lampung.go.id', '$2y$12$N9/r5q8s1Pq.Ym3s/xX6P.uFhZkKz0D1q9K1W2Y.pT/y3G8Hq3C.y', 'admin_kabupaten', 'Pesisir Barat', NOW(), NOW()),
('Admin Kota Bandar Lampung', 'admin.balam@dkp.lampung.go.id', '$2y$12$N9/r5q8s1Pq.Ym3s/xX6P.uFhZkKz0D1q9K1W2Y.pT/y3G8Hq3C.y', 'admin_kabupaten', 'Bandar Lampung', NOW(), NOW()),
('Admin Kota Metro', 'admin.metro@dkp.lampung.go.id', '$2y$12$N9/r5q8s1Pq.Ym3s/xX6P.uFhZkKz0D1q9K1W2Y.pT/y3G8Hq3C.y', 'admin_kabupaten', 'Metro', NOW(), NOW());

-- =========================================================================
-- 3. QUERY INSERT POKDAKAN (Contoh Data Master)
-- =========================================================================
-- Menggunakan user_id dari Admin masing-masing (contoh 4 = Lamsel, 10 = Pesawaran)
INSERT INTO pokdakans (user_id, nama_pokdakan, nama_ketua, no_whatsapp, pekon_desa, kecamatan, kabupaten_kota, no_badan_hukum_sk, latitude, longitude, tahun_anggaran, jumlah_mesin_pakan, spesifikasi_mesin, jumlah_kolam_ras, spesifikasi_kolam, created_at, updated_at) VALUES 
(4, 'Maju Bersama', 'Budi Santoso', '08123456789', 'Sukamaju', 'Sidomulyo', 'Lampung Selatan', 'SK.123/456/2023', '-5.6123', '105.5123', 2023, 1, 'Kapasitas 50kg/jam', 2, 'Diameter 3m, Filter Bio', NOW(), NOW()),
(10, 'Sumber Rezeki', 'Suryanto', '08211223344', 'Padang Cermin', 'Padang Cermin', 'Pesawaran', 'SK.987/654/2024', '-5.5678', '105.1678', 2024, 0, NULL, 4, 'Diameter 4m, Pompa 100W', NOW(), NOW());

-- =========================================================================
-- 4. QUERY INSERT LAPORAN MESIN PAKAN
-- =========================================================================
-- Untuk Pokdakan 'Maju Bersama' (id = 1)
INSERT INTO laporan_mesin_pakans (pokdakan_id, tanggal_input, status_mesin, produksi_pakan_kg, bahan_baku_utama, biaya_produksi_per_kg, keterangan_kendala, created_at, updated_at) VALUES 
(1, '2024-01-15', 'Baik', 500, 'Tepung Ikan, Dedak, Jagung', 7500.00, 'Lancar tidak ada kendala', NOW(), NOW()),
(1, '2024-04-15', 'Rusak Ringan', 300, 'Tepung Ikan, Dedak, Jagung', 8000.00, 'Dinamo agak tersendat, perlu servis', NOW(), NOW());

-- =========================================================================
-- 5. QUERY INSERT LAPORAN KOLAM RAS
-- =========================================================================
-- Untuk Pokdakan 'Sumber Rezeki' (id = 2)
INSERT INTO laporan_kolam_ras (pokdakan_id, tanggal_input, siklus_ke, status_siklus, tanggal_tebar, komoditas_ikan, jumlah_benih_ekor, ukuran_benih_cm, kondisi_air, kendala_penyakit, tanggal_panen, total_panen_kg, harga_jual_per_kg, total_pendapatan, created_at, updated_at) VALUES 
(2, '2024-03-01', 1, 'Berjalan', '2024-03-01', 'Nila', 5000, '3-5', 'Suhu 28C, pH 7.2', 'Aman', NULL, NULL, NULL, NULL, NOW(), NOW()),
(2, '2024-06-05', 1, 'Panen', '2024-03-01', 'Nila', 5000, '3-5', 'Suhu 27C, pH 7.0', 'Sempat mati lampu 2 jam', '2024-06-01', 800.50, 25000.00, 20012500.00, NOW(), NOW());

-- =========================================================================
-- 6. QUERY SELECT (DASHBOARD)
-- =========================================================================

-- A. Admin Provinsi melihat Rekap Total Mesin & Kolam se-Lampung
-- SELECT kabupaten_kota, COUNT(*) as total_pokdakan, SUM(jumlah_mesin_pakan) as total_mesin, SUM(jumlah_kolam_ras) as total_kolam 
-- FROM pokdakans GROUP BY kabupaten_kota;

-- B. Admin Kabupaten melihat data Laporan Panen di wilayahnya saja
-- SELECT p.nama_pokdakan, p.kecamatan, l.tanggal_panen, l.total_panen_kg, l.total_pendapatan
-- FROM laporan_kolam_ras l
-- JOIN pokdakans p ON l.pokdakan_id = p.id
-- WHERE p.kabupaten_kota = 'Pesawaran' AND l.status_siklus = 'Panen';

-- C. Cek Utilisasi Produksi Mesin Pakan per Kabupaten
-- SELECT p.kabupaten_kota, p.nama_pokdakan, m.tanggal_input, m.status_mesin, m.produksi_pakan_kg 
-- FROM laporan_mesin_pakans m
-- JOIN pokdakans p ON m.pokdakan_id = p.id
-- WHERE m.status_mesin != 'Rusak Berat'
-- ORDER BY m.tanggal_input DESC;
