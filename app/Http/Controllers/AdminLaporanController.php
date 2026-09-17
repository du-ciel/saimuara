<?php

namespace App\Http\Controllers;

use App\Models\LaporanKolamRas;
use App\Models\LaporanMesinPakan;
use Illuminate\Http\Request;

class AdminLaporanController extends Controller
{
    /**
     * Check that the user is Admin Provinsi
     */
    protected function authorizeAdminProvinsi(Request $request): void
    {
        if ($request->user()->role !== 'admin_provinsi') {
            abort(403, 'Hanya Admin Provinsi yang berhak menghapus laporan.');
        }
    }

    /**
     * Authorize user to edit report (Admin Provinsi or Admin Kabupaten for their district)
     */
    protected function authorizeEdit(Request $request, $laporan): void
    {
        $user = $request->user();
        if (!$user) {
            abort(401);
        }

        if ($user->role === 'admin_provinsi') {
            return;
        }

        if ($user->role === 'admin_kabupaten') {
            $laporan->loadMissing('pokdakan');
            if ($laporan->pokdakan && $laporan->pokdakan->kabupaten_kota === $user->kabupaten) {
                return;
            }
            abort(403, 'Anda hanya dapat mengedit laporan untuk kelompok di wilayah kabupaten Anda.');
        }

        abort(403, 'Anda tidak memiliki hak akses untuk mengedit laporan ini.');
    }

    /**
     * Update Laporan Mesin Pakan
     */
    public function updateMesin(Request $request, LaporanMesinPakan $laporanMesin)
    {
        $this->authorizeEdit($request, $laporanMesin);

        $request->validate([
            'tanggal_input' => 'required|date',
            'status_mesin' => 'required|string|max:50',
            'produksi_pakan_kg' => 'required|numeric|min:0',
            'bahan_baku_utama' => 'required|string|max:255',
            'biaya_produksi_per_kg' => 'required|numeric|min:0',
            'keterangan_kendala' => 'nullable|string',
            'catatan_perubahan' => 'nullable|string|max:500',
        ]);

        $fieldsToTrack = [
            'tanggal_input',
            'status_mesin',
            'produksi_pakan_kg',
            'bahan_baku_utama',
            'biaya_produksi_per_kg',
            'keterangan_kendala',
        ];

        $perubahan = [];
        foreach ($fieldsToTrack as $field) {
            $oldVal = $laporanMesin->$field;
            $newVal = $request->input($field);

            if ($field === 'tanggal_input') {
                $oldFormatted = $laporanMesin->tanggal_input ? $laporanMesin->tanggal_input->format('Y-m-d') : null;
                $newFormatted = $newVal ? date('Y-m-d', strtotime($newVal)) : null;
                if ($oldFormatted != $newFormatted) {
                    $perubahan[$field] = ['sebelum' => $oldFormatted, 'sesudah' => $newFormatted];
                }
            } elseif (in_array($field, ['produksi_pakan_kg', 'biaya_produksi_per_kg'])) {
                if ((float)$oldVal != (float)$newVal) {
                    $perubahan[$field] = ['sebelum' => (float)$oldVal, 'sesudah' => (float)$newVal];
                }
            } else {
                if ((string)($oldVal ?? '') !== (string)($newVal ?? '')) {
                    $perubahan[$field] = ['sebelum' => $oldVal, 'sesudah' => $newVal];
                }
            }
        }

        // Catat riwayat jika ada perubahan
        if (!empty($perubahan)) {
            $laporanMesin->riwayat()->create([
                'user_id' => $request->user()->id,
                'action' => 'edit',
                'perubahan' => $perubahan,
                'catatan' => $request->input('catatan_perubahan') ?: null,
            ]);
        }

        $laporanMesin->update([
            'tanggal_input' => $request->tanggal_input,
            'status_mesin' => $request->status_mesin,
            'produksi_pakan_kg' => $request->produksi_pakan_kg,
            'bahan_baku_utama' => $request->bahan_baku_utama,
            'biaya_produksi_per_kg' => $request->biaya_produksi_per_kg,
            'keterangan_kendala' => $request->keterangan_kendala,
        ]);

        return redirect()->back()->with('success', 'Laporan Mesin Pakan berhasil diperbarui.');
    }

    /**
     * Delete Laporan Mesin Pakan
     */
    public function destroyMesin(Request $request, LaporanMesinPakan $laporanMesin)
    {
        $this->authorizeAdminProvinsi($request);

        $laporanMesin->riwayat()->delete();
        $laporanMesin->delete();

        return redirect()->back()->with('success', 'Laporan Mesin Pakan berhasil dihapus.');
    }

    /**
     * Update Laporan Kolam RAS
     */
    public function updateRas(Request $request, LaporanKolamRas $laporanRas)
    {
        $this->authorizeEdit($request, $laporanRas);

        $request->validate([
            'tanggal_input' => 'required|date',
            'siklus_ke' => 'required|integer|min:1',
            'status_siklus' => 'required|string|max:50',
            'tanggal_tebar' => 'required|date',
            'komoditas_ikan' => 'required|string|max:255',
            'jumlah_benih_ekor' => 'required|integer|min:1',
            'ukuran_benih_cm' => 'required|string|max:50',
            'kondisi_air' => 'nullable|string',
            'kendala_penyakit' => 'nullable|string',
            'tanggal_panen' => 'nullable|date',
            'total_panen_kg' => 'nullable|numeric|min:0',
            'harga_jual_per_kg' => 'nullable|numeric|min:0',
            'total_pendapatan' => 'nullable|numeric|min:0',
            'catatan_perubahan' => 'nullable|string|max:500',
        ]);

        $fieldsToTrack = [
            'tanggal_input',
            'siklus_ke',
            'status_siklus',
            'tanggal_tebar',
            'komoditas_ikan',
            'jumlah_benih_ekor',
            'ukuran_benih_cm',
            'kondisi_air',
            'kendala_penyakit',
            'tanggal_panen',
            'total_panen_kg',
            'harga_jual_per_kg',
            'total_pendapatan',
        ];

        $perubahan = [];
        foreach ($fieldsToTrack as $field) {
            $oldVal = $laporanRas->$field;
            $newVal = $request->input($field);

            if (in_array($field, ['tanggal_input', 'tanggal_tebar', 'tanggal_panen'])) {
                $oldFormatted = $laporanRas->$field ? $laporanRas->$field->format('Y-m-d') : null;
                $newFormatted = $newVal ? date('Y-m-d', strtotime($newVal)) : null;
                if ($oldFormatted != $newFormatted) {
                    $perubahan[$field] = ['sebelum' => $oldFormatted, 'sesudah' => $newFormatted];
                }
            } elseif (in_array($field, ['siklus_ke', 'jumlah_benih_ekor'])) {
                if ((int)$oldVal != (int)$newVal) {
                    $perubahan[$field] = ['sebelum' => (int)$oldVal, 'sesudah' => (int)$newVal];
                }
            } elseif (in_array($field, ['total_panen_kg', 'harga_jual_per_kg', 'total_pendapatan'])) {
                $oldFloat = $oldVal !== null ? (float)$oldVal : null;
                $newFloat = $newVal !== null && $newVal !== '' ? (float)$newVal : null;
                if ($oldFloat != $newFloat) {
                    $perubahan[$field] = ['sebelum' => $oldFloat, 'sesudah' => $newFloat];
                }
            } else {
                if ((string)($oldVal ?? '') !== (string)($newVal ?? '')) {
                    $perubahan[$field] = ['sebelum' => $oldVal, 'sesudah' => $newVal];
                }
            }
        }

        // Catat riwayat jika ada perubahan
        if (!empty($perubahan)) {
            $laporanRas->riwayat()->create([
                'user_id' => $request->user()->id,
                'action' => 'edit',
                'perubahan' => $perubahan,
                'catatan' => $request->input('catatan_perubahan') ?: null,
            ]);
        }

        $laporanRas->update([
            'tanggal_input' => $request->tanggal_input,
            'siklus_ke' => $request->siklus_ke,
            'status_siklus' => $request->status_siklus,
            'tanggal_tebar' => $request->tanggal_tebar,
            'komoditas_ikan' => $request->komoditas_ikan,
            'jumlah_benih_ekor' => $request->jumlah_benih_ekor,
            'ukuran_benih_cm' => $request->ukuran_benih_cm,
            'kondisi_air' => $request->kondisi_air,
            'kendala_penyakit' => $request->kendala_penyakit,
            'tanggal_panen' => $request->tanggal_panen,
            'total_panen_kg' => $request->total_panen_kg,
            'harga_jual_per_kg' => $request->harga_jual_per_kg,
            'total_pendapatan' => $request->total_pendapatan,
        ]);

        return redirect()->back()->with('success', 'Laporan Budidaya Kolam RAS berhasil diperbarui.');
    }

    /**
     * Delete Laporan Kolam RAS
     */
    public function destroyRas(Request $request, LaporanKolamRas $laporanRas)
    {
        $this->authorizeAdminProvinsi($request);

        $laporanRas->riwayat()->delete();
        $laporanRas->delete();

        return redirect()->back()->with('success', 'Laporan Budidaya Kolam RAS berhasil dihapus.');
    }
}
