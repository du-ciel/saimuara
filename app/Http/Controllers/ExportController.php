<?php

namespace App\Http\Controllers;

use App\Exports\SaimuaraLaporanExport;
use App\Models\LaporanKolamRas;
use App\Models\LaporanMesinPakan;
use App\Models\Pokdakan;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
    private function prepareData(Request $request): array
    {
        $user = $request->user();
        if ($user->role !== 'admin_provinsi') {
            abort(403, 'Akses dibatasi. Fitur ekspor laporan lengkap hanya untuk Admin Provinsi.');
        }

        $kabupaten = $request->input('kabupaten', 'semua');
        $periode = $request->input('periode', 'semua');

        // Query Pokdakan
        $pokdakanQuery = Pokdakan::with(['laporanMesinPakan', 'laporanKolamRas']);

        if ($kabupaten && $kabupaten !== 'semua') {
            $pokdakanQuery->where(function ($q) use ($kabupaten) {
                $q->where('kabupaten_kota', $kabupaten)
                  ->orWhere('kabupaten_kota', 'like', "%{$kabupaten}%");
            });
        }

        $pokdakans = $pokdakanQuery->get();
        $pokdakanIds = $pokdakans->pluck('id');

        // Query Laporan Mesin & RAS
        $laporanMesinQuery = LaporanMesinPakan::with('pokdakan')
            ->whereIn('pokdakan_id', $pokdakanIds)
            ->orderBy('tanggal_input', 'desc');

        $laporanRasQuery = LaporanKolamRas::with('pokdakan')
            ->whereIn('pokdakan_id', $pokdakanIds)
            ->orderBy('tanggal_input', 'desc');

        // Filter Periode
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

        // Hitung Ringkasan Statistik
        $totalPokdakan = $pokdakans->count();
        $totalMesin = (int) $pokdakans->sum('jumlah_mesin_pakan');
        $totalKolam = (int) $pokdakans->sum('jumlah_kolam_ras');

        $mesinAktif = 0;
        $mesinRusak = 0;
        foreach ($pokdakans as $p) {
            if ((int) $p->jumlah_mesin_pakan > 0) {
                $latest = $laporanMesin->where('pokdakan_id', $p->id)->sortByDesc('tanggal_input')->first();
                if (!$latest) {
                    $latest = LaporanMesinPakan::where('pokdakan_id', $p->id)->orderBy('tanggal_input', 'desc')->first();
                }

                if ($latest && !str_contains(strtolower($latest->status_mesin), 'baik')) {
                    $mesinRusak += (int) $p->jumlah_mesin_pakan;
                } else {
                    $mesinAktif += (int) $p->jumlah_mesin_pakan;
                }
            }
        }

        $kolamAktif = 0;
        foreach ($pokdakans as $p) {
            if ((int) $p->jumlah_kolam_ras > 0) {
                $latest = $laporanRas->where('pokdakan_id', $p->id)->sortByDesc('tanggal_input')->first();
                if (!$latest) {
                    $latest = LaporanKolamRas::where('pokdakan_id', $p->id)->orderBy('tanggal_input', 'desc')->first();
                }

                if ($latest && strtolower($latest->status_siklus) === 'berjalan') {
                    $kolamAktif += (int) $p->jumlah_kolam_ras;
                }
            }
        }

        $totalProduksiPakan = (float) $laporanMesin->sum('produksi_pakan_kg');
        $totalPanenKg = (float) $laporanRas->sum('total_panen_kg');
        $totalPendapatan = (float) $laporanRas->sum('total_pendapatan');

        $periodeLabels = [
            'semua' => 'Seluruh Periode Tercatat',
            'hari' => 'Hari Ini (' . now()->translatedFormat('d F Y') . ')',
            'minggu' => '7 Hari Terakhir',
            'bulan' => 'Bulan Ini (' . now()->translatedFormat('F Y') . ')',
            'tahun' => 'Tahun Berjalan (' . now()->format('Y') . ')',
        ];

        return [
            'pokdakans' => $pokdakans,
            'laporanMesin' => $laporanMesin,
            'laporanRas' => $laporanRas,
            'kabupaten' => ($kabupaten && $kabupaten !== 'semua') ? "Kabupaten {$kabupaten}" : 'Seluruh Kabupaten / Kota di Provinsi Lampung',
            'kabupatenClean' => ($kabupaten && $kabupaten !== 'semua') ? str_replace(' ', '_', $kabupaten) : 'Semua_Wilayah',
            'periodeLabel' => $periodeLabels[$periode] ?? 'Semua Periode',
            'periodeClean' => $periode,
            'tanggalCetak' => Carbon::now()->translatedFormat('d F Y, H:i'),
            'userName' => $user->name,
            'totalPokdakan' => $totalPokdakan,
            'totalMesin' => $totalMesin,
            'mesinAktif' => $mesinAktif,
            'mesinRusak' => $mesinRusak,
            'totalKolam' => $totalKolam,
            'kolamAktif' => $kolamAktif,
            'totalProduksiPakan' => $totalProduksiPakan,
            'totalPanenKg' => $totalPanenKg,
            'totalPendapatan' => $totalPendapatan,
        ];
    }

    public function exportExcel(Request $request)
    {
        $data = $this->prepareData($request);
        $filename = 'Laporan_SAIMUARA_' . $data['kabupatenClean'] . '_' . date('Ymd_His') . '.xlsx';

        return Excel::download(
            new SaimuaraLaporanExport(
                $data['pokdakans'],
                $data['laporanMesin'],
                $data['laporanRas']
            ),
            $filename
        );
    }

    public function exportPdf(Request $request)
    {
        $data = $this->prepareData($request);
        $filename = 'Laporan_SAIMUARA_' . $data['kabupatenClean'] . '_' . date('Ymd_His') . '.pdf';

        $pdf = Pdf::loadView('exports.laporan-pdf', $data)
            ->setPaper('a4', 'landscape')
            ->setOption([
                'isHtml5ParserEnabled' => true,
                'isRemoteEnabled' => true,
                'defaultFont' => 'sans-serif'
            ]);

        if ($request->has('stream')) {
            return $pdf->stream($filename);
        }

        return $pdf->download($filename);
    }
}
