<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin Provinsi
        User::factory()->create([
            'name' => 'Admin Provinsi Lampung',
            'email' => 'admin.provinsi@dkp.lampung.go.id',
            'password' => bcrypt('password'),
            'role' => 'admin_provinsi',
            'kabupaten' => null,
        ]);

        // 2. Admin 15 Kabupaten/Kota
        $kabupatens = [
            'Lampung Barat', 'Tanggamus', 'Lampung Selatan', 'Lampung Timur', 
            'Lampung Tengah', 'Lampung Utara', 'Way Kanan', 'Tulang Bawang', 
            'Pesawaran', 'Pringsewu', 'Mesuji', 'Tulang Bawang Barat', 
            'Pesisir Barat', 'Bandar Lampung', 'Metro'
        ];

        foreach ($kabupatens as $kab) {
            $emailPrefix = strtolower(str_replace(' ', '', $kab));
            User::factory()->create([
                'name' => 'Admin Kab. ' . $kab,
                'email' => 'admin.' . $emailPrefix . '@dkp.lampung.go.id',
                'password' => bcrypt('password'),
                'role' => 'admin_kabupaten',
                'kabupaten' => $kab,
            ]);
        }

        // 3. Pokdakan Dummy (Lamsel user_id = 4, Pesawaran user_id = 10)
        \App\Models\Pokdakan::create([
            'user_id' => 4,
            'nama_pokdakan' => 'Maju Bersama',
            'nama_ketua' => 'Budi Santoso',
            'no_whatsapp' => '08123456789',
            'pekon_desa' => 'Sukamaju',
            'kecamatan' => 'Sidomulyo',
            'kabupaten_kota' => 'Lampung Selatan',
            'no_badan_hukum_sk' => 'SK.123/456/2023',
            'latitude' => '-5.6123',
            'longitude' => '105.5123',
            'tahun_anggaran' => 2023,
            'jumlah_mesin_pakan' => 1,
            'spesifikasi_mesin' => 'Kapasitas 50kg/jam',
            'jumlah_kolam_ras' => 2,
            'spesifikasi_kolam' => 'Diameter 3m, Filter Bio',
        ]);

        \App\Models\Pokdakan::create([
            'user_id' => 10,
            'nama_pokdakan' => 'Sumber Rezeki',
            'nama_ketua' => 'Suryanto',
            'no_whatsapp' => '08211223344',
            'pekon_desa' => 'Padang Cermin',
            'kecamatan' => 'Padang Cermin',
            'kabupaten_kota' => 'Pesawaran',
            'no_badan_hukum_sk' => 'SK.987/654/2024',
            'latitude' => '-5.5678',
            'longitude' => '105.1678',
            'tahun_anggaran' => 2024,
            'jumlah_mesin_pakan' => 0,
            'spesifikasi_mesin' => null,
            'jumlah_kolam_ras' => 4,
            'spesifikasi_kolam' => 'Diameter 4m, Pompa 100W',
        ]);

        // 4. Laporan Mesin
        \App\Models\LaporanMesinPakan::create([
            'pokdakan_id' => 1,
            'tanggal_input' => '2024-01-15',
            'status_mesin' => 'Baik',
            'produksi_pakan_kg' => 500,
            'bahan_baku_utama' => 'Tepung Ikan, Dedak, Jagung',
            'biaya_produksi_per_kg' => 7500,
            'keterangan_kendala' => 'Lancar tidak ada kendala',
        ]);

        \App\Models\LaporanMesinPakan::create([
            'pokdakan_id' => 1,
            'tanggal_input' => '2024-04-15',
            'status_mesin' => 'Rusak Ringan',
            'produksi_pakan_kg' => 300,
            'bahan_baku_utama' => 'Tepung Ikan, Dedak, Jagung',
            'biaya_produksi_per_kg' => 8000,
            'keterangan_kendala' => 'Dinamo agak tersendat, perlu servis',
        ]);

        // 5. Laporan RAS
        \App\Models\LaporanKolamRas::create([
            'pokdakan_id' => 2,
            'tanggal_input' => '2024-03-01',
            'siklus_ke' => 1,
            'status_siklus' => 'Berjalan',
            'tanggal_tebar' => '2024-03-01',
            'komoditas_ikan' => 'Nila',
            'jumlah_benih_ekor' => 5000,
            'ukuran_benih_cm' => '3-5',
            'kondisi_air' => 'Suhu 28C, pH 7.2',
            'kendala_penyakit' => 'Aman',
            'tanggal_panen' => null,
            'total_panen_kg' => null,
            'harga_jual_per_kg' => null,
            'total_pendapatan' => null,
        ]);

        \App\Models\LaporanKolamRas::create([
            'pokdakan_id' => 2,
            'tanggal_input' => '2024-06-05',
            'siklus_ke' => 1,
            'status_siklus' => 'Panen',
            'tanggal_tebar' => '2024-03-01',
            'komoditas_ikan' => 'Nila',
            'jumlah_benih_ekor' => 5000,
            'ukuran_benih_cm' => '3-5',
            'kondisi_air' => 'Suhu 27C, pH 7.0',
            'kendala_penyakit' => 'Sempat mati lampu 2 jam',
            'tanggal_panen' => '2024-06-01',
            'total_panen_kg' => 800.5,
            'harga_jual_per_kg' => 25000,
            'total_pendapatan' => 20012500,
        ]);
    }
}
