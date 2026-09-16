<?php

namespace App\Http\Controllers;

use App\Models\Pokdakan;
use App\Models\LaporanMesinPakan;
use App\Models\LaporanKolamRas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $search = $request->input('search');
        $kabupaten = $request->input('kabupaten');
        $periode = $request->input('periode', 'semua');

        // Base query for Pokdakan based on role
        $pokdakanQuery = Pokdakan::with(['laporanMesinPakan', 'laporanKolamRas', 'user']);

        // Role restriction
        if ($user->role !== 'admin_provinsi') {
            $pokdakanQuery->where('kabupaten_kota', $user->kabupaten);
        } else {
            // Apply kabupaten filter if admin_provinsi
            if ($kabupaten && $kabupaten !== 'semua') {
                $pokdakanQuery->where(function ($q) use ($kabupaten) {
                    $q->where('kabupaten_kota', $kabupaten)
                      ->orWhere('kabupaten_kota', 'like', "%{$kabupaten}%");
                });
            }
        }
        
        // Search filter
        if ($search) {
            $pokdakanQuery->where(function ($q) use ($search) {
                $q->where('nama_pokdakan', 'like', "%{$search}%")
                  ->orWhere('pekon_desa', 'like', "%{$search}%")
                  ->orWhere('nama_ketua', 'like', "%{$search}%");
            });
        }

        $pokdakans = $pokdakanQuery->get();

        // For laporan, we want to fetch the ones related to the filtered Pokdakans
        $pokdakanIds = $pokdakans->pluck('id');

        $laporanMesinQuery = LaporanMesinPakan::with('pokdakan')
            ->whereIn('pokdakan_id', $pokdakanIds)
            ->orderBy('tanggal_input', 'desc');

        $laporanRasQuery = LaporanKolamRas::with('pokdakan')
            ->whereIn('pokdakan_id', $pokdakanIds)
            ->orderBy('tanggal_input', 'desc');

        // Filter periode tanggal untuk laporan produksi & operasional
        if ($periode && $periode !== 'semua') {
            $startDate = match ($periode) {
                'hari' => now()->startOfDay(),
                'minggu' => now()->subDays(7)->startOfDay(),
                'bulan' => now()->startOfMonth(),
                'tahun' => now()->startOfYear(),
                default => null,
            };

            if ($startDate) {
                $laporanMesinQuery->where('tanggal_input', '>=', $startDate->toDateString());
                $laporanRasQuery->where('tanggal_input', '>=', $startDate->toDateString());
            }
        }

        $laporanMesin = $laporanMesinQuery->get();
        $laporanRas = $laporanRasQuery->get();

        // Hitung Mesin Aktif & Non-aktif berdasarkan status laporan (periode ini atau terkini)
        $mesinAktif = 0;
        $mesinNonAktif = 0;
        foreach ($pokdakans as $p) {
            $jmlMesin = (int) $p->jumlah_mesin_pakan;
            if ($jmlMesin > 0) {
                $latestMesin = $laporanMesin->where('pokdakan_id', $p->id)->sortByDesc('tanggal_input')->first();
                if (!$latestMesin) {
                    $latestMesin = LaporanMesinPakan::where('pokdakan_id', $p->id)->orderBy('tanggal_input', 'desc')->first();
                }

                if ($latestMesin && !str_contains(strtolower($latestMesin->status_mesin), 'baik')) {
                    $mesinNonAktif += $jmlMesin;
                } else {
                    $mesinAktif += $jmlMesin;
                }
            }
        }

        // Hitung Kolam Aktif & Non-aktif berdasarkan status siklus (periode ini atau terkini)
        $kolamAktif = 0;
        $kolamNonAktif = 0;
        foreach ($pokdakans as $p) {
            $jmlKolam = (int) $p->jumlah_kolam_ras;
            if ($jmlKolam > 0) {
                $latestRas = $laporanRas->where('pokdakan_id', $p->id)->sortByDesc('tanggal_input')->first();
                if (!$latestRas) {
                    $latestRas = LaporanKolamRas::where('pokdakan_id', $p->id)->orderBy('tanggal_input', 'desc')->first();
                }

                if ($latestRas && str_contains(strtolower($latestRas->status_siklus), 'gagal')) {
                    $kolamNonAktif += $jmlKolam;
                } else {
                    $kolamAktif += $jmlKolam;
                }
            }
        }

        // Extra Calculations untuk Produksi
        $totalProduksiPakan = (float) $laporanMesin->sum('produksi_pakan_kg');
        $totalProduksiRas = (float) $laporanRas->sum('total_panen_kg');
        $totalProduksiIkan = (float) $laporanRas->sum('total_panen_kg');
        $totalBenihIkan = (int) $laporanRas->sum('jumlah_benih_ekor');
        $totalPendapatanRas = (float) $laporanRas->sum('total_pendapatan');

        // Summary Counts (otomatis terfilter berdasarkan wilayah/kabupaten dan search)
        $summary = [
            'total_pokdakan' => $pokdakans->count(),
            'total_mesin' => $pokdakans->sum('jumlah_mesin_pakan'),
            'mesin_aktif' => $mesinAktif,
            'mesin_non_aktif' => $mesinNonAktif,
            'total_kolam' => $pokdakans->sum('jumlah_kolam_ras'),
            'kolam_aktif' => $kolamAktif,
            'kolam_non_aktif' => $kolamNonAktif,
            'total_laporan_mesin' => $laporanMesin->count(),
            'total_laporan_ras' => $laporanRas->count(),
            'total_produksi_pakan' => $totalProduksiPakan,
            'total_produksi_ras' => $totalProduksiRas,
            'total_panen_ras' => $totalProduksiRas,
            'total_produksi_ikan' => $totalProduksiIkan,
            'total_benih_ikan' => $totalBenihIkan,
            'total_pendapatan_ras' => $totalPendapatanRas,
            'periode' => $periode,
        ];
        
        // Daftar 15 Kabupaten & Kota di Provinsi Lampung dengan titik koordinat pusat
        $daftarDaerahLampung = [
            ['nama' => 'Bandar Lampung', 'tipe' => 'Kota', 'lat' => -5.4297, 'lng' => 105.2625],
            ['nama' => 'Metro', 'tipe' => 'Kota', 'lat' => -5.1136, 'lng' => 105.3069],
            ['nama' => 'Lampung Selatan', 'tipe' => 'Kabupaten', 'lat' => -5.6123, 'lng' => 105.5872],
            ['nama' => 'Pesawaran', 'tipe' => 'Kabupaten', 'lat' => -5.4287, 'lng' => 105.1764],
            ['nama' => 'Tanggamus', 'tipe' => 'Kabupaten', 'lat' => -5.4833, 'lng' => 104.6242],
            ['nama' => 'Pringsewu', 'tipe' => 'Kabupaten', 'lat' => -5.3587, 'lng' => 104.9744],
            ['nama' => 'Lampung Barat', 'tipe' => 'Kabupaten', 'lat' => -5.1500, 'lng' => 104.1931],
            ['nama' => 'Pesisir Barat', 'tipe' => 'Kabupaten', 'lat' => -5.1933, 'lng' => 103.9398],
            ['nama' => 'Lampung Tengah', 'tipe' => 'Kabupaten', 'lat' => -4.9818, 'lng' => 105.2167],
            ['nama' => 'Lampung Timur', 'tipe' => 'Kabupaten', 'lat' => -5.1054, 'lng' => 105.6811],
            ['nama' => 'Lampung Utara', 'tipe' => 'Kabupaten', 'lat' => -4.8142, 'lng' => 104.8814],
            ['nama' => 'Way Kanan', 'tipe' => 'Kabupaten', 'lat' => -4.4469, 'lng' => 104.5269],
            ['nama' => 'Tulang Bawang', 'tipe' => 'Kabupaten', 'lat' => -4.4754, 'lng' => 105.2394],
            ['nama' => 'Tulang Bawang Barat', 'tipe' => 'Kabupaten', 'lat' => -4.4367, 'lng' => 105.0489],
            ['nama' => 'Mesuji', 'tipe' => 'Kabupaten', 'lat' => -4.0415, 'lng' => 105.4124],
        ];

        // Hitung total pokdakan, mesin pakan, dan kolam RAS untuk setiap daerah yang terdaftar
        $allPokdakanForMap = Pokdakan::all();
        $pokdakanByKabupaten = $allPokdakanForMap->groupBy(function($item) {
            return strtolower(trim($item->kabupaten_kota ?? ''));
        });

        $mapData = [];
        foreach ($daftarDaerahLampung as $daerah) {
            $key = strtolower(trim($daerah['nama']));
            $pokdakansInDaerah = $pokdakanByKabupaten->get($key, collect([]));

            $mapData[] = [
                'nama' => $daerah['nama'],
                'tipe' => $daerah['tipe'],
                'lat' => $daerah['lat'],
                'lng' => $daerah['lng'],
                'total_pokdakan' => $pokdakansInDaerah->count(),
                'total_mesin_pakan' => (int) $pokdakansInDaerah->sum('jumlah_mesin_pakan'),
                'total_kolam_ras' => (int) $pokdakansInDaerah->sum('jumlah_kolam_ras'),
            ];
        }

        // Get list of unique kabupatens for the dropdown filter (only for admin_provinsi)
        $listKabupaten = [];
        if ($user->role === 'admin_provinsi') {
            $listKabupaten = collect($daftarDaerahLampung)->pluck('nama')->toArray();
        }

        // Chart Data Calculation
        $chartData = [];
        
        if ($user->role === 'admin_provinsi') {
            // Group by Kabupaten
            $groupedMesin = $laporanMesin->groupBy(function($item) {
                return $item->pokdakan->kabupaten_kota;
            });
            $groupedRas = $laporanRas->groupBy(function($item) {
                return $item->pokdakan->kabupaten_kota;
            });
            
            $keys = collect($groupedMesin->keys())->merge($groupedRas->keys())->unique();
            foreach ($keys as $key) {
                $countMesin = $groupedMesin->has($key) ? $groupedMesin[$key]->count() : 0;
                $countRas = $groupedRas->has($key) ? $groupedRas[$key]->count() : 0;
                $chartData[] = [
                    'name' => $key,
                    'Total Laporan' => $countMesin + $countRas,
                ];
            }
        } else {
            // Group by Pokdakan for Admin Kabupaten
            $groupedMesin = $laporanMesin->groupBy(function($item) {
                return $item->pokdakan->nama_pokdakan;
            });
            $groupedRas = $laporanRas->groupBy(function($item) {
                return $item->pokdakan->nama_pokdakan;
            });
            
            $keys = collect($groupedMesin->keys())->merge($groupedRas->keys())->unique();
            foreach ($keys as $key) {
                $countMesin = $groupedMesin->has($key) ? $groupedMesin[$key]->count() : 0;
                $countRas = $groupedRas->has($key) ? $groupedRas[$key]->count() : 0;
                $chartData[] = [
                    'name' => $key,
                    'Total Laporan' => $countMesin + $countRas,
                ];
            }
        }

        return Inertia::render('dashboard', [
            'summary' => $summary,
            'pokdakans' => $pokdakans,
            'laporan_mesin' => $laporanMesin,
            'laporan_ras' => $laporanRas,
            'chartData' => $chartData,
            'mapData' => $mapData,
            'role' => $user->role,
            'user_kabupaten' => $user->kabupaten,
            'filters' => [
                'search' => $search,
                'kabupaten' => $kabupaten,
                'periode' => $periode,
            ],
            'list_kabupaten' => $listKabupaten
        ]);
    }
}
