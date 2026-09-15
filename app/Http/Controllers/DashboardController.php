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

        // Base query for Pokdakan based on role
        $pokdakanQuery = Pokdakan::with(['laporanMesinPakan', 'laporanKolamRas', 'user']);

        // Role restriction
        if ($user->role !== 'admin_provinsi') {
            $pokdakanQuery->where('kabupaten_kota', $user->kabupaten);
        } else {
            // Apply kabupaten filter if admin_provinsi
            if ($kabupaten) {
                $pokdakanQuery->where('kabupaten_kota', $kabupaten);
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

        $laporanMesin = $laporanMesinQuery->get();
        $laporanRas = $laporanRasQuery->get();

        // Extra Calculations
        $totalProduksiPakan = $laporanMesin->sum('produksi_pakan_kg');
        $totalPanenRas = $laporanRas->sum('total_panen_kg');

        // Summary Counts
        $summary = [
            'total_pokdakan' => $pokdakans->count(),
            'total_mesin' => $pokdakans->sum('jumlah_mesin_pakan'),
            'total_kolam' => $pokdakans->sum('jumlah_kolam_ras'),
            'total_laporan_mesin' => $laporanMesin->count(),
            'total_laporan_ras' => $laporanRas->count(),
            'total_produksi_pakan' => $totalProduksiPakan,
            'total_panen_ras' => $totalPanenRas,
        ];
        
        // Get list of unique kabupatens for the dropdown filter (only for admin_provinsi)
        $listKabupaten = [];
        if ($user->role === 'admin_provinsi') {
            $listKabupaten = Pokdakan::select('kabupaten_kota')->distinct()->pluck('kabupaten_kota');
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
            'role' => $user->role,
            'user_kabupaten' => $user->kabupaten,
            'filters' => [
                'search' => $search,
                'kabupaten' => $kabupaten,
            ],
            'list_kabupaten' => $listKabupaten
        ]);
    }
}
