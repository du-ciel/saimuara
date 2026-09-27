<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class KolamRasSheet implements FromCollection, WithHeadings, WithTitle, ShouldAutoSize, WithStyles
{
    protected Collection $laporanRas;

    public function __construct(Collection $laporanRas)
    {
        $this->laporanRas = $laporanRas;
    }

    public function collection(): Collection
    {
        return $this->laporanRas->map(function ($item, $index) {
            return [
                'no' => $index + 1,
                'tanggal_input' => $item->tanggal_input,
                'nama_pokdakan' => $item->pokdakan?->nama_pokdakan ?: '-',
                'kabupaten_kota' => $item->pokdakan?->kabupaten_kota ?: '-',
                'siklus_ke' => $item->siklus_ke,
                'status_siklus' => $item->status_siklus,
                'tanggal_tebar' => $item->tanggal_tebar ?: '-',
                'komoditas_ikan' => $item->komoditas_ikan,
                'jumlah_benih_ekor' => (int) $item->jumlah_benih_ekor,
                'ukuran_benih_cm' => $item->ukuran_benih_cm ?: '-',
                'kondisi_air' => $item->kondisi_air ?: '-',
                'kendala_penyakit' => $item->kendala_penyakit ?: '-',
                'tanggal_panen' => $item->tanggal_panen ?: '-',
                'total_panen_kg' => $item->total_panen_kg ? (float) $item->total_panen_kg : 0,
                'harga_jual_per_kg' => $item->harga_jual_per_kg ? (float) $item->harga_jual_per_kg : 0,
                'total_pendapatan' => $item->total_pendapatan ? (float) $item->total_pendapatan : 0,
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
            'Siklus Ke',
            'Status Siklus',
            'Tanggal Tebar',
            'Komoditas Ikan',
            'Jumlah Benih (Ekor)',
            'Ukuran Benih (cm)',
            'Kondisi Air',
            'Kendala Penyakit',
            'Tanggal Panen',
            'Hasil Panen (Kg)',
            'Harga Jual / Kg (Rp)',
            'Total Pendapatan (Rp)',
        ];
    }

    public function title(): string
    {
        return 'Laporan Kolam RAS';
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
