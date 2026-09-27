<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class MesinPakanSheet implements FromCollection, WithHeadings, WithTitle, ShouldAutoSize, WithStyles
{
    protected Collection $laporanMesin;

    public function __construct(Collection $laporanMesin)
    {
        $this->laporanMesin = $laporanMesin;
    }

    public function collection(): Collection
    {
        return $this->laporanMesin->map(function ($item, $index) {
            $biayaPerKg = (float) $item->biaya_produksi_per_kg;
            $produksiKg = (float) $item->produksi_pakan_kg;
            $totalBiaya = $biayaPerKg * $produksiKg;

            return [
                'no' => $index + 1,
                'tanggal_input' => $item->tanggal_input,
                'nama_pokdakan' => $item->pokdakan?->nama_pokdakan ?: '-',
                'kabupaten_kota' => $item->pokdakan?->kabupaten_kota ?: '-',
                'status_mesin' => $item->status_mesin,
                'produksi_pakan_kg' => $produksiKg,
                'biaya_produksi_per_kg' => $biayaPerKg,
                'total_biaya' => $totalBiaya,
                'bahan_baku_utama' => $item->bahan_baku_utama ?: '-',
                'keterangan_kendala' => $item->keterangan_kendala ?: '-',
            ];
        });
    }

    public function headings(): array
    {
        return [
            'No',
            'Tanggal Laporan',
            'Nama Kelompok (Pokdakan)',
            'Kabupaten / Kota',
            'Status Mesin',
            'Produksi Pakan (Kg)',
            'Biaya Produksi / Kg (Rp)',
            'Total Biaya Produksi (Rp)',
            'Bahan Baku Utama',
            'Keterangan / Kendala',
        ];
    }

    public function title(): string
    {
        return 'Laporan Mesin Pakan';
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => [
                'font' => ['bold' => true, 'color' => ['argb' => 'FFFFFFFF']],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => ['argb' => 'FF1E40AF'], // Dark Blue
                ],
            ],
        ];
    }
}
