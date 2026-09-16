import { Head, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { useState } from 'react';
import { 
    Users, Settings, ArrowRight, Waves, FileText, FileSearch, Scale, Search, Filter, Cog, MapPin, Phone, Building2,
    Fish, CheckCircle2, XCircle, PackageCheck, AlertTriangle, TrendingUp, Layers, Activity, RotateCcw,
    LayoutGrid, Table2, Calendar
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import InteractiveMap, { DaerahMapItem } from '@/components/interactive-map';

interface Pokdakan {
    id: number;
    nama_pokdakan: string;
    nama_ketua: string;
    no_whatsapp: string;
    pekon_desa: string;
    kecamatan: string;
    kabupaten_kota: string;
    no_badan_hukum_sk: string;
    latitude: string | number | null;
    longitude: string | number | null;
    jumlah_mesin_pakan: number;
    spesifikasi_mesin: string;
    jumlah_kolam_ras: number;
    spesifikasi_kolam: string;
    [key: string]: any;
}

interface LaporanMesin {
    id: number;
    pokdakan: Pokdakan;
    tanggal_input: string;
    status_mesin: string;
    produksi_pakan_kg: number;
    bahan_baku_utama: string;
    biaya_produksi_per_kg: number;
    keterangan_kendala: string;
    [key: string]: any;
}

interface LaporanRas {
    id: number;
    pokdakan: Pokdakan;
    tanggal_input: string;
    siklus_ke: number;
    status_siklus: string;
    komoditas_ikan: string;
    jumlah_benih_ekor: number;
    kondisi_air: string;
    total_panen_kg: number;
    total_pendapatan: number;
    [key: string]: any;
}

interface Props {
    summary: {
        total_pokdakan: number;
        total_mesin: number;
        mesin_aktif: number;
        mesin_non_aktif: number;
        total_kolam: number;
        kolam_aktif: number;
        kolam_non_aktif: number;
        total_laporan_mesin: number;
        total_laporan_ras: number;
        total_produksi_pakan: number;
        total_produksi_ras: number;
        total_panen_ras: number;
        total_produksi_ikan: number;
        total_benih_ikan: number;
        total_pendapatan_ras: number;
        periode?: string;
    };
    pokdakans: Pokdakan[];
    laporan_mesin: LaporanMesin[];
    laporan_ras: LaporanRas[];
    chartData: any[];
    mapData: DaerahMapItem[];
    role: string;
    user_kabupaten: string | null;
    filters: { search: string | null; kabupaten: string | null; periode?: string | null };
    list_kabupaten: string[];
}

export default function Dashboard({ summary, pokdakans, laporan_mesin, laporan_ras, chartData, mapData, role, user_kabupaten, filters, list_kabupaten }: Props) {
    const [activeTab, setActiveTab] = useState<'pokdakan' | 'mesin' | 'ras'>('pokdakan');
    const [viewMode, setViewMode] = useState<'map' | 'chart'>('map');
    const [pokdakanViewMode, setPokdakanViewMode] = useState<'card' | 'table'>('card');
    
    // Filter States
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedKabupaten, setSelectedKabupaten] = useState(filters.kabupaten || 'semua');
    const [selectedPeriod, setSelectedPeriod] = useState(filters.periode || 'semua');

    // Dialog States
    const [selectedPokdakan, setSelectedPokdakan] = useState<Pokdakan | null>(null);
    const [isPokdakanListModalOpen, setIsPokdakanListModalOpen] = useState(false);
    const [selectedLaporanMesin, setSelectedLaporanMesin] = useState<LaporanMesin | null>(null);
    const [selectedLaporanRas, setSelectedLaporanRas] = useState<LaporanRas | null>(null);

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    };

    const formatNumber = (number: number = 0) => {
        return new Intl.NumberFormat('id-ID').format(number || 0);
    };

    const handlePeriodChange = (periode: string) => {
        setSelectedPeriod(periode);
        applyFilters(searchTerm, selectedKabupaten, periode);
    };

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            applyFilters(searchTerm, selectedKabupaten, selectedPeriod);
        }
    };

    const handleKabupatenChange = (val: string) => {
        setSelectedKabupaten(val);
        applyFilters(searchTerm, val, selectedPeriod);
    };

    const handleResetFilter = () => {
        setSearchTerm('');
        setSelectedKabupaten('semua');
        setSelectedPeriod('semua');
        router.get('/dashboard', {}, { preserveState: true, replace: true });
    };

    const applyFilters = (search: string, kab: string, period?: string) => {
        const p = period !== undefined ? period : selectedPeriod;
        router.get('/dashboard', {
            search: search || undefined,
            kabupaten: kab && kab !== 'semua' ? kab : undefined,
            periode: p && p !== 'semua' ? p : undefined,
        }, { preserveState: true, replace: true });
    };

    const scrollToPokdakanCards = () => {
        setActiveTab('pokdakan');
        setPokdakanViewMode('card');
        setTimeout(() => {
            const el = document.getElementById('section-pokdakan');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    const getPeriodLabel = (p: string) => {
        switch (p) {
            case 'hari': return 'Hari Ini';
            case 'minggu': return 'Minggu Ini';
            case 'bulan': return 'Bulan Ini';
            case 'tahun': return 'Tahun Ini';
            default: return 'Semua Waktu';
        }
    };

    return (
        <>
            <Head title="Dashboard" />
            <div className="relative flex h-full flex-1 flex-col gap-6 overflow-y-auto rounded-xl p-4 md:p-8 z-0">
                {/* Decorative background gradients (Hidden in Dark Mode) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 rounded-xl dark:opacity-0 transition-opacity duration-300">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px] mix-blend-multiply pointer-events-none"></div>
                    <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-teal-300/10 blur-[120px] mix-blend-multiply pointer-events-none"></div>
                </div>

                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-blue-950 dark:text-blue-50">
                            Dashboard Pemantauan
                        </h1>
                        <p className="text-slate-500 dark:text-neutral-400 mt-1">
                            {role === 'admin_provinsi' 
                                ? 'Memantau data program pakan mandiri dan kolam RAS dari seluruh Kabupaten di Provinsi Lampung.' 
                                : `Memantau data program khusus untuk Kabupaten ${user_kabupaten}.`}
                        </p>
                    </div>
                </div>

                {/* FILTER WILAYAH & PENCARIAN */}
                <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white/70 p-4 rounded-xl border border-slate-200/60 shadow-sm backdrop-blur-xl dark:bg-neutral-900/70 dark:border-neutral-800/60">
                    <div className="flex flex-col sm:flex-row gap-3 items-center flex-1">
                        {/* Input Pencarian */}
                        <div className="relative w-full sm:max-w-xs">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
                            <Input
                                type="search"
                                placeholder="Cari Kelompok / Desa..."
                                className="pl-8 bg-neutral-50 dark:bg-neutral-950"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </div>

                        {/* Filter Kabupaten (Khusus Admin Provinsi) */}
                        {role === 'admin_provinsi' ? (
                            <div className="w-full sm:max-w-xs flex items-center gap-2">
                                <Filter className="h-4 w-4 text-neutral-500 shrink-0" />
                                <Select value={selectedKabupaten} onValueChange={handleKabupatenChange}>
                                    <SelectTrigger className="w-full bg-neutral-50 dark:bg-neutral-950">
                                        <SelectValue placeholder="Pilih Kabupaten / Kota" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semua">Semua Kabupaten & Kota</SelectItem>
                                        {list_kabupaten.map(kab => (
                                            <SelectItem key={kab} value={kab}>{kab}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-xs font-medium text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50">
                                <MapPin className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                Wilayah: <strong>Kabupaten {user_kabupaten}</strong>
                            </div>
                        )}

                        {/* Tombol Reset Filter */}
                        {(selectedKabupaten !== 'semua' || searchTerm || selectedPeriod !== 'semua') && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleResetFilter}
                                className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1.5 h-9"
                                title="Reset semua filter pencarian dan periode"
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Reset Filter
                            </Button>
                        )}
                    </div>

                    {/* Tombol Interaktif: Pokdakan Terdaftar (Klik untuk buka daftar card) */}
                    <button
                        type="button"
                        onClick={() => setIsPokdakanListModalOpen(true)}
                        className="group flex items-center gap-2 self-start md:self-auto px-3.5 py-1.5 rounded-lg bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-xs hover:bg-blue-100 dark:hover:bg-blue-900/80 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                        title="Klik untuk membuka detail kelompok pembudidaya dalam bentuk kartu (Daftar Card)"
                    >
                        <Users className="h-4 w-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                        <span>{formatNumber(summary.total_pokdakan)} Pokdakan Terdaftar</span>
                        <span className="text-[10px] bg-blue-600 text-white rounded-full px-2 py-0.5 ml-1 font-medium group-hover:bg-blue-700 transition-colors inline-flex items-center gap-0.5 shadow-2xs">
                            Lihat Card &rarr;
                        </span>
                    </button>
                </div>

                {/* PANEL STATISTIK (DI ATAS PETA) */}
                <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                                Statistik Operasional & Produksi
                            </h2>
                            <span className="text-xs text-slate-500 dark:text-neutral-400 hidden sm:inline">
                                &bull; {selectedKabupaten && selectedKabupaten !== 'semua' ? selectedKabupaten : 'Seluruh Lampung'}
                            </span>
                        </div>

                        {/* Periode Switcher: Semua / Hari / Minggu / Bulan / Tahun */}
                        <div className="flex items-center rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800 border border-slate-200/50 dark:border-neutral-700/50 self-start sm:self-auto">
                            {[
                                { id: 'semua', label: 'Semua' },
                                { id: 'hari', label: 'Hari Ini' },
                                { id: 'minggu', label: 'Minggu' },
                                { id: 'bulan', label: 'Bulan' },
                                { id: 'tahun', label: 'Tahun' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handlePeriodChange(item.id)}
                                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                                        selectedPeriod === item.id
                                            ? 'bg-white text-blue-600 shadow-sm dark:bg-neutral-950 dark:text-blue-400 font-semibold'
                                            : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {/* 1. Mesin Aktif & Non-aktif */}
                        <div className="group relative overflow-hidden rounded-xl border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 dark:border-neutral-800/70 dark:bg-neutral-900/80">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                                    Mesin Pakan
                                </span>
                                <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400 flex items-center justify-center">
                                    <Cog className="h-4 w-4" />
                                </div>
                            </div>
                            <div className="mt-2.5 flex items-baseline gap-1.5">
                                <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                    {formatNumber(summary.total_mesin)}
                                </span>
                                <span className="text-xs font-medium text-slate-500 dark:text-neutral-400">Unit</span>
                            </div>
                            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
                                <span className="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-900/40 text-[11px]">
                                    <CheckCircle2 className="h-3 w-3" />
                                    {formatNumber(summary.mesin_aktif)} Aktif
                                </span>
                                <span className="inline-flex items-center gap-1 font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full border border-rose-200/60 dark:border-rose-900/40 text-[11px]">
                                    <XCircle className="h-3 w-3" />
                                    {formatNumber(summary.mesin_non_aktif)} Non-aktif
                                </span>
                            </div>
                        </div>

                        {/* 2. Kolam Aktif & Non-aktif */}
                        <div className="group relative overflow-hidden rounded-xl border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 dark:border-neutral-800/70 dark:bg-neutral-900/80">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                                    Kolam RAS
                                </span>
                                <div className="h-8 w-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400 flex items-center justify-center">
                                    <Waves className="h-4 w-4" />
                                </div>
                            </div>
                            <div className="mt-2.5 flex items-baseline gap-1.5">
                                <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                    {formatNumber(summary.total_kolam)}
                                </span>
                                <span className="text-xs font-medium text-slate-500 dark:text-neutral-400">Unit</span>
                            </div>
                            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
                                <span className="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-900/40 text-[11px]">
                                    <CheckCircle2 className="h-3 w-3" />
                                    {formatNumber(summary.kolam_aktif)} Aktif
                                </span>
                                <span className="inline-flex items-center gap-1 font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full border border-rose-200/60 dark:border-rose-900/40 text-[11px]">
                                    <XCircle className="h-3 w-3" />
                                    {formatNumber(summary.kolam_non_aktif)} Non-aktif
                                </span>
                            </div>
                        </div>

                        {/* 3. Total Produksi Pakan */}
                        <div className="group relative overflow-hidden rounded-xl border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 dark:border-neutral-800/70 dark:bg-neutral-900/80">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                                    Produksi Pakan
                                </span>
                                <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 flex items-center justify-center">
                                    <PackageCheck className="h-4 w-4" />
                                </div>
                            </div>
                            <div className="mt-2.5 flex items-baseline gap-1.5">
                                <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                    {formatNumber(summary.total_produksi_pakan)}
                                </span>
                                <span className="text-xs font-medium text-slate-500 dark:text-neutral-400">Kg</span>
                            </div>
                            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-neutral-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
                                <span>Pakan Mandiri</span>
                                <span className="font-semibold text-slate-700 dark:text-neutral-300">
                                    {summary.total_laporan_mesin} Lap. ({getPeriodLabel(selectedPeriod)})
                                </span>
                            </div>
                        </div>

                        {/* 4. Total Produksi RAS */}
                        <div className="group relative overflow-hidden rounded-xl border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 dark:border-neutral-800/70 dark:bg-neutral-900/80">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                                    Produksi RAS
                                </span>
                                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400 flex items-center justify-center">
                                    <Layers className="h-4 w-4" />
                                </div>
                            </div>
                            <div className="mt-2.5 flex items-baseline gap-1.5">
                                <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                    {formatNumber(summary.total_produksi_ras)}
                                </span>
                                <span className="text-xs font-medium text-slate-500 dark:text-neutral-400">Kg</span>
                            </div>
                            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-neutral-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
                                <span>Panen Siklus</span>
                                <span className="font-semibold text-slate-700 dark:text-neutral-300">
                                    {summary.total_laporan_ras} Siklus ({getPeriodLabel(selectedPeriod)})
                                </span>
                            </div>
                        </div>

                        {/* 5. Total Produksi Ikan */}
                        <div className="group relative overflow-hidden rounded-xl border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 dark:border-neutral-800/70 dark:bg-neutral-900/80">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                                    Produksi Ikan
                                </span>
                                <div className="h-8 w-8 rounded-lg bg-teal-500/10 text-teal-600 dark:bg-teal-400/10 dark:text-teal-400 flex items-center justify-center">
                                    <Fish className="h-4 w-4" />
                                </div>
                            </div>
                            <div className="mt-2.5 flex items-baseline gap-1.5">
                                <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                    {formatNumber(summary.total_produksi_ikan)}
                                </span>
                                <span className="text-xs font-medium text-slate-500 dark:text-neutral-400">Kg</span>
                            </div>
                            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-neutral-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
                                <span>Tebar Benih</span>
                                <span className="font-semibold text-slate-700 dark:text-neutral-300">
                                    {formatNumber(summary.total_benih_ikan)} Ekor
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* INTERACTIVE MAP / CHART SECTION (LANGSUNG DI BAWAH PANEL STATISTIK) */}
                <div className="bg-white/70 rounded-xl border border-slate-200/60 shadow-sm p-6 backdrop-blur-xl dark:bg-neutral-900/70 dark:border-neutral-800/60">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    Peta Interaktif Sebaran Daerah Bantuan
                                </h3>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                                Arahkan kursor (hover) pada penanda daerah untuk melihat total Pokdakan, Mesin Pakan, dan Kolam RAS.
                            </p>
                        </div>

                        {/* View Switcher: Peta Interaktif & Grafik Perbandingan */}
                        <div className="flex items-center rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800 border border-slate-200/50 dark:border-neutral-700/50">
                            <button
                                type="button"
                                onClick={() => setViewMode('map')}
                                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                                    viewMode === 'map'
                                        ? 'bg-white text-blue-600 shadow-sm dark:bg-neutral-950 dark:text-blue-400'
                                        : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
                                }`}
                            >
                                <MapPin className="h-3.5 w-3.5" />
                                Peta Interaktif
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode('chart')}
                                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                                    viewMode === 'chart'
                                        ? 'bg-white text-blue-600 shadow-sm dark:bg-neutral-950 dark:text-blue-400'
                                        : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
                                }`}
                            >
                                <Scale className="h-3.5 w-3.5" />
                                Grafik Perbandingan
                            </button>
                        </div>
                    </div>

                    {viewMode === 'map' ? (
                        <InteractiveMap
                            mapData={mapData || []}
                            pokdakans={pokdakans}
                            selectedKabupaten={selectedKabupaten}
                            onSelectKabupaten={handleKabupatenChange}
                            role={role}
                        />
                    ) : (
                        <div className="h-80 w-full pt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                                    <XAxis dataKey="name" tick={{ fill: '#737373' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: '#737373' }} axisLine={false} tickLine={false} />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        cursor={{ fill: 'transparent' }}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                    <Bar dataKey="Total Laporan" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                {/* TABS MENU */}
                <div className="flex space-x-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800 md:w-max">
                    <button
                        onClick={() => setActiveTab('pokdakan')}
                        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                            activeTab === 'pokdakan'
                                ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-950 dark:text-neutral-50'
                                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50'
                        }`}
                    >
                        <Building2 className="h-4 w-4" />
                        Profil Penerima Bantuan
                    </button>
                    <button
                        onClick={() => setActiveTab('mesin')}
                        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                            activeTab === 'mesin'
                                ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-950 dark:text-neutral-50'
                                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50'
                        }`}
                    >
                        <Cog className="h-4 w-4" />
                        Laporan Mesin Pakan
                    </button>
                    <button
                        onClick={() => setActiveTab('ras')}
                        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                            activeTab === 'ras'
                                ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-950 dark:text-neutral-50'
                                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50'
                        }`}
                    >
                        <Waves className="h-4 w-4" />
                        Laporan Kolam RAS
                    </button>
                </div>

                {/* CONTENT AREA */}
                <div id="section-pokdakan" className="rounded-xl border border-slate-200/60 bg-white/70 shadow-sm backdrop-blur-xl dark:bg-neutral-900/70 dark:border-neutral-800/60 overflow-hidden">
                    
                    {/* TAB: POKDAKAN */}
                    {activeTab === 'pokdakan' && (
                        <div>
                            {/* Pokdakan Header Toolbar */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-200/60 dark:border-neutral-800/60 bg-slate-50/50 dark:bg-neutral-800/30">
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                            Daftar Kelompok Pembudidaya ({pokdakans.length} Pokdakan)
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-neutral-400">
                                            {selectedKabupaten && selectedKabupaten !== 'semua'
                                                ? `Filter wilayah: ${selectedKabupaten}`
                                                : 'Menampilkan seluruh kelompok di Provinsi Lampung'}
                                        </p>
                                    </div>
                                </div>

                                {/* View Switcher: Card vs Table */}
                                <div className="flex items-center rounded-lg bg-neutral-200/60 p-1 dark:bg-neutral-800 border border-slate-200/50 dark:border-neutral-700/50 self-end sm:self-auto">
                                    <button
                                        type="button"
                                        onClick={() => setPokdakanViewMode('card')}
                                        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                                            pokdakanViewMode === 'card'
                                                ? 'bg-white text-blue-600 shadow-sm dark:bg-neutral-950 dark:text-blue-400 font-semibold'
                                                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
                                        }`}
                                    >
                                        <LayoutGrid className="h-3.5 w-3.5" />
                                        Daftar Card
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPokdakanViewMode('table')}
                                        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                                            pokdakanViewMode === 'table'
                                                ? 'bg-white text-blue-600 shadow-sm dark:bg-neutral-950 dark:text-blue-400 font-semibold'
                                                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
                                        }`}
                                    >
                                        <Table2 className="h-3.5 w-3.5" />
                                        Tabel
                                    </button>
                                </div>
                            </div>

                            {/* View 1: DAFTAR CARD */}
                            {pokdakanViewMode === 'card' ? (
                                <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {pokdakans.map((p) => (
                                        <div
                                            key={`pokdakan-card-${p.id}`}
                                            className="group relative rounded-xl border border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                                        >
                                            <div>
                                                {/* Header Card */}
                                                <div className="flex items-start justify-between gap-2 mb-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                            <Building2 className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                                {p.nama_pokdakan}
                                                            </h4>
                                                            <span className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono">
                                                                SK: {p.no_badan_hukum_sk || '-'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40 shrink-0">
                                                        TA {p.tahun_anggaran}
                                                    </span>
                                                </div>

                                                {/* Kontak & Lokasi */}
                                                <div className="space-y-1.5 text-xs text-slate-600 dark:text-neutral-300 mb-3 bg-slate-50/80 dark:bg-neutral-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-neutral-800/60">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-slate-500 dark:text-neutral-400 flex items-center gap-1">
                                                            <Users className="h-3 w-3 text-neutral-400" />
                                                            Ketua:
                                                        </span>
                                                        <span className="font-semibold text-slate-800 dark:text-neutral-200">{p.nama_ketua}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-slate-500 dark:text-neutral-400 flex items-center gap-1">
                                                            <Phone className="h-3 w-3 text-neutral-400" />
                                                            WhatsApp:
                                                        </span>
                                                        <a
                                                            href={`https://wa.me/${p.no_whatsapp?.replace(/[^0-9]/g, '')}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium inline-flex items-center gap-1"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            {p.no_whatsapp}
                                                        </a>
                                                    </div>
                                                    <div className="flex items-start justify-between gap-2 pt-1 border-t border-slate-200/60 dark:border-neutral-700/50 text-[11px]">
                                                        <span className="text-slate-500 dark:text-neutral-400 flex items-center gap-1 shrink-0">
                                                            <MapPin className="h-3 w-3 text-neutral-400" />
                                                            Lokasi:
                                                        </span>
                                                        <span className="text-right font-medium">
                                                            {p.pekon_desa}, Kec. {p.kecamatan}, <strong>{p.kabupaten_kota}</strong>
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Rincian Bantuan (Mesin & Kolam) */}
                                                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                                    <div className="bg-amber-50/80 dark:bg-amber-950/30 p-2.5 rounded-lg border border-amber-200/50 dark:border-amber-900/30">
                                                        <div className="flex items-center justify-between font-semibold text-amber-900 dark:text-amber-300 text-[11px]">
                                                            <span className="flex items-center gap-1"><Cog className="h-3.5 w-3.5 text-amber-600" /> Mesin</span>
                                                            <span className="font-bold text-amber-700 dark:text-amber-400">{p.jumlah_mesin_pakan} Unit</span>
                                                        </div>
                                                        <div className="text-[10px] text-slate-500 dark:text-neutral-400 mt-1 truncate" title={p.spesifikasi_mesin}>
                                                            {p.spesifikasi_mesin || 'Mesin Pakan Mandiri'}
                                                        </div>
                                                    </div>
                                                    <div className="bg-cyan-50/80 dark:bg-cyan-950/30 p-2.5 rounded-lg border border-cyan-200/50 dark:border-cyan-900/30">
                                                        <div className="flex items-center justify-between font-semibold text-cyan-900 dark:text-cyan-300 text-[11px]">
                                                            <span className="flex items-center gap-1"><Waves className="h-3.5 w-3.5 text-cyan-600" /> Kolam</span>
                                                            <span className="font-bold text-cyan-700 dark:text-cyan-400">{p.jumlah_kolam_ras} Unit</span>
                                                        </div>
                                                        <div className="text-[10px] text-slate-500 dark:text-neutral-400 mt-1 truncate" title={p.spesifikasi_kolam}>
                                                            {p.spesifikasi_kolam || 'Kolam Bioflok RAS'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <div className="pt-2 border-t border-slate-100 dark:border-neutral-800">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full text-xs h-8 bg-slate-50 dark:bg-neutral-800/80 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/60 dark:hover:text-blue-400 border-slate-200 dark:border-neutral-700"
                                                    onClick={() => setSelectedPokdakan(p)}
                                                >
                                                    Detail Profil Lengkap
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    {pokdakans.length === 0 && (
                                        <div className="col-span-full py-12 text-center text-slate-500">
                                            Belum ada data profil penerima bantuan yang sesuai filter.
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* View 2: TABEL */
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
                                        <thead className="bg-neutral-50 text-xs uppercase text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">Nama Pokdakan</th>
                                                <th scope="col" className="px-6 py-4">Ketua & Kontak</th>
                                                <th scope="col" className="px-6 py-4">Wilayah</th>
                                                <th scope="col" className="px-6 py-4 text-center">Bantuan Mesin</th>
                                                <th scope="col" className="px-6 py-4 text-center">Bantuan RAS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pokdakans.map((p) => (
                                                <tr 
                                                    key={p.id} 
                                                    className="border-b border-sidebar-border hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer"
                                                    onClick={() => setSelectedPokdakan(p)}
                                                >
                                                    <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">
                                                        {p.nama_pokdakan}
                                                        <div className="text-xs text-neutral-500 font-normal mt-1">SK: {p.no_badan_hukum_sk}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Users className="h-4 w-4 text-neutral-400" />
                                                            {p.nama_ketua}
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-1 text-xs">
                                                            <Phone className="h-3 w-3 text-neutral-400" />
                                                            {p.no_whatsapp}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-start gap-2">
                                                            <MapPin className="h-4 w-4 text-neutral-400 mt-0.5" />
                                                            <div>
                                                                <div>{p.pekon_desa}, {p.kecamatan}</div>
                                                                <div className="text-xs font-semibold">{p.kabupaten_kota}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center font-semibold text-orange-600">
                                                        {p.jumlah_mesin_pakan} Unit
                                                    </td>
                                                    <td className="px-6 py-4 text-center font-semibold text-cyan-600">
                                                        {p.jumlah_kolam_ras} Unit
                                                    </td>
                                                </tr>
                                            ))}
                                            {pokdakans.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">Belum ada data profil penerima bantuan.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAB: LAPORAN MESIN */}
                    {activeTab === 'mesin' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
                                <thead className="bg-neutral-50 text-xs uppercase text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Tanggal & Pokdakan</th>
                                        <th scope="col" className="px-6 py-4">Status Mesin</th>
                                        <th scope="col" className="px-6 py-4 text-right">Produksi (Kg)</th>
                                        <th scope="col" className="px-6 py-4">Bahan Baku</th>
                                        <th scope="col" className="px-6 py-4 text-right">Biaya / Kg</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {laporan_mesin.map((lm) => (
                                        <tr 
                                            key={lm.id} 
                                            className="border-b border-sidebar-border hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer"
                                            onClick={() => setSelectedLaporanMesin(lm)}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-neutral-900 dark:text-white">{lm.tanggal_input}</div>
                                                <div className="mt-1 text-xs">{lm.pokdakan?.nama_pokdakan}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    lm.status_mesin.toLowerCase().includes('baik') ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                                                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                }`}>
                                                    {lm.status_mesin}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-medium text-neutral-900 dark:text-white">
                                                {lm.produksi_pakan_kg} Kg
                                            </td>
                                            <td className="px-6 py-4 text-xs">
                                                {lm.bahan_baku_utama}
                                            </td>
                                            <td className="px-6 py-4 text-right text-xs">
                                                {formatRupiah(lm.biaya_produksi_per_kg)}
                                            </td>
                                        </tr>
                                    ))}
                                    {laporan_mesin.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">Belum ada laporan mesin pakan.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* TAB: LAPORAN RAS */}
                    {activeTab === 'ras' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
                                <thead className="bg-neutral-50 text-xs uppercase text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Siklus & Pokdakan</th>
                                        <th scope="col" className="px-6 py-4">Status & Komoditas</th>
                                        <th scope="col" className="px-6 py-4">Kondisi Air</th>
                                        <th scope="col" className="px-6 py-4 text-right">Hasil Panen</th>
                                        <th scope="col" className="px-6 py-4 text-right">Pendapatan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {laporan_ras.map((lr) => (
                                        <tr 
                                            key={lr.id} 
                                            className="border-b border-sidebar-border hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer"
                                            onClick={() => setSelectedLaporanRas(lr)}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-neutral-900 dark:text-white">Siklus Ke-{lr.siklus_ke}</div>
                                                <div className="mt-1 text-xs">{lr.pokdakan?.nama_pokdakan}</div>
                                                <div className="mt-1 text-xs text-neutral-400">Tgl: {lr.tanggal_input}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    lr.status_siklus.toLowerCase() === 'panen' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 
                                                    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                }`}>
                                                    {lr.status_siklus}
                                                </span>
                                                <div className="mt-2 text-xs font-medium">Ikan {lr.komoditas_ikan}</div>
                                                <div className="text-xs">Tebar: {lr.jumlah_benih_ekor} ekor</div>
                                            </td>
                                            <td className="px-6 py-4 text-xs">
                                                {lr.kondisi_air}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {lr.total_panen_kg ? (
                                                    <span className="font-medium text-neutral-900 dark:text-white">{lr.total_panen_kg} Kg</span>
                                                ) : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-right text-xs font-medium text-neutral-900 dark:text-white">
                                                {lr.total_pendapatan ? formatRupiah(lr.total_pendapatan) : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                    {laporan_ras.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">Belum ada laporan budidaya RAS.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* MODALS */}
            {/* Modal: Daftar Pokdakan Terdaftar (Card List View) */}
            <Dialog open={isPokdakanListModalOpen} onOpenChange={setIsPokdakanListModalOpen}>
                <DialogContent className="w-[95vw] !max-w-7xl sm:!max-w-7xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
                    <DialogHeader>
                        <div className="flex items-center justify-between pr-6">
                            <div>
                                <DialogTitle className="flex items-center gap-2 text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                                    <Users className="h-6 w-6 text-blue-600" />
                                    Daftar Pokdakan Terdaftar ({pokdakans.length} Kelompok)
                                </DialogTitle>
                                <DialogDescription className="mt-1.5 text-xs md:text-sm text-slate-500 dark:text-neutral-400">
                                    {selectedKabupaten && selectedKabupaten !== 'semua'
                                        ? `Kelompok pembudidaya ikan di wilayah ${selectedKabupaten}`
                                        : 'Seluruh kelompok pembudidaya ikan terdaftar di Provinsi Lampung'}
                                    {searchTerm ? ` • Pencarian: "${searchTerm}"` : ''}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Card Grid - Wide & Spacious */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-4">
                        {pokdakans.map((p) => (
                            <div
                                key={`modal-pokdakan-${p.id}`}
                                className="group rounded-2xl border border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 p-5 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between"
                            >
                                <div className="space-y-3.5">
                                    {/* Header Card */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs">
                                                <Building2 className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {p.nama_pokdakan}
                                                </h4>
                                                <span className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono">
                                                    SK: {p.no_badan_hukum_sk || '-'}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200/70 dark:border-blue-900/50 shrink-0">
                                            TA {p.tahun_anggaran}
                                        </span>
                                    </div>

                                    {/* Kontak & Lokasi */}
                                    <div className="space-y-2 text-xs text-slate-600 dark:text-neutral-300 bg-slate-50 dark:bg-neutral-800/60 p-3 rounded-xl border border-slate-100 dark:border-neutral-800/80">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500 dark:text-neutral-400">Ketua Kelompok:</span>
                                            <span className="font-semibold text-slate-800 dark:text-neutral-100">{p.nama_ketua}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500 dark:text-neutral-400">Kontak WhatsApp:</span>
                                            <a
                                                href={`https://wa.me/${p.no_whatsapp?.replace(/[^0-9]/g, '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-medium inline-flex items-center gap-1.5 hover:underline"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Phone className="h-3.5 w-3.5" />
                                                <span>{p.no_whatsapp}</span>
                                            </a>
                                        </div>
                                        <div className="flex items-start justify-between gap-2 pt-1.5 border-t border-slate-200/60 dark:border-neutral-700/60">
                                            <span className="text-slate-500 dark:text-neutral-400 shrink-0">Wilayah:</span>
                                            <span className="text-right text-[11px] font-medium leading-relaxed">
                                                {p.pekon_desa}, Kec. {p.kecamatan}, <strong className="text-slate-800 dark:text-neutral-100">{p.kabupaten_kota}</strong>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Rincian Aset Bantuan */}
                                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                                        <div className="bg-amber-50/90 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40 flex flex-col justify-between">
                                            <div className="flex items-center justify-between font-semibold text-amber-900 dark:text-amber-200 text-xs">
                                                <span className="flex items-center gap-1.5"><Cog className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" /> Mesin</span>
                                                <span className="font-bold text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-900/50 px-1.5 py-0.5 rounded text-[11px]">
                                                    {p.jumlah_mesin_pakan} Unit
                                                </span>
                                            </div>
                                            <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-1 truncate" title={p.spesifikasi_mesin}>
                                                {p.spesifikasi_mesin || 'Standar operasional'}
                                            </div>
                                        </div>
                                        <div className="bg-cyan-50/90 dark:bg-cyan-950/40 p-2.5 rounded-xl border border-cyan-200/60 dark:border-cyan-900/40 flex flex-col justify-between">
                                            <div className="flex items-center justify-between font-semibold text-cyan-900 dark:text-cyan-200 text-xs">
                                                <span className="flex items-center gap-1.5"><Waves className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" /> Kolam</span>
                                                <span className="font-bold text-cyan-700 dark:text-cyan-400 bg-cyan-100/80 dark:bg-cyan-900/50 px-1.5 py-0.5 rounded text-[11px]">
                                                    {p.jumlah_kolam_ras} Unit
                                                </span>
                                            </div>
                                            <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-1 truncate" title={p.spesifikasi_kolam}>
                                                {p.spesifikasi_kolam || 'Bioflok RAS'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tombol aksi */}
                                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-neutral-800">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-xs h-9 bg-slate-50 dark:bg-neutral-800/80 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/60 dark:hover:text-blue-400 border-slate-200 dark:border-neutral-700 font-medium cursor-pointer"
                                        onClick={() => {
                                            setSelectedPokdakan(p);
                                        }}
                                    >
                                        Detail Profil Lengkap
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {pokdakans.length === 0 && (
                            <div className="col-span-full py-16 text-center text-slate-500">
                                <Users className="h-10 w-10 text-slate-300 dark:text-neutral-600 mx-auto mb-2" />
                                Tidak ada pokdakan terdaftar yang sesuai filter.
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-neutral-800">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs md:text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                            onClick={() => {
                                setIsPokdakanListModalOpen(false);
                                scrollToPokdakanCards();
                            }}
                        >
                            Lihat di Tab Bawah Halaman &darr;
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="text-xs md:text-sm px-4 h-9"
                            onClick={() => setIsPokdakanListModalOpen(false)}
                        >
                            Tutup
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Pokdakan Dialog */}
            <Dialog open={!!selectedPokdakan} onOpenChange={() => setSelectedPokdakan(null)}>
                <DialogContent className="w-[90vw] !max-w-lg sm:!max-w-xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Detail Kelompok Pembudidaya (Pokdakan)</DialogTitle>
                        <DialogDescription>
                            Data profil lengkap dari penerima bantuan.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedPokdakan && (
                        <div className="grid gap-4 py-4 text-sm">
                            <div className="grid grid-cols-3 gap-2 border-b pb-2">
                                <span className="text-neutral-500">Nama Kelompok</span>
                                <span className="col-span-2 font-medium">{selectedPokdakan.nama_pokdakan}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 border-b pb-2">
                                <span className="text-neutral-500">Ketua</span>
                                <span className="col-span-2 font-medium">{selectedPokdakan.nama_ketua} ({selectedPokdakan.no_whatsapp})</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 border-b pb-2">
                                <span className="text-neutral-500">Lokasi</span>
                                <span className="col-span-2 font-medium">{selectedPokdakan.pekon_desa}, {selectedPokdakan.kecamatan}, {selectedPokdakan.kabupaten_kota}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 border-b pb-2">
                                <span className="text-neutral-500">No. SK/Hukum</span>
                                <span className="col-span-2 font-medium">{selectedPokdakan.no_badan_hukum_sk}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 border-b pb-2">
                                <span className="text-neutral-500">Bantuan Mesin</span>
                                <span className="col-span-2 font-medium text-orange-600">{selectedPokdakan.jumlah_mesin_pakan} Unit - {selectedPokdakan.spesifikasi_mesin}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 pb-2">
                                <span className="text-neutral-500">Bantuan RAS</span>
                                <span className="col-span-2 font-medium text-cyan-600">{selectedPokdakan.jumlah_kolam_ras} Unit - {selectedPokdakan.spesifikasi_kolam}</span>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Mesin Pakan Dialog */}
            <Dialog open={!!selectedLaporanMesin} onOpenChange={() => setSelectedLaporanMesin(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Detail Laporan Mesin Pakan Mandiri</DialogTitle>
                        <DialogDescription>
                            Rincian produksi pakan tanggal {selectedLaporanMesin?.tanggal_input}.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedLaporanMesin && (
                        <div className="grid gap-4 py-4 text-sm">
                            <div className="grid grid-cols-3 gap-2 border-b pb-2">
                                <span className="text-neutral-500">Pokdakan</span>
                                <span className="col-span-2 font-medium">{selectedLaporanMesin.pokdakan?.nama_pokdakan}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 border-b pb-2">
                                <span className="text-neutral-500">Status Mesin</span>
                                <span className="col-span-2 font-medium">{selectedLaporanMesin.status_mesin}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 border-b pb-2">
                                <span className="text-neutral-500">Produksi (Kg)</span>
                                <span className="col-span-2 font-medium">{selectedLaporanMesin.produksi_pakan_kg} Kg</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 border-b pb-2">
                                <span className="text-neutral-500">Bahan Baku</span>
                                <span className="col-span-2 font-medium">{selectedLaporanMesin.bahan_baku_utama}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 border-b pb-2">
                                <span className="text-neutral-500">Biaya / Kg</span>
                                <span className="col-span-2 font-medium">{formatRupiah(selectedLaporanMesin.biaya_produksi_per_kg)}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 pb-2">
                                <span className="text-neutral-500">Keterangan</span>
                                <span className="col-span-2 font-medium">{selectedLaporanMesin.keterangan_kendala || '-'}</span>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Kolam RAS Dialog */}
            <Dialog open={!!selectedLaporanRas} onOpenChange={() => setSelectedLaporanRas(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Detail Laporan Budidaya Kolam RAS</DialogTitle>
                        <DialogDescription>
                            Laporan Siklus Ke-{selectedLaporanRas?.siklus_ke} tanggal {selectedLaporanRas?.tanggal_input}.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedLaporanRas && (
                        <div className="grid gap-4 py-4 text-sm">
                            <div className="grid grid-cols-3 gap-2 border-b pb-2">
                                <span className="text-neutral-500">Pokdakan</span>
                                <span className="col-span-2 font-medium">{selectedLaporanRas.pokdakan?.nama_pokdakan}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 border-b pb-2">
                                <span className="text-neutral-500">Status Siklus</span>
                                <span className="col-span-2 font-medium">{selectedLaporanRas.status_siklus}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 border-b pb-2">
                                <span className="text-neutral-500">Komoditas & Bibit</span>
                                <span className="col-span-2 font-medium">{selectedLaporanRas.komoditas_ikan} ({selectedLaporanRas.jumlah_benih_ekor} Ekor)</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 border-b pb-2">
                                <span className="text-neutral-500">Kondisi Air</span>
                                <span className="col-span-2 font-medium">{selectedLaporanRas.kondisi_air}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 border-b pb-2">
                                <span className="text-neutral-500">Hasil Panen</span>
                                <span className="col-span-2 font-medium">{selectedLaporanRas.total_panen_kg ? `${selectedLaporanRas.total_panen_kg} Kg` : 'Belum Panen'}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 border-b pb-2">
                                <span className="text-neutral-500">Pendapatan</span>
                                <span className="col-span-2 font-medium">{selectedLaporanRas.total_pendapatan ? formatRupiah(selectedLaporanRas.total_pendapatan) : '-'}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 pb-2">
                                <span className="text-neutral-500">Keterangan</span>
                                <span className="col-span-2 font-medium">{selectedLaporanRas.keterangan_kendala || '-'}</span>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard Pemantauan',
            href: dashboard(),
        },
    ],
};
