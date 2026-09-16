-- ============================================================
-- SAIMUARA - Import Data Only (Safe for TiDB Cloud)
-- Jalankan SETELAH php artisan migrate:fresh
-- ============================================================

SET FOREIGN_KEY_CHECKS=0;

-- Users
REPLACE INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `created_at`, `updated_at`, `role`, `kabupaten`) VALUES
	(1, 'Admin Provinsi Lampung', 'admin.provinsi@dkp.lampung.go.id', '2026-09-15 07:00:57', '$2y$12$cab0Ch02WgS2LBvlR7/Ggu9s5PeW9n7Z3a9a3NtR33CmW0yfeQkNy', NULL, NULL, NULL, 'LQSBljIdsvayMv2YxzhNxN2lUvNjiF3trM8I4GiZy3GhMeozReDPRbDBSQWK', '2026-09-15 07:00:58', '2026-09-15 07:00:58', 'admin_provinsi', NULL),
	(2, 'Admin Kab. Lampung Barat', 'admin.lampungbarat@dkp.lampung.go.id', '2026-09-15 07:00:58', '$2y$12$0xbDQkAGiixidzrcpiEnu.rMHEWss1/ufxt2cTQ/4xlnLzIsRH0l.', NULL, NULL, NULL, 'r76Dj7wsQG', '2026-09-15 07:00:58', '2026-09-15 07:00:58', 'admin_kabupaten', 'Lampung Barat'),
	(3, 'Admin Kab. Tanggamus', 'admin.tanggamus@dkp.lampung.go.id', '2026-09-15 07:00:58', '$2y$12$G30F7GhG5A0T/W1CGz/uTenQjZB.xKofG3NZyiey.RWcaRJZFNd5u', NULL, NULL, NULL, 'HkdVqfsmrG', '2026-09-15 07:00:58', '2026-09-15 07:00:58', 'admin_kabupaten', 'Tanggamus'),
	(4, 'Admin Kab. Lampung Selatan', 'admin.lampungselatan@dkp.lampung.go.id', '2026-09-15 07:00:59', '$2y$12$lk1slpEnbkuUb5rFi1C9ceioyxHg9TB9Trzfi5S7qPmD3rv5meqIu', NULL, NULL, NULL, 'jZviKdYp07Ux7y9V41yX0QRUJd8NVjjUNCRLTz2Mhy0sW6Lhu9Q60iXelZJF', '2026-09-15 07:00:59', '2026-09-15 07:00:59', 'admin_kabupaten', 'Lampung Selatan'),
	(5, 'Admin Kab. Lampung Timur', 'admin.lampungtimur@dkp.lampung.go.id', '2026-09-15 07:00:59', '$2y$12$HgmYOTg0thtyR4RUgj6qZeWvG.FFeWdkZEcPLHv.e6/R7cRB1dl.6', NULL, NULL, NULL, 'elZQf8YAIM', '2026-09-15 07:00:59', '2026-09-15 07:00:59', 'admin_kabupaten', 'Lampung Timur'),
	(6, 'Admin Kab. Lampung Tengah', 'admin.lampungtengah@dkp.lampung.go.id', '2026-09-15 07:01:00', '$2y$12$MeeLoXCuNdHAaFUU7thquexlnaergnYcF93aI9vdduJc/u0X30rUi', NULL, NULL, NULL, 'e7urQGSEgp', '2026-09-15 07:01:00', '2026-09-15 07:01:00', 'admin_kabupaten', 'Lampung Tengah'),
	(7, 'Admin Kab. Lampung Utara', 'admin.lampungutara@dkp.lampung.go.id', '2026-09-15 07:01:00', '$2y$12$neityx1aCROQuSZQGrYoeefDcDfL8SIKFdtioECRUW/qJlk82YjPW', NULL, NULL, NULL, 'I0UA9DRZk4', '2026-09-15 07:01:00', '2026-09-15 07:01:00', 'admin_kabupaten', 'Lampung Utara'),
	(8, 'Admin Kab. Way Kanan', 'admin.waykanan@dkp.lampung.go.id', '2026-09-15 07:01:01', '$2y$12$uYSES1oNP8u.2zC39iut2e.1jExuQ9KbKNs4VjnFjYSB.ekHGPUf6', NULL, NULL, NULL, 'FdeaGiWmle', '2026-09-15 07:01:01', '2026-09-15 07:01:01', 'admin_kabupaten', 'Way Kanan'),
	(9, 'Admin Kab. Tulang Bawang', 'admin.tulangbawang@dkp.lampung.go.id', '2026-09-15 07:01:01', '$2y$12$MglZprkU0JeFa9K906FYe.Z4qCFPaHe514LreZ4F.CTn22sebgUKS', NULL, NULL, NULL, 'lpwyC8WaXa', '2026-09-15 07:01:01', '2026-09-15 07:01:01', 'admin_kabupaten', 'Tulang Bawang'),
	(10, 'Admin Kab. Pesawaran', 'admin.pesawaran@dkp.lampung.go.id', '2026-09-15 07:01:02', '$2y$12$haqmTOGdzkhZZjMgKxzcHeMGGELwJu6mpxmSsPznv/uY.p0w7B5cW', NULL, NULL, NULL, 'Sy12MdiwJ9fY6zGbQcWwMCqZpSIoqB48nAlzZkqAGzgwEi2e4WBvgeY84weq', '2026-09-15 07:01:02', '2026-09-15 07:01:02', 'admin_kabupaten', 'Pesawaran'),
	(11, 'Admin Kab. Pringsewu', 'admin.pringsewu@dkp.lampung.go.id', '2026-09-15 07:01:02', '$2y$12$54arDQ6e6k4UFe6M1/4zv.GINugH2Y308FrJHrK0koVZU3cbebFJW', NULL, NULL, NULL, 'q9c3R411yA', '2026-09-15 07:01:02', '2026-09-15 07:01:02', 'admin_kabupaten', 'Pringsewu'),
	(12, 'Admin Kab. Mesuji', 'admin.mesuji@dkp.lampung.go.id', '2026-09-15 07:01:02', '$2y$12$F.q4DSuJmw3p/AF0QOfL0e/uTM5bv9JBHv1q/k0M.JnqxObGpSqVK', NULL, NULL, NULL, 'XzIBNlz9ty', '2026-09-15 07:01:02', '2026-09-15 07:01:02', 'admin_kabupaten', 'Mesuji'),
	(13, 'Admin Kab. Tulang Bawang Barat', 'admin.tulangbawangbarat@dkp.lampung.go.id', '2026-09-15 07:01:03', '$2y$12$M16C5Thd0K5LDUURLCqBHOaN3BI75xxIe54LwMl5HhH2w3bw0WC6y', NULL, NULL, NULL, '08P6p48Pnx', '2026-09-15 07:01:03', '2026-09-15 07:01:03', 'admin_kabupaten', 'Tulang Bawang Barat'),
	(14, 'Admin Kab. Pesisir Barat', 'admin.pesisirbarat@dkp.lampung.go.id', '2026-09-15 07:01:03', '$2y$12$cEgKwwJrDk261av67gfq4ecM/NTtyqcs3.i0zYnN1ri0FZgCXYaHC', NULL, NULL, NULL, 'xMPGD5HqC1', '2026-09-15 07:01:03', '2026-09-15 07:01:03', 'admin_kabupaten', 'Pesisir Barat'),
	(15, 'Admin Kab. Bandar Lampung', 'admin.bandarlampung@dkp.lampung.go.id', '2026-09-15 07:01:04', '$2y$12$2KmRPCpL2JOLNiwR3ceDDuTdFQ.rsawFIxTo1AUmTP.3wGIt4IWIq', NULL, NULL, NULL, 'u2ieEkr7Hf', '2026-09-15 07:01:04', '2026-09-15 07:01:04', 'admin_kabupaten', 'Bandar Lampung'),
	(16, 'Admin Kab. Metro', 'admin.metro@dkp.lampung.go.id', '2026-09-15 07:01:04', '$2y$12$1n8Rbi.C0Es2pHnARo7w/.lrg0aAU0JTeWKHcURNlz6xWO/mKqJb6', NULL, NULL, NULL, 'SPrH1o8DOv', '2026-09-15 07:01:04', '2026-09-15 07:01:04', 'admin_kabupaten', 'Metro');

-- Pokdakans
REPLACE INTO `pokdakans` (`id`, `nama_pokdakan`, `nama_ketua`, `no_whatsapp`, `pekon_desa`, `kecamatan`, `kabupaten_kota`, `no_badan_hukum_sk`, `latitude`, `longitude`, `tahun_anggaran`, `jumlah_mesin_pakan`, `spesifikasi_mesin`, `jumlah_kolam_ras`, `spesifikasi_kolam`, `user_id`, `created_at`, `updated_at`) VALUES
	(1, 'Maju Bersama', 'Budi Santoso', '08123456789', 'Sukamaju', 'Sidomulyo', 'Lampung Selatan', 'SK.123/456/2023', '-5.6123', '105.5123', 2023, 1, 'Kapasitas 50kg/jam', 2, 'Diameter 3m, Filter Bio', 4, '2026-09-15 07:01:04', '2026-09-15 07:01:04'),
	(2, 'Sumber Rezeki', 'Suryanto', '08211223344', 'Padang Cermin', 'Padang Cermin', 'Pesawaran', 'SK.987/654/2024', '-5.5678', '105.1678', 2024, 0, NULL, 4, 'Diameter 4m, Pompa 100W', 10, '2026-09-15 07:01:04', '2026-09-15 07:01:04');

-- Laporan Kolam RAS
REPLACE INTO `laporan_kolam_ras` (`id`, `tanggal_input`, `pokdakan_id`, `siklus_ke`, `status_siklus`, `tanggal_tebar`, `komoditas_ikan`, `jumlah_benih_ekor`, `ukuran_benih_cm`, `kondisi_air`, `kendala_penyakit`, `tanggal_panen`, `total_panen_kg`, `harga_jual_per_kg`, `total_pendapatan`, `created_at`, `updated_at`) VALUES
	(1, '2024-03-01', 2, 1, 'Berjalan', '2024-03-01', 'Nila', 5000, '3-5', 'Suhu 28C, pH 7.2', 'Aman', NULL, NULL, NULL, NULL, '2026-09-15 07:01:04', '2026-09-15 07:01:04'),
	(2, '2024-06-05', 2, 1, 'Panen', '2024-03-01', 'Nila', 5000, '3-5', 'Suhu 27C, pH 7.0', 'Sempat mati lampu 2 jam', '2024-06-01', 800.50, 25000.00, 20012500.00, '2026-09-15 07:01:04', '2026-09-15 07:01:04');

-- Laporan Mesin Pakan
REPLACE INTO `laporan_mesin_pakans` (`id`, `tanggal_input`, `pokdakan_id`, `status_mesin`, `produksi_pakan_kg`, `bahan_baku_utama`, `biaya_produksi_per_kg`, `keterangan_kendala`, `created_at`, `updated_at`) VALUES
	(1, '2024-01-15', 1, 'Baik', 500.00, 'Tepung Ikan, Dedak, Jagung', 7500.00, 'Lancar tidak ada kendala', '2026-09-15 07:01:04', '2026-09-15 07:01:04'),
	(2, '2024-04-15', 1, 'Rusak Ringan', 300.00, 'Tepung Ikan, Dedak, Jagung', 8000.00, 'Dinamo agak tersendat, perlu servis', '2026-09-15 07:01:04', '2026-09-15 07:01:04'),
	(3, '2026-09-15', 2, 'Baik', 1002.00, 'tepung ikan', 123400.00, NULL, '2026-09-15 07:38:18', '2026-09-15 07:38:18');

SET FOREIGN_KEY_CHECKS=1;
