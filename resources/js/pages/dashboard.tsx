import { Head, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { useState } from 'react';
import { 
    Users, Settings, ArrowRight, Waves, FileText, FileSearch, Scale, Search, Filter, Cog, MapPin, Phone, Building2
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

interface Pokdakan {
    id: number;
    nama_pokdakan: string;
    nama_ketua: string;
    no_whatsapp: string;
    pekon_desa: string;
    kecamatan: string;
    kabupaten_kota: string;
    no_badan_hukum_sk: string;
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
        total_kolam: number;
        total_laporan_mesin: number;
        total_laporan_ras: number;
        total_produksi_pakan: number;
        total_panen_ras: number;
    };
    pokdakans: Pokdakan[];
    laporan_mesin: LaporanMesin[];
    laporan_ras: LaporanRas[];
    chartData: any[];
    role: string;
    user_kabupaten: string | null;
    filters: { search: string | null; kabupaten: string | null };
    list_kabupaten: string[];
}

export default function Dashboard({ summary, pokdakans, laporan_mesin, laporan_ras, chartData, role, user_kabupaten, filters, list_kabupaten }: Props) {
    const [activeTab, setActiveTab] = useState<'pokdakan' | 'mesin' | 'ras'>('pokdakan');
    
    // Filter States
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedKabupaten, setSelectedKabupaten] = useState(filters.kabupaten || 'semua');

    // Dialog States
    const [selectedPokdakan, setSelectedPokdakan] = useState<Pokdakan | null>(null);
    const [selectedLaporanMesin, setSelectedLaporanMesin] = useState<LaporanMesin | null>(null);
    const [selectedLaporanRas, setSelectedLaporanRas] = useState<LaporanRas | null>(null);

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    };

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            applyFilters(searchTerm, selectedKabupaten);
        }
    };

    const handleKabupatenChange = (val: string) => {
        setSelectedKabupaten(val);
        applyFilters(searchTerm, val);
    };

    const applyFilters = (search: string, kab: string) => {
        router.get('/dashboard', {
            search: search || undefined,
            kabupaten: kab !== 'semua' ? kab : undefined
        }, { preserveState: true, replace: true });
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
                                ? 'Memantau data dari seluruh Kabupaten di Provinsi Lampung.' 
                                : `Memantau data khusus untuk Kabupaten ${user_kabupaten}.`}
                        </p>
                    </div>
                </div>

                {/* GRAPH/CHART SECTION */}
                <div className="bg-white/70 rounded-xl border border-slate-200/60 shadow-sm p-6 backdrop-blur-xl dark:bg-neutral-900/70 dark:border-neutral-800/60">
                    <h3 className="text-lg font-semibold mb-6">
                        {role === 'admin_provinsi' ? 'Grafik Perbandingan per Kabupaten' : 'Grafik Perbandingan per Pokdakan'}
                    </h3>
                    <div className="h-80 w-full">
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
                </div>

                {/* FILTERS */}
                <div className="flex flex-col sm:flex-row gap-4 items-center bg-white/70 p-4 rounded-xl border border-slate-200/60 shadow-sm backdrop-blur-xl dark:bg-neutral-900/70 dark:border-neutral-800/60">
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
                    {role === 'admin_provinsi' && (
                        <div className="w-full sm:max-w-xs flex items-center gap-2">
                            <Filter className="h-4 w-4 text-neutral-500" />
                            <Select value={selectedKabupaten} onValueChange={handleKabupatenChange}>
                                <SelectTrigger className="w-full bg-neutral-50 dark:bg-neutral-950">
                                    <SelectValue placeholder="Pilih Kabupaten" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="semua">Semua Kabupaten</SelectItem>
                                    {list_kabupaten.map(kab => (
                                        <SelectItem key={kab} value={kab}>{kab}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>

                {/* SUMMARY CARDS */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="group rounded-xl border border-slate-200/60 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all hover:shadow-md hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900/70">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-slate-500 dark:text-neutral-400">Total Pokdakan</h3>
                            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-neutral-800 flex items-center justify-center text-blue-600 dark:text-neutral-300 group-hover:bg-blue-600 dark:group-hover:bg-neutral-700 group-hover:text-white transition-colors">
                                <Users className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-4 text-3xl font-bold text-blue-950 dark:text-neutral-100">{summary.total_pokdakan}</div>
                        <p className="mt-1 text-xs text-slate-500 dark:text-neutral-500">Penerima Terdaftar</p>
                    </div>
                    <div className="group rounded-xl border border-slate-200/60 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all hover:shadow-md hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900/70">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-slate-500 dark:text-neutral-400">Mesin Pakan</h3>
                            <div className="h-10 w-10 rounded-lg bg-teal-100 dark:bg-neutral-800 flex items-center justify-center text-teal-600 dark:text-neutral-300 group-hover:bg-teal-600 dark:group-hover:bg-neutral-700 group-hover:text-white transition-colors">
                                <Cog className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-blue-950 dark:text-neutral-100">{summary.total_mesin}</span>
                            <span className="text-sm text-slate-500 dark:text-neutral-500">Unit</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 dark:text-neutral-500">{summary.total_produksi_pakan} Kg Pakan Diproduksi</p>
                    </div>
                    <div className="group rounded-xl border border-slate-200/60 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all hover:shadow-md hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900/70">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-slate-500 dark:text-neutral-400">Kolam RAS</h3>
                            <div className="h-10 w-10 rounded-lg bg-cyan-100 dark:bg-neutral-800 flex items-center justify-center text-cyan-600 dark:text-neutral-300 group-hover:bg-cyan-600 dark:group-hover:bg-neutral-700 group-hover:text-white transition-colors">
                                <Waves className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-blue-950 dark:text-neutral-100">{summary.total_kolam}</span>
                            <span className="text-sm text-slate-500 dark:text-neutral-500">Unit</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 dark:text-neutral-500">{summary.total_panen_ras} Kg Total Panen</p>
                    </div>
                    <div className="group rounded-xl border border-slate-200/60 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all hover:shadow-md hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900/70">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-slate-500 dark:text-neutral-400">Laporan Masuk</h3>
                            <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-neutral-800 flex items-center justify-center text-indigo-600 dark:text-neutral-300 group-hover:bg-indigo-600 dark:group-hover:bg-neutral-700 group-hover:text-white transition-colors">
                                <Building2 className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-blue-950 dark:text-neutral-100">
                                {summary.total_laporan_mesin + summary.total_laporan_ras}
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 dark:text-neutral-500">Total Dokumen Pemantauan</p>
                    </div>
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
                <div className="rounded-xl border border-slate-200/60 bg-white/70 shadow-sm backdrop-blur-xl dark:bg-neutral-900/70 dark:border-neutral-800/60 overflow-hidden">
                    
                    {/* TAB: POKDAKAN */}
                    {activeTab === 'pokdakan' && (
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
            {/* Pokdakan Dialog */}
            <Dialog open={!!selectedPokdakan} onOpenChange={() => setSelectedPokdakan(null)}>
                <DialogContent className="max-w-md">
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
