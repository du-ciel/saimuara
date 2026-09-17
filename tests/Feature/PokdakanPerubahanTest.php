<?php

namespace Tests\Feature;

use App\Models\Pokdakan;
use App\Models\PokdakanPerubahan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PokdakanPerubahanTest extends TestCase
{
    use RefreshDatabase;

    private User $adminProvinsi;
    private User $adminKabupaten;
    private User $adminKabupatenOther;
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

        $this->adminKabupatenOther = User::factory()->create([
            'role' => 'admin_kabupaten',
            'kabupaten' => 'Lampung Selatan',
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

    public function test_admin_kabupaten_can_request_pokdakan_update_in_own_district(): void
    {
        $this->actingAs($this->adminKabupaten);

        $payload = [
            'nama_pokdakan' => 'Pokdakan Mina Jaya Makmur',
            'nama_ketua' => 'Budi Santoso, S.Pi',
            'no_whatsapp' => '08129999888',
            'pekon_desa' => 'Desa Sukamaju Baru',
            'kecamatan' => 'Kedondong',
            'no_badan_hukum_sk' => 'AHU-001/2024-REV',
            'latitude' => '-5.4000',
            'longitude' => '105.1000',
            'tahun_anggaran' => 2024,
            'jumlah_mesin_pakan' => 2,
            'spesifikasi_mesin' => 'Kapasitas 200kg/jam',
            'jumlah_kolam_ras' => 6,
            'spesifikasi_kolam' => 'Diameter 4m',
            'alasan' => 'Penambahan kapasitas mesin dan kolam bantuan APBD-P',
        ];

        $response = $this->post(route('pokdakan.request-update', $this->pokdakan), $payload);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        // Master Pokdakan should NOT be updated yet
        $this->pokdakan->refresh();
        $this->assertEquals('Pokdakan Mina Jaya', $this->pokdakan->nama_pokdakan);
        $this->assertEquals(1, $this->pokdakan->jumlah_mesin_pakan);

        // PokdakanPerubahan request should be saved
        $this->assertDatabaseHas('pokdakan_perubahans', [
            'pokdakan_id' => $this->pokdakan->id,
            'user_id' => $this->adminKabupaten->id,
            'status' => 'pending',
            'alasan' => 'Penambahan kapasitas mesin dan kolam bantuan APBD-P',
        ]);

        $perubahan = PokdakanPerubahan::where('pokdakan_id', $this->pokdakan->id)->first();
        $this->assertNotNull($perubahan);
        $this->assertArrayHasKey('nama_pokdakan', $perubahan->perubahan);
        $this->assertEquals('Pokdakan Mina Jaya', $perubahan->perubahan['nama_pokdakan']['sebelum']);
        $this->assertEquals('Pokdakan Mina Jaya Makmur', $perubahan->perubahan['nama_pokdakan']['sesudah']);
    }

    public function test_admin_kabupaten_cannot_request_pokdakan_update_in_other_district(): void
    {
        $this->actingAs($this->adminKabupatenOther);

        $payload = [
            'nama_pokdakan' => 'Pokdakan Hack',
            'nama_ketua' => 'Hacker',
            'no_whatsapp' => '08129999888',
            'pekon_desa' => 'Desa Sukamaju',
            'kecamatan' => 'Kedondong',
            'tahun_anggaran' => 2024,
            'jumlah_mesin_pakan' => 1,
            'jumlah_kolam_ras' => 4,
        ];

        $response = $this->post(route('pokdakan.request-update', $this->pokdakan), $payload);

        $response->assertForbidden();
        $this->assertDatabaseCount('pokdakan_perubahans', 0);
    }

    public function test_duplicate_pending_pokdakan_update_request_is_prevented(): void
    {
        PokdakanPerubahan::create([
            'pokdakan_id' => $this->pokdakan->id,
            'user_id' => $this->adminKabupaten->id,
            'data_lama' => $this->pokdakan->toArray(),
            'data_baru' => array_merge($this->pokdakan->toArray(), ['nama_pokdakan' => 'Pending 1']),
            'perubahan' => ['nama_pokdakan' => ['sebelum' => $this->pokdakan->nama_pokdakan, 'sesudah' => 'Pending 1']],
            'status' => 'pending',
        ]);

        $this->actingAs($this->adminKabupaten);

        $payload = [
            'nama_pokdakan' => 'Pending 2',
            'nama_ketua' => $this->pokdakan->nama_ketua,
            'no_whatsapp' => $this->pokdakan->no_whatsapp,
            'pekon_desa' => $this->pokdakan->pekon_desa,
            'kecamatan' => $this->pokdakan->kecamatan,
            'tahun_anggaran' => $this->pokdakan->tahun_anggaran,
            'jumlah_mesin_pakan' => $this->pokdakan->jumlah_mesin_pakan,
            'jumlah_kolam_ras' => $this->pokdakan->jumlah_kolam_ras,
        ];

        $response = $this->post(route('pokdakan.request-update', $this->pokdakan), $payload);

        $response->assertRedirect();
        $response->assertSessionHasErrors('pokdakan');
        $this->assertDatabaseCount('pokdakan_perubahans', 1);
    }

    public function test_request_with_no_changes_is_not_stored(): void
    {
        $this->actingAs($this->adminKabupaten);

        // Send same existing data
        $payload = [
            'nama_pokdakan' => $this->pokdakan->nama_pokdakan,
            'nama_ketua' => $this->pokdakan->nama_ketua,
            'no_whatsapp' => $this->pokdakan->no_whatsapp,
            'pekon_desa' => $this->pokdakan->pekon_desa,
            'kecamatan' => $this->pokdakan->kecamatan,
            'no_badan_hukum_sk' => $this->pokdakan->no_badan_hukum_sk,
            'tahun_anggaran' => $this->pokdakan->tahun_anggaran,
            'jumlah_mesin_pakan' => $this->pokdakan->jumlah_mesin_pakan,
            'spesifikasi_mesin' => $this->pokdakan->spesifikasi_mesin,
            'jumlah_kolam_ras' => $this->pokdakan->jumlah_kolam_ras,
            'spesifikasi_kolam' => $this->pokdakan->spesifikasi_kolam,
        ];

        $response = $this->post(route('pokdakan.request-update', $this->pokdakan), $payload);

        $response->assertRedirect();
        $response->assertSessionHas('info', 'Tidak ada data yang diubah.');
        $this->assertDatabaseCount('pokdakan_perubahans', 0);
    }

    public function test_admin_kabupaten_cannot_approve_or_reject_request(): void
    {
        $perubahan = PokdakanPerubahan::create([
            'pokdakan_id' => $this->pokdakan->id,
            'user_id' => $this->adminKabupaten->id,
            'data_lama' => $this->pokdakan->toArray(),
            'data_baru' => array_merge($this->pokdakan->toArray(), ['nama_pokdakan' => 'Updated Name']),
            'perubahan' => ['nama_pokdakan' => ['sebelum' => $this->pokdakan->nama_pokdakan, 'sesudah' => 'Updated Name']],
            'status' => 'pending',
        ]);

        $this->actingAs($this->adminKabupaten);

        $approveResponse = $this->post(route('admin.pokdakan-perubahan.approve', $perubahan));
        $approveResponse->assertForbidden();

        $rejectResponse = $this->post(route('admin.pokdakan-perubahan.reject', $perubahan));
        $rejectResponse->assertForbidden();
    }

    public function test_admin_provinsi_can_approve_pokdakan_update_and_master_data_is_updated(): void
    {
        $perubahan = PokdakanPerubahan::create([
            'pokdakan_id' => $this->pokdakan->id,
            'user_id' => $this->adminKabupaten->id,
            'data_lama' => $this->pokdakan->toArray(),
            'data_baru' => array_merge($this->pokdakan->toArray(), [
                'nama_pokdakan' => 'Pokdakan Mina Makmur Mandiri',
                'nama_ketua' => 'H. Budi Santoso',
                'jumlah_kolam_ras' => 8,
            ]),
            'perubahan' => [
                'nama_pokdakan' => ['sebelum' => 'Pokdakan Mina Jaya', 'sesudah' => 'Pokdakan Mina Makmur Mandiri'],
                'nama_ketua' => ['sebelum' => 'Budi Santoso', 'sesudah' => 'H. Budi Santoso'],
                'jumlah_kolam_ras' => ['sebelum' => 4, 'sesudah' => 8],
            ],
            'status' => 'pending',
            'alasan' => 'Hasil verifikasi lapangan 2026',
        ]);

        $this->actingAs($this->adminProvinsi);

        $response = $this->post(route('admin.pokdakan-perubahan.approve', $perubahan), [
            'catatan_review' => 'Data diverifikasi akurat dan disetujui.',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        // Verify Pokdakan is updated in DB
        $this->pokdakan->refresh();
        $this->assertEquals('Pokdakan Mina Makmur Mandiri', $this->pokdakan->nama_pokdakan);
        $this->assertEquals('H. Budi Santoso', $this->pokdakan->nama_ketua);
        $this->assertEquals(8, $this->pokdakan->jumlah_kolam_ras);

        // Verify PokdakanPerubahan status is updated
        $perubahan->refresh();
        $this->assertEquals('approved', $perubahan->status);
        $this->assertEquals($this->adminProvinsi->id, $perubahan->reviewed_by);
        $this->assertEquals('Data diverifikasi akurat dan disetujui.', $perubahan->catatan_review);
        $this->assertNotNull($perubahan->reviewed_at);
    }

    public function test_admin_provinsi_can_reject_pokdakan_update_and_master_data_remains_unchanged(): void
    {
        $perubahan = PokdakanPerubahan::create([
            'pokdakan_id' => $this->pokdakan->id,
            'user_id' => $this->adminKabupaten->id,
            'data_lama' => $this->pokdakan->toArray(),
            'data_baru' => array_merge($this->pokdakan->toArray(), [
                'nama_pokdakan' => 'Nama Yang Salah',
            ]),
            'perubahan' => [
                'nama_pokdakan' => ['sebelum' => 'Pokdakan Mina Jaya', 'sesudah' => 'Nama Yang Salah'],
            ],
            'status' => 'pending',
        ]);

        $this->actingAs($this->adminProvinsi);

        $response = $this->post(route('admin.pokdakan-perubahan.reject', $perubahan), [
            'catatan_review' => 'Nama kelompok tidak sesuai dengan SK Kemenkumham.',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        // Master data must remain unchanged
        $this->pokdakan->refresh();
        $this->assertEquals('Pokdakan Mina Jaya', $this->pokdakan->nama_pokdakan);

        // Status updated to rejected
        $perubahan->refresh();
        $this->assertEquals('rejected', $perubahan->status);
        $this->assertEquals($this->adminProvinsi->id, $perubahan->reviewed_by);
        $this->assertEquals('Nama kelompok tidak sesuai dengan SK Kemenkumham.', $perubahan->catatan_review);
        $this->assertNotNull($perubahan->reviewed_at);
    }
}
