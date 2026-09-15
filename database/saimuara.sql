/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `saimuara` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `saimuara`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin_kabupaten',
  `kabupaten` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

CREATE TABLE IF NOT EXISTS `pokdakans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama_pokdakan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_ketua` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_whatsapp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pekon_desa` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kecamatan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kabupaten_kota` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_badan_hukum_sk` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `longitude` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tahun_anggaran` int NOT NULL,
  `jumlah_mesin_pakan` int NOT NULL DEFAULT '0',
  `spesifikasi_mesin` text COLLATE utf8mb4_unicode_ci,
  `jumlah_kolam_ras` int NOT NULL DEFAULT '0',
  `spesifikasi_kolam` text COLLATE utf8mb4_unicode_ci,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pokdakans_user_id_foreign` (`user_id`),
  CONSTRAINT `pokdakans_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

REPLACE INTO `pokdakans` (`id`, `nama_pokdakan`, `nama_ketua`, `no_whatsapp`, `pekon_desa`, `kecamatan`, `kabupaten_kota`, `no_badan_hukum_sk`, `latitude`, `longitude`, `tahun_anggaran`, `jumlah_mesin_pakan`, `spesifikasi_mesin`, `jumlah_kolam_ras`, `spesifikasi_kolam`, `user_id`, `created_at`, `updated_at`) VALUES
	(1, 'Maju Bersama', 'Budi Santoso', '08123456789', 'Sukamaju', 'Sidomulyo', 'Lampung Selatan', 'SK.123/456/2023', '-5.6123', '105.5123', 2023, 1, 'Kapasitas 50kg/jam', 2, 'Diameter 3m, Filter Bio', 4, '2026-09-15 07:01:04', '2026-09-15 07:01:04'),
	(2, 'Sumber Rezeki', 'Suryanto', '08211223344', 'Padang Cermin', 'Padang Cermin', 'Pesawaran', 'SK.987/654/2024', '-5.5678', '105.1678', 2024, 0, NULL, 4, 'Diameter 4m, Pompa 100W', 10, '2026-09-15 07:01:04', '2026-09-15 07:01:04');

CREATE TABLE IF NOT EXISTS `laporan_kolam_ras` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tanggal_input` date NOT NULL,
  `pokdakan_id` bigint unsigned NOT NULL,
  `siklus_ke` int NOT NULL,
  `status_siklus` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_tebar` date NOT NULL,
  `komoditas_ikan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jumlah_benih_ekor` int NOT NULL,
  `ukuran_benih_cm` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kondisi_air` text COLLATE utf8mb4_unicode_ci,
  `kendala_penyakit` text COLLATE utf8mb4_unicode_ci,
  `tanggal_panen` date DEFAULT NULL,
  `total_panen_kg` decimal(10,2) DEFAULT NULL,
  `harga_jual_per_kg` decimal(12,2) DEFAULT NULL,
  `total_pendapatan` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `laporan_kolam_ras_pokdakan_id_foreign` (`pokdakan_id`),
  CONSTRAINT `laporan_kolam_ras_pokdakan_id_foreign` FOREIGN KEY (`pokdakan_id`) REFERENCES `pokdakans` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

REPLACE INTO `laporan_kolam_ras` (`id`, `tanggal_input`, `pokdakan_id`, `siklus_ke`, `status_siklus`, `tanggal_tebar`, `komoditas_ikan`, `jumlah_benih_ekor`, `ukuran_benih_cm`, `kondisi_air`, `kendala_penyakit`, `tanggal_panen`, `total_panen_kg`, `harga_jual_per_kg`, `total_pendapatan`, `created_at`, `updated_at`) VALUES
	(1, '2024-03-01', 2, 1, 'Berjalan', '2024-03-01', 'Nila', 5000, '3-5', 'Suhu 28C, pH 7.2', 'Aman', NULL, NULL, NULL, NULL, '2026-09-15 07:01:04', '2026-09-15 07:01:04'),
	(2, '2024-06-05', 2, 1, 'Panen', '2024-03-01', 'Nila', 5000, '3-5', 'Suhu 27C, pH 7.0', 'Sempat mati lampu 2 jam', '2024-06-01', 800.50, 25000.00, 20012500.00, '2026-09-15 07:01:04', '2026-09-15 07:01:04');

CREATE TABLE IF NOT EXISTS `laporan_mesin_pakans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tanggal_input` date NOT NULL,
  `pokdakan_id` bigint unsigned NOT NULL,
  `status_mesin` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `produksi_pakan_kg` decimal(10,2) NOT NULL DEFAULT '0.00',
  `bahan_baku_utama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `biaya_produksi_per_kg` decimal(12,2) NOT NULL DEFAULT '0.00',
  `keterangan_kendala` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `laporan_mesin_pakans_pokdakan_id_foreign` (`pokdakan_id`),
  CONSTRAINT `laporan_mesin_pakans_pokdakan_id_foreign` FOREIGN KEY (`pokdakan_id`) REFERENCES `pokdakans` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

REPLACE INTO `laporan_mesin_pakans` (`id`, `tanggal_input`, `pokdakan_id`, `status_mesin`, `produksi_pakan_kg`, `bahan_baku_utama`, `biaya_produksi_per_kg`, `keterangan_kendala`, `created_at`, `updated_at`) VALUES
	(1, '2024-01-15', 1, 'Baik', 500.00, 'Tepung Ikan, Dedak, Jagung', 7500.00, 'Lancar tidak ada kendala', '2026-09-15 07:01:04', '2026-09-15 07:01:04'),
	(2, '2024-04-15', 1, 'Rusak Ringan', 300.00, 'Tepung Ikan, Dedak, Jagung', 8000.00, 'Dinamo agak tersendat, perlu servis', '2026-09-15 07:01:04', '2026-09-15 07:01:04'),
	(3, '2026-09-15', 2, 'Baik', 1002.00, 'tepung ikan', 123400.00, NULL, '2026-09-15 07:38:18', '2026-09-15 07:38:18');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
