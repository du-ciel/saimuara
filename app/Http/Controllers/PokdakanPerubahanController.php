<?php

namespace App\Http\Controllers;

use App\Models\Pokdakan;
use App\Models\PokdakanPerubahan;
use Illuminate\Http\Request;

class PokdakanPerubahanController extends Controller
{
    /**
     * Submit an edit request for Pokdakan (by Admin Kabupaten or Admin Provinsi)
     */
    public function store(Request $request, Pokdakan $pokdakan)
    {
        $user = $request->user();

        // Authorization: Admin Kabupaten can only edit Pokdakan in their regency
        if ($user->role === 'admin_kabupaten') {
            if (strtolower(trim($pokdakan->kabupaten_kota)) !== strtolower(trim($user->kabupaten))) {
                abort(403, 'Anda hanya dapat mengedit Pokdakan di wilayah kabupaten Anda.');
            }
        } elseif ($user->role !== 'admin_provinsi') {
            abort(403, 'Anda tidak memiliki hak akses untuk mengedit Pokdakan.');
        }

        // Prevent multiple simultaneous pending requests for the same Pokdakan
        $existingPending = PokdakanPerubahan::where('pokdakan_id', $pokdakan->id)
            ->where('status', 'pending')
            ->first();

        if ($existingPending) {
            return redirect()->back()->withErrors([
                'pokdakan' => 'Masih ada usulan perubahan untuk Pokdakan ini yang menunggu konfirmasi Admin Provinsi.',
            ]);
        }

        $request->validate([
            'nama_pokdakan' => 'required|string|max:255',
            'nama_ketua' => 'required|string|max:255',
            'no_whatsapp' => 'required|string|max:50',
            'pekon_desa' => 'required|string|max:255',
            'kecamatan' => 'required|string|max:255',
            'no_badan_hukum_sk' => 'nullable|string|max:255',
            'latitude' => 'nullable|string',
            'longitude' => 'nullable|string',
            'tahun_anggaran' => 'required|integer',
            'jumlah_mesin_pakan' => 'required|integer|min:0',
            'spesifikasi_mesin' => 'nullable|string',
            'jumlah_kolam_ras' => 'required|integer|min:0',
            'spesifikasi_kolam' => 'nullable|string',
            'alasan' => 'nullable|string|max:500',
        ]);

        $fields = [
            'nama_pokdakan',
            'nama_ketua',
            'no_whatsapp',
            'pekon_desa',
            'kecamatan',
            'no_badan_hukum_sk',
            'latitude',
            'longitude',
            'tahun_anggaran',
            'jumlah_mesin_pakan',
            'spesifikasi_mesin',
            'jumlah_kolam_ras',
            'spesifikasi_kolam',
        ];

        $perubahan = [];
        $dataLama = [];
        $dataBaru = [];

        foreach ($fields as $field) {
            $old = $pokdakan->$field;
            $new = $request->input($field);

            $dataLama[$field] = $old;
            $dataBaru[$field] = $new;

            if ((string)($old ?? '') !== (string)($new ?? '')) {
                $perubahan[$field] = [
                    'sebelum' => $old,
                    'sesudah' => $new,
                ];
            }
        }

        if (empty($perubahan)) {
            return redirect()->back()->with('info', 'Tidak ada data yang diubah.');
        }

        PokdakanPerubahan::create([
            'pokdakan_id' => $pokdakan->id,
            'user_id' => $user->id,
            'data_lama' => $dataLama,
            'data_baru' => $dataBaru,
            'perubahan' => $perubahan,
            'alasan' => $request->input('alasan') ?: null,
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Usulan perubahan Pokdakan berhasil dikirim. Menunggu konfirmasi dari Admin Provinsi.');
    }

    /**
     * Approve a change request (Admin Provinsi only)
     */
    public function approve(Request $request, PokdakanPerubahan $perubahan)
    {
        if ($request->user()->role !== 'admin_provinsi') {
            abort(403, 'Hanya Admin Provinsi yang berhak mengonfirmasi persetujuan perubahan.');
        }

        if ($perubahan->status !== 'pending') {
            return redirect()->back()->withErrors([
                'perubahan' => 'Usulan perubahan ini telah diproses sebelumnya.',
            ]);
        }

        $pokdakan = $perubahan->pokdakan;
        if ($pokdakan) {
            $pokdakan->update($perubahan->data_baru);
        }

        $perubahan->update([
            'status' => 'approved',
            'reviewed_by' => $request->user()->id,
            'catatan_review' => $request->input('catatan_review') ?: 'Disetujui oleh Admin Provinsi.',
            'reviewed_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Usulan perubahan Pokdakan berhasil disetujui. Profil Pokdakan telah resmi diperbarui.');
    }

    /**
     * Reject a change request (Admin Provinsi only)
     */
    public function reject(Request $request, PokdakanPerubahan $perubahan)
    {
        if ($request->user()->role !== 'admin_provinsi') {
            abort(403, 'Hanya Admin Provinsi yang berhak mengonfirmasi persetujuan perubahan.');
        }

        if ($perubahan->status !== 'pending') {
            return redirect()->back()->withErrors([
                'perubahan' => 'Usulan perubahan ini telah diproses sebelumnya.',
            ]);
        }

        $perubahan->update([
            'status' => 'rejected',
            'reviewed_by' => $request->user()->id,
            'catatan_review' => $request->input('catatan_review') ?: 'Ditolak oleh Admin Provinsi.',
            'reviewed_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Usulan perubahan Pokdakan telah ditolak.');
    }
}
