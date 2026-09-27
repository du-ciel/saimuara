<?php

namespace Tests\Feature;

use App\Models\LaporanKolamRas;
use App\Models\LaporanMesinPakan;
use App\Models\Pokdakan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExportAndInputAuthorizationTest extends TestCase
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

        LaporanMesinPakan::create([
            'tanggal_input' => '2026-09-01',
            'pokdakan_id' => $this->pokdakan->id,
            'status_mesin' => 'Baik',
            'produksi_pakan_kg' => 100,
            'bahan_baku_utama' => 'Dedak, Jagung',
            'biaya_produksi_per_kg' => 8000,
            'catatan' => 'Operasional normal',
        ]);

        LaporanKolamRas::create([
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
        ]);
    }

    public function test_admin_kabupaten_can_access_input_page(): void
    {
        $response = $this->actingAs($this->adminKabupaten)->get('/input');
        $response->assertStatus(200);
    }

    public function test_admin_provinsi_cannot_access_input_page(): void
    {
        $response = $this->actingAs($this->adminProvinsi)->get('/input');
        $response->assertStatus(403);
    }

    public function test_admin_provinsi_cannot_submit_input_data(): void
    {
        $response = $this->actingAs($this->adminProvinsi)->post('/input/pokdakan', [
            'nama_pokdakan' => 'Illegal Pokdakan',
            'nama_ketua' => 'John Doe',
        ]);
        $response->assertStatus(403);
    }

    public function test_guest_cannot_access_export(): void
    {
        $response = $this->get('/admin/export/excel');
        $response->assertRedirect('/login');

        $responsePdf = $this->get('/admin/export/pdf');
        $responsePdf->assertRedirect('/login');
    }

    public function test_admin_kabupaten_cannot_access_export(): void
    {
        $response = $this->actingAs($this->adminKabupaten)->get('/admin/export/excel');
        $response->assertStatus(403);

        $responsePdf = $this->actingAs($this->adminKabupaten)->get('/admin/export/pdf');
        $responsePdf->assertStatus(403);
    }

    public function test_admin_provinsi_can_export_excel(): void
    {
        $response = $this->actingAs($this->adminProvinsi)->get('/admin/export/excel');
        $response->assertStatus(200);
        $this->assertStringContainsString('spreadsheetml.sheet', $response->headers->get('Content-Type'));
    }

    public function test_admin_provinsi_can_export_excel_with_filters(): void
    {
        $response = $this->actingAs($this->adminProvinsi)->get('/admin/export/excel?kabupaten=Pesawaran&periode=2026-09');
        $response->assertStatus(200);
        $this->assertStringContainsString('spreadsheetml.sheet', $response->headers->get('Content-Type'));
    }

    public function test_admin_provinsi_can_export_pdf(): void
    {
        $response = $this->actingAs($this->adminProvinsi)->get('/admin/export/pdf');
        $response->assertStatus(200);
        $this->assertStringContainsString('application/pdf', $response->headers->get('Content-Type'));
    }

    public function test_admin_provinsi_can_stream_pdf_for_preview(): void
    {
        $response = $this->actingAs($this->adminProvinsi)->get('/admin/export/pdf?stream=1&kabupaten=Pesawaran');
        $response->assertStatus(200);
        $this->assertStringContainsString('application/pdf', $response->headers->get('Content-Type'));
        $this->assertStringContainsString('inline;', $response->headers->get('Content-Disposition'));
    }
}
