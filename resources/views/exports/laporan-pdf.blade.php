<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>Laporan Rekapitulasi SAIMUARA - Dinas Kelautan dan Perikanan Provinsi Lampung</title>
    <style>
        @page {
            size: A4 landscape;
            margin: 1.5cm 1.5cm 1.5cm 1.5cm;
        }
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10px;
            color: #1e293b;
            line-height: 1.4;
            margin: 0;
            padding: 0;
        }
        .header {
            text-align: center;
            margin-bottom: 12px;
            position: relative;
        }
        .header h3 {
            margin: 0;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 1px;
            color: #0f172a;
        }
        .header h2 {
            margin: 2px 0;
            font-size: 15px;
            font-weight: 800;
            color: #1e3a8a;
            letter-spacing: 0.5px;
        }
        .header p {
            margin: 2px 0 0 0;
            font-size: 8.5px;
            color: #475569;
        }
        .divider {
            border-top: 2px solid #0f172a;
            border-bottom: 1px solid #0f172a;
            height: 2px;
            margin: 8px 0 14px 0;
        }
        .report-title {
            text-align: center;
            margin-bottom: 14px;
        }
        .report-title h1 {
            font-size: 13px;
            font-weight: 700;
            margin: 0;
            color: #0f172a;
            text-transform: uppercase;
        }
        .meta-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            padding: 8px 12px;
            margin-bottom: 14px;
            width: 100%;
        }
        .meta-table {
            width: 100%;
            border-collapse: collapse;
        }
        .meta-table td {
            font-size: 9.5px;
            padding: 2px 4px;
        }
        .meta-label {
            color: #64748b;
            width: 15%;
            font-weight: 500;
        }
        .meta-val {
            color: #0f172a;
            font-weight: 600;
            width: 35%;
        }

        /* Metrics summary cards */
        .summary-grid {
            width: 100%;
            margin-bottom: 16px;
            border-collapse: separate;
            border-spacing: 6px;
        }
        .summary-card {
            background-color: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            padding: 6px 10px;
            text-align: center;
        }
        .summary-title {
            font-size: 8.5px;
            color: #64748b;
            text-transform: uppercase;
            font-weight: 600;
        }
        .summary-num {
            font-size: 14px;
            font-weight: 800;
            color: #1e40af;
            margin-top: 2px;
        }
        .summary-sub {
            font-size: 8px;
            color: #475569;
            margin-top: 1px;
        }

        /* Section Headings */
        .section-title {
            font-size: 11px;
            font-weight: 700;
            color: #1e3a8a;
            margin: 14px 0 6px 0;
            text-transform: uppercase;
            border-bottom: 1.5px solid #bfdbfe;
            padding-bottom: 3px;
        }

        /* Tables */
        table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 14px;
            font-size: 8.5px;
        }
        table.data-table th {
            background-color: #1e40af;
            color: #ffffff;
            font-weight: 600;
            text-align: left;
            padding: 5px 6px;
            border: 1px solid #1e3a8a;
            font-size: 8.5px;
        }
        table.data-table td {
            padding: 4px 6px;
            border: 1px solid #cbd5e1;
            vertical-align: middle;
        }
        table.data-table tr:nth-child(even) {
            background-color: #f8fafc;
        }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .badge {
            display: inline-block;
            padding: 1px 5px;
            border-radius: 3px;
            font-size: 7.5px;
            font-weight: 600;
        }
        .badge-success { background-color: #dcfce7; color: #166534; }
        .badge-danger { background-color: #fee2e2; color: #991b1b; }
        .badge-info { background-color: #e0f2fe; color: #075985; }

        /* Signature block */
        .signature-table {
            width: 100%;
            margin-top: 24px;
            page-break-inside: avoid;
        }
        .signature-table td {
            vertical-align: top;
            font-size: 9.5px;
        }
        .signature-box {
            text-align: center;
            width: 250px;
            float: right;
        }
    </style>
</head>
<body>

    <!-- KOP RESMI DINAS -->
    <div class="header">
        <h3>PEMERINTAH PROVINSI LAMPUNG</h3>
        <h2>DINAS KELAUTAN DAN PERIKANAN</h2>
        <p>Sistem Informasi & Monitoring Bantuan Akuakultur Mandiri (SAIMUARA)</p>
        <p>Jl. Gatot Subroto No. 63, Pahoman, Enggal, Kota Bandar Lampung, Lampung 35222</p>
    </div>
    <div class="divider"></div>

    <!-- JUDUL LAPORAN -->
    <div class="report-title">
        <h1>Laporan Rekapitulasi Data Bantuan Pokdakan, Mesin Pakan & Kolam RAS</h1>
    </div>

    <!-- METADATA LAPORAN -->
    <div class="meta-box">
        <table class="meta-table">
            <tr>
                <td class="meta-label">Wilayah :</td>
                <td class="meta-val">{{ $kabupaten }}</td>
                <td class="meta-label">Tanggal Unduh :</td>
                <td class="meta-val">{{ $tanggalCetak }} WIB</td>
            </tr>
            <tr>
                <td class="meta-label">Periode Filter :</td>
                <td class="meta-val">{{ $periodeLabel }}</td>
                <td class="meta-label">Dicetak Oleh :</td>
                <td class="meta-val">{{ $userName }} (Admin Provinsi)</td>
            </tr>
        </table>
    </div>

    <!-- RINGKASAN METRIK -->
    <table class="summary-grid">
        <tr>
            <td class="summary-card" width="16%">
                <div class="summary-title">Pokdakan</div>
                <div class="summary-num">{{ number_format($totalPokdakan) }}</div>
                <div class="summary-sub">Kelompok Terdaftar</div>
            </td>
            <td class="summary-card" width="16%">
                <div class="summary-title">Mesin Pakan</div>
                <div class="summary-num">{{ number_format($totalMesin) }} Unit</div>
                <div class="summary-sub">{{ number_format($mesinAktif) }} Baik / {{ number_format($mesinRusak) }} Kendala</div>
            </td>
            <td class="summary-card" width="16%">
                <div class="summary-title">Kolam RAS</div>
                <div class="summary-num">{{ number_format($totalKolam) }} Unit</div>
                <div class="summary-sub">{{ number_format($kolamAktif) }} Berjalan</div>
            </td>
            <td class="summary-card" width="18%">
                <div class="summary-title">Produksi Pakan</div>
                <div class="summary-num">{{ number_format($totalProduksiPakan, 1) }} Kg</div>
                <div class="summary-sub">Hasil Produksi Mandiri</div>
            </td>
            <td class="summary-card" width="17%">
                <div class="summary-title">Hasil Panen Ikan</div>
                <div class="summary-num">{{ number_format($totalPanenKg, 1) }} Kg</div>
                <div class="summary-sub">Total Panen Siklus</div>
            </td>
            <td class="summary-card" width="17%">
                <div class="summary-title">Total Pendapatan</div>
                <div class="summary-num">Rp {{ number_format($totalPendapatan, 0, ',', '.') }}</div>
                <div class="summary-sub">Estimasi Nilai Panen</div>
            </td>
        </tr>
    </table>

    <!-- 1. DATA POKDAKAN -->
    <div class="section-title">1. Data Kelompok Pembudidaya Ikan (Pokdakan) Penerima Bantuan ({{ count($pokdakans) }} Kelompok)</div>
    <table class="data-table">
        <thead>
            <tr>
                <th width="3%" class="text-center">No</th>
                <th width="16%">Nama Pokdakan</th>
                <th width="12%">Nama Ketua</th>
                <th width="10%">No. WhatsApp</th>
                <th width="14%">Pekon / Desa</th>
                <th width="12%">Kecamatan</th>
                <th width="13%">Kabupaten / Kota</th>
                <th width="5%" class="text-center">Tahun</th>
                <th width="7%" class="text-center">Mesin (Unit)</th>
                <th width="8%" class="text-center">Kolam (Unit)</th>
            </tr>
        </thead>
        <tbody>
            @forelse($pokdakans as $idx => $p)
                <tr>
                    <td class="text-center">{{ $idx + 1 }}</td>
                    <td><strong>{{ $p->nama_pokdakan }}</strong></td>
                    <td>{{ $p->nama_ketua }}</td>
                    <td>{{ $p->no_whatsapp }}</td>
                    <td>{{ $p->pekon_desa }}</td>
                    <td>{{ $p->kecamatan }}</td>
                    <td>{{ $p->kabupaten_kota }}</td>
                    <td class="text-center">{{ $p->tahun_anggaran }}</td>
                    <td class="text-center">{{ (int) $p->jumlah_mesin_pakan }}</td>
                    <td class="text-center">{{ (int) $p->jumlah_kolam_ras }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="10" class="text-center" style="padding: 10px; color: #94a3b8;">Tidak ada data Pokdakan untuk filter yang dipilih.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <!-- 2. LAPORAN MESIN PAKAN -->
    <div class="section-title" style="page-break-before: auto;">2. Laporan Produksi & Status Mesin Pakan Mandiri ({{ count($laporanMesin) }} Laporan)</div>
    <table class="data-table">
        <thead>
            <tr>
                <th width="3%" class="text-center">No</th>
                <th width="9%">Tanggal</th>
                <th width="17%">Nama Pokdakan</th>
                <th width="13%">Kabupaten / Kota</th>
                <th width="11%" class="text-center">Status Mesin</th>
                <th width="11%" class="text-right">Produksi (Kg)</th>
                <th width="13%" class="text-right">Biaya/Kg (Rp)</th>
                <th width="23%">Bahan Baku / Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @forelse($laporanMesin as $idx => $lm)
                <tr>
                    <td class="text-center">{{ $idx + 1 }}</td>
                    <td>{{ \Carbon\Carbon::parse($lm->tanggal_input)->format('d/m/Y') }}</td>
                    <td><strong>{{ $lm->pokdakan?->nama_pokdakan ?: '-' }}</strong></td>
                    <td>{{ $lm->pokdakan?->kabupaten_kota ?: '-' }}</td>
                    <td class="text-center">
                        <span class="badge {{ str_contains(strtolower($lm->status_mesin), 'baik') ? 'badge-success' : 'badge-danger' }}">
                            {{ $lm->status_mesin }}
                        </span>
                    </td>
                    <td class="text-right">{{ number_format($lm->produksi_pakan_kg, 1) }}</td>
                    <td class="text-right">Rp {{ number_format($lm->biaya_produksi_per_kg, 0, ',', '.') }}</td>
                    <td>
                        {{ $lm->bahan_baku_utama ?: '-' }}
                        @if($lm->keterangan_kendala)
                            <div style="font-size: 7.5px; color: #64748b; margin-top: 1px;">Kendala: {{ $lm->keterangan_kendala }}</div>
                        @endif
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="8" class="text-center" style="padding: 10px; color: #94a3b8;">Tidak ada data laporan mesin pakan untuk filter yang dipilih.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <!-- 3. LAPORAN KOLAM RAS -->
    <div class="section-title" style="page-break-before: auto;">3. Laporan Budidaya Kolam RAS ({{ count($laporanRas) }} Laporan)</div>
    <table class="data-table">
        <thead>
            <tr>
                <th width="3%" class="text-center">No</th>
                <th width="9%">Tanggal</th>
                <th width="16%">Nama Pokdakan</th>
                <th width="12%">Kabupaten / Kota</th>
                <th width="6%" class="text-center">Siklus</th>
                <th width="10%">Komoditas</th>
                <th width="9%" class="text-center">Status</th>
                <th width="11%" class="text-right">Benih (Ekor)</th>
                <th width="11%" class="text-right">Hasil Panen (Kg)</th>
                <th width="13%" class="text-right">Pendapatan (Rp)</th>
            </tr>
        </thead>
        <tbody>
            @forelse($laporanRas as $idx => $lr)
                <tr>
                    <td class="text-center">{{ $idx + 1 }}</td>
                    <td>{{ \Carbon\Carbon::parse($lr->tanggal_input)->format('d/m/Y') }}</td>
                    <td><strong>{{ $lr->pokdakan?->nama_pokdakan ?: '-' }}</strong></td>
                    <td>{{ $lr->pokdakan?->kabupaten_kota ?: '-' }}</td>
                    <td class="text-center">Ke-{{ $lr->siklus_ke }}</td>
                    <td>Ikan {{ $lr->komoditas_ikan }}</td>
                    <td class="text-center">
                        <span class="badge {{ strtolower($lr->status_siklus) === 'panen' ? 'badge-info' : 'badge-success' }}">
                            {{ $lr->status_siklus }}
                        </span>
                    </td>
                    <td class="text-right">{{ number_format($lr->jumlah_benih_ekor) }}</td>
                    <td class="text-right">{{ $lr->total_panen_kg ? number_format($lr->total_panen_kg, 1) : '-' }}</td>
                    <td class="text-right">{{ $lr->total_pendapatan ? 'Rp ' . number_format($lr->total_pendapatan, 0, ',', '.') : '-' }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="10" class="text-center" style="padding: 10px; color: #94a3b8;">Tidak ada data laporan kolam RAS untuk filter yang dipilih.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <!-- LEMBAR PENGESAHAN / TANDA TANGAN -->
    <table class="signature-table">
        <tr>
            <td width="60%"></td>
            <td width="40%">
                <div class="signature-box">
                    <p style="margin-bottom: 2px;">Bandar Lampung, {{ \Carbon\Carbon::now()->translatedFormat('d F Y') }}</p>
                    <p style="font-weight: 600; margin-top: 0;">Pengelola Data dan Pelaporan SAIMUARA</p>
                    <div style="height: 50px;"></div>
                    <p style="font-weight: 700; text-decoration: underline; margin-bottom: 2px;">{{ $userName }}</p>
                    <p style="margin: 0; color: #475569;">Dinas Kelautan dan Perikanan Provinsi Lampung</p>
                </div>
            </td>
        </tr>
    </table>

</body>
</html>
