<?php

namespace Tests\Feature;

use App\Models\LaporanKolamRas;
use App\Models\LaporanMesinPakan;
use App\Models\LaporanRiwayat;
use App\Models\Pokdakan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminLaporanTest extends TestCase
{
    use RefreshDatabase;

    private User $adminProvinsi;
    private User $adminKabupaten;
    private Pokdakan $pokdakan;

    protected function setUp(): void
    {
        parent::setUp();

        $this->adminProvinsi = User::factory()->create([
            'role' => 'admin_provinsi',
            'kabupaten' => null,
        ]);

        $this->adminKabupaten = User::factory()->create([
            'role' => 'admin_kabupaten',
            'kabupaten' => 'Pesawaran',
        ]);

        $this->pokdakan = Pokdakan::create([
            'user_id' => $this->adminKabupaten->id,
            'nama_pokdakan' => 'Pokdakan Mina Jaya',
            'nama_ketua' => 'Budi Santoso',
            'no_whatsapp' => '08123456789',
            'pekon_desa' => 'Desa Sukamaju',
            'kecamatan' => 'Kedondong',
            'kabupaten_kota' => 'Pesawaran',
            'no_badan_hukum_sk' => 'AHU-001/2024',
            'tahun_anggaran' => 2024,
            'jumlah_mesin_pakan' => 1,
            'spesifikasi_mesin' => 'Kapasitas 100kg/jam',
            'jumlah_kolam_ras' => 4,
            'spesifikasi_kolam' => 'Diameter 3m',
        ]);
    }

    public function test_admin_provinsi_can_update_laporan_mesin_and_audit_history_is_recorded(): void
    {
        $laporanMesin = LaporanMesinPakan::create([
            'tanggal_input' => '2026-09-01',
            'pokdakan_id' => $this->pokdakan->id,
            'status_mesin' => 'Baik',
            'produksi_pakan_kg' => 100,
            'bahan_baku_utama' => 'Dedak, Jagung',
            'biaya_produksi_per_kg' => 8000,
            'keterangan_kendala' => 'Normal',
        ]);

        $this->actingAs($this->adminProvinsi);

        $response = $this->put(route('admin.laporan.mesin.update', $laporanMesin), [
            'tanggal_input' => '2026-09-02',
            'status_mesin' => 'Rusak Ringan',
            'produksi_pakan_kg' => 120,
            'bahan_baku_utama' => 'Dedak, Jagung, Tepung Ikan',
            'biaya_produksi_per_kg' => 8500,
            'keterangan_kendala' => 'Dinamo macet',
            'catatan_perubahan' => 'Koreksi data dari verifikasi lapangan',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        // Check updated record
        $laporanMesin->refresh();
        $this->assertEquals('Rusak Ringan', $laporanMesin->status_mesin);
        $this->assertEquals(120, (float) $laporanMesin->produksi_pakan_kg);

        // Check audit trail / history
        $this->assertDatabaseHas('laporan_riwayats', [
            'riwayatable_type' => LaporanMesinPakan::class,
            'riwayatable_id' => $laporanMesin->id,
            'user_id' => $this->adminProvinsi->id,
            'action' => 'edit',
            'catatan' => 'Koreksi data dari verifikasi lapangan',
        ]);

        $riwayat = LaporanRiwayat::where('riwayatable_id', $laporanMesin->id)->first();
        $this->assertNotNull($riwayat);
        $this->assertArrayHasKey('status_mesin', $riwayat->perubahan);
        $this->assertEquals('Baik', $riwayat->perubahan['status_mesin']['sebelum']);
        $this->assertEquals('Rusak Ringan', $riwayat->perubahan['status_mesin']['sesudah']);
    }

    public function test_admin_provinsi_can_delete_laporan_mesin(): void
    {
        $laporanMesin = LaporanMesinPakan::create([
            'tanggal_input' => '2026-09-01',
            'pokdakan_id' => $this->pokdakan->id,
            'status_mesin' => 'Baik',
            'produksi_pakan_kg' => 50,
            'bahan_baku_utama' => 'Dedak',
            'biaya_produksi_per_kg' => 7500,
            'keterangan_kendala' => 'Normal',
        ]);

        $this->actingAs($this->adminProvinsi);

        $response = $this->delete(route('admin.laporan.mesin.destroy', $laporanMesin));

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseMissing('laporan_mesin_pakans', [
            'id' => $laporanMesin->id,
        ]);
    }

    public function test_admin_provinsi_can_update_laporan_ras_and_audit_history_is_recorded(): void
    {
        $laporanRas = LaporanKolamRas::create([
            'tanggal_input' => '2026-09-01',
            'pokdakan_id' => $this->pokdakan->id,
            'siklus_ke' => 1,
            'status_siklus' => 'Berjalan',
            'tanggal_tebar' => '2026-08-01',
            'komoditas_ikan' => 'Nila',
            'jumlah_benih_ekor' => 2000,
            'ukuran_benih_cm' => '5-7 cm',
            'kondisi_air' => 'Jernih',
            'kendala_penyakit' => 'Tidak ada',
            'tanggal_panen' => null,
            'total_panen_kg' => null,
            'harga_jual_per_kg' => null,
            'total_pendapatan' => null,
        ]);

        $this->actingAs($this->adminProvinsi);

        $response = $this->put(route('admin.laporan.ras.update', $laporanRas), [
            'tanggal_input' => '2026-09-01',
            'siklus_ke' => 1,
            'status_siklus' => 'Panen',
            'tanggal_tebar' => '2026-08-01',
            'komoditas_ikan' => 'Nila Merah',
            'jumlah_benih_ekor' => 2000,
            'ukuran_benih_cm' => '5-7 cm',
            'kondisi_air' => 'Jernih',
            'kendala_penyakit' => 'Tidak ada',
            'tanggal_panen' => '2026-09-10',
            'total_panen_kg' => 500,
            'harga_jual_per_kg' => 30000,
            'total_pendapatan' => 15000000,
            'catatan_perubahan' => 'Input hasil panen akhir siklus',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $laporanRas->refresh();
        $this->assertEquals('Panen', $laporanRas->status_siklus);
        $this->assertEquals(500, (float) $laporanRas->total_panen_kg);
        $this->assertEquals(15000000, (float) $laporanRas->total_pendapatan);

        $this->assertDatabaseHas('laporan_riwayats', [
            'riwayatable_type' => LaporanKolamRas::class,
            'riwayatable_id' => $laporanRas->id,
            'user_id' => $this->adminProvinsi->id,
            'action' => 'edit',
            'catatan' => 'Input hasil panen akhir siklus',
        ]);
    }

    public function test_admin_provinsi_can_delete_laporan_ras(): void
    {
        $laporanRas = LaporanKolamRas::create([
            'tanggal_input' => '2026-09-01',
            'pokdakan_id' => $this->pokdakan->id,
            'siklus_ke' => 1,
            'status_siklus' => 'Berjalan',
            'tanggal_tebar' => '2026-08-01',
            'komoditas_ikan' => 'Lele',
            'jumlah_benih_ekor' => 1000,
            'ukuran_benih_cm' => '5-7 cm',
            'kondisi_air' => 'Baik',
        ]);

        $this->actingAs($this->adminProvinsi);

        $response = $this->delete(route('admin.laporan.ras.destroy', $laporanRas));

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseMissing('laporan_kolam_ras', [
            'id' => $laporanRas->id,
        ]);
    }

    public function test_admin_kabupaten_cannot_update_or_delete_laporan(): void
    {
        $laporanMesin = LaporanMesinPakan::create([
            'tanggal_input' => '2026-09-01',
            'pokdakan_id' => $this->pokdakan->id,
            'status_mesin' => 'Baik',
            'produksi_pakan_kg' => 50,
            'bahan_baku_utama' => 'Dedak',
            'biaya_produksi_per_kg' => 7500,
        ]);

        $this->actingAs($this->adminKabupaten);

        // Attempt to update
        $updateResponse = $this->put(route('admin.laporan.mesin.update', $laporanMesin), [
            'tanggal_input' => '2026-09-01',
            'status_mesin' => 'Rusak',
            'produksi_pakan_kg' => 100,
            'bahan_baku_utama' => 'Dedak',
            'biaya_produksi_per_kg' => 7500,
        ]);
        $updateResponse->assertForbidden();

        // Attempt to delete
        $deleteResponse = $this->delete(route('admin.laporan.mesin.destroy', $laporanMesin));
        $deleteResponse->assertForbidden();
    }
}
