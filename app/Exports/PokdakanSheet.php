<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class PokdakanSheet implements FromCollection, WithHeadings, WithTitle, ShouldAutoSize, WithStyles
{
    protected Collection $pokdakans;

    public function __construct(Collection $pokdakans)
    {
        $this->pokdakans = $pokdakans;
    }

    public function collection(): Collection
    {
        return $this->pokdakans->map(function ($item, $index) {
            return [
                'no' => $index + 1,
                'nama_pokdakan' => $item->nama_pokdakan,
                'nama_ketua' => $item->nama_ketua,
                'no_whatsapp' => $item->no_whatsapp,
                'pekon_desa' => $item->pekon_desa,
                'kecamatan' => $item->kecamatan,
                'kabupaten_kota' => $item->kabupaten_kota,
                'no_badan_hukum_sk' => $item->no_badan_hukum_sk ?: '-',
                'tahun_anggaran' => $item->tahun_anggaran,
                'jumlah_mesin' => (int) $item->jumlah_mesin_pakan,
                'spesifikasi_mesin' => $item->spesifikasi_mesin ?: '-',
                'jumlah_kolam' => (int) $item->jumlah_kolam_ras,
                'spesifikasi_kolam' => $item->spesifikasi_kolam ?: '-',
            ];
        });
    }

    public function headings(): array
    {
        return [
            'No',
            'Nama Kelompok (Pokdakan)',
            'Nama Ketua',
            'No. WhatsApp',
            'Desa / Pekon',
            'Kecamatan',
            'Kabupaten / Kota',
            'No. SK / Badan Hukum',
            'Tahun Anggaran',
            'Jumlah Mesin Pakan (Unit)',
            'Spesifikasi Mesin Pakan',
            'Jumlah Kolam RAS (Unit)',
            'Spesifikasi Kolam RAS',
        ];
    }

    public function title(): string
    {
        return 'Data Pokdakan';
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
