<?php

namespace App\Http\Controllers;

use App\Models\Pokdakan;
use App\Models\LaporanMesinPakan;
use App\Models\LaporanKolamRas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InputController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Admin Provinsi is not supposed to input data, redirect them or show error, but we'll let them see for now
        // For admin kabupaten, fetch their pokdakans
        $pokdakans = Pokdakan::where('kabupaten_kota', $user->kabupaten)
            ->orWhere('user_id', $user->id) // Fallback for prov
            ->get();

        if ($user->role === 'admin_provinsi') {
            $pokdakans = Pokdakan::all();
        }

        return Inertia::render('input/index', [
            'pokdakans' => $pokdakans,
            'role' => $user->role,
            'kabupaten' => $user->kabupaten,
        ]);
    }

    public function storePokdakan(Request $request)
    {
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
        ]);

        $user = $request->user();

        Pokdakan::create([
            'user_id' => $user->id,
            'nama_pokdakan' => $request->nama_pokdakan,
            'nama_ketua' => $request->nama_ketua,
            'no_whatsapp' => $request->no_whatsapp,
            'pekon_desa' => $request->pekon_desa,
            'kecamatan' => $request->kecamatan,
            'kabupaten_kota' => $user->kabupaten ?? 'Provinsi',
            'no_badan_hukum_sk' => $request->no_badan_hukum_sk,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'tahun_anggaran' => $request->tahun_anggaran,
            'jumlah_mesin_pakan' => $request->jumlah_mesin_pakan,
            'spesifikasi_mesin' => $request->spesifikasi_mesin,
            'jumlah_kolam_ras' => $request->jumlah_kolam_ras,
            'spesifikasi_kolam' => $request->spesifikasi_kolam,
        ]);

        return redirect()->route('input.index')->with('success', 'Data Profil Pokdakan berhasil disimpan.');
    }

    public function storeLaporanMesin(Request $request)
    {
        $request->validate([
            'pokdakan_id' => 'required|exists:pokdakans,id',
            'tanggal_input' => 'required|date',
            'status_mesin' => 'required|string|max:50',
            'produksi_pakan_kg' => 'required|numeric|min:0',
            'bahan_baku_utama' => 'required|string|max:255',
            'biaya_produksi_per_kg' => 'required|numeric|min:0',
            'keterangan_kendala' => 'nullable|string',
        ]);

        LaporanMesinPakan::create($request->all());

        return redirect()->route('input.index')->with('success', 'Laporan Mesin Pakan berhasil disimpan.');
    }

    public function storeLaporanRas(Request $request)
    {
        $request->validate([
            'pokdakan_id' => 'required|exists:pokdakans,id',
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
        ]);

        LaporanKolamRas::create($request->all());

        return redirect()->route('input.index')->with('success', 'Laporan Kolam RAS berhasil disimpan.');
    }
}
