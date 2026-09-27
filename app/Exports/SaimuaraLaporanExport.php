<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\Export;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class SaimuaraLaporanExport implements Export, WithMultipleSheets
{
    protected Collection $pokdakans;
    protected Collection $laporanMesin;
    protected Collection $laporanRas;

    public function __construct(Collection $pokdakans, Collection $laporanMesin, Collection $laporanRas)
    {
        $this->pokdakans = $pokdakans;
        $this->laporanMesin = $laporanMesin;
        $this->laporanRas = $laporanRas;
    }

    public function sheets(): array
    {
        return [
            new PokdakanSheet($this->pokdakans),
            new MesinPakanSheet($this->laporanMesin),
            new KolamRasSheet($this->laporanRas),
        ];
    }
}
