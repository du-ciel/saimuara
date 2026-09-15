import { Head, useForm } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { useState, useRef, useEffect } from 'react';
import { Building2, Cog, Waves, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Leaflet
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Pokdakan {
    id: number;
    nama_pokdakan: string;
}

interface Props {
    pokdakans: Pokdakan[];
    role: string;
    kabupaten: string | null;
}

function LocationMarker({ position, setPosition }: { position: L.LatLng | null, setPosition: (pos: L.LatLng) => void }) {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
}

export default function InputData({ pokdakans, role, kabupaten }: Props) {
    const [activeTab, setActiveTab] = useState<'pokdakan' | 'mesin' | 'ras'>('pokdakan');
    
    // Map State
    const [position, setPosition] = useState<L.LatLng | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    
    // Map Ref to programmatically fly to location
    const mapRef = useRef<L.Map>(null);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
            const data = await res.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const newPos = new L.LatLng(parseFloat(lat), parseFloat(lon));
                setPosition(newPos);
                if (mapRef.current) {
                    mapRef.current.flyTo(newPos, 14);
                }
            } else {
                toast.error('Lokasi tidak ditemukan');
            }
        } catch (error) {
            toast.error('Terjadi kesalahan saat mencari lokasi');
        }
        setIsSearching(false);
    };

    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            toast.error('Browser Anda tidak mendukung fitur Geolocation');
            return;
        }

        toast.loading('Mencari lokasi Anda...', { id: 'geo' });
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const newPos = new L.LatLng(pos.coords.latitude, pos.coords.longitude);
                setPosition(newPos);
                if (mapRef.current) {
                    mapRef.current.flyTo(newPos, 15);
                }
                toast.success('Lokasi berhasil didapatkan', { id: 'geo' });
            },
            (err) => {
                toast.error('Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan.', { id: 'geo' });
            },
            { enableHighAccuracy: true }
        );
    };

    // Form Pokdakan
    const formPokdakan = useForm({
        nama_pokdakan: '',
        nama_ketua: '',
        no_whatsapp: '',
        pekon_desa: '',
        kecamatan: '',
        no_badan_hukum_sk: '',
        latitude: '',
        longitude: '',
        tahun_anggaran: new Date().getFullYear(),
        jumlah_mesin_pakan: 0,
        spesifikasi_mesin: '',
        jumlah_kolam_ras: 0,
        spesifikasi_kolam: '',
    });

    // Form Mesin
    const formMesin = useForm({
        pokdakan_id: '',
        tanggal_input: new Date().toISOString().split('T')[0],
        status_mesin: 'Baik',
        produksi_pakan_kg: '',
        bahan_baku_utama: '',
        biaya_produksi_per_kg: '',
        keterangan_kendala: '',
    });

    // Form RAS
    const formRas = useForm({
        pokdakan_id: '',
        tanggal_input: new Date().toISOString().split('T')[0],
        siklus_ke: 1,
        status_siklus: 'Berjalan',
        tanggal_tebar: new Date().toISOString().split('T')[0],
        komoditas_ikan: '',
        jumlah_benih_ekor: '',
        ukuran_benih_cm: '',
        kondisi_air: '',
        kendala_penyakit: '',
        tanggal_panen: '',
        total_panen_kg: '',
        harga_jual_per_kg: '',
        total_pendapatan: '',
    });

    // Sync Map Position to Form
    useEffect(() => {
        if (position) {
            formPokdakan.setData('latitude', position.lat.toString());
            formPokdakan.setData('longitude', position.lng.toString());
        }
    }, [position]);

    const submitPokdakan = (e: React.FormEvent) => {
        e.preventDefault();
        formPokdakan.post('/input/pokdakan', {
            onSuccess: () => {
                toast.success('Data Pokdakan berhasil ditambahkan');
                formPokdakan.reset();
                setPosition(null);
            },
        });
    };

    const submitMesin = (e: React.FormEvent) => {
        e.preventDefault();
        formMesin.post('/input/mesin', {
            onSuccess: () => {
                toast.success('Laporan Mesin berhasil ditambahkan');
                formMesin.reset('produksi_pakan_kg', 'bahan_baku_utama', 'biaya_produksi_per_kg', 'keterangan_kendala');
            },
        });
    };

    const submitRas = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Auto calculate pendapatan if both exist
        const total = parseFloat(formRas.data.total_panen_kg) * parseFloat(formRas.data.harga_jual_per_kg);
        if (!isNaN(total)) {
            formRas.setData('total_pendapatan', total.toString());
        }

        formRas.post('/input/ras', {
            onSuccess: () => {
                toast.success('Laporan Kolam RAS berhasil ditambahkan');
                formRas.reset();
            },
        });
    };

    return (
        <>
            <Head title="Input Laporan" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-y-auto rounded-xl p-4 md:p-8">
                
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                            Entry Data & Pelaporan
                        </h1>
                        <p className="text-neutral-500 dark:text-neutral-400 mt-1">
                            {role === 'admin_provinsi' 
                                ? 'Halaman ini dikhususkan untuk Admin Kabupaten. Anda memiliki akses hanya-lihat.' 
                                : `Kirim laporan dan data Pokdakan untuk wilayah ${kabupaten}.`}
                        </p>
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
                        Tambah Pokdakan
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
                        Input Laporan Mesin
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
                        Input Laporan RAS
                    </button>
                </div>

                {/* FORMS */}
                <div className="bg-white p-6 rounded-xl border border-sidebar-border shadow-sm dark:bg-neutral-900">
                    
                    {/* FORM POKDAKAN */}
                    {activeTab === 'pokdakan' && (
                        <form onSubmit={submitPokdakan} className="space-y-6 max-w-4xl">
                            <div>
                                <h3 className="text-lg font-medium">Data Penerima Bantuan (Diinput Sekali)</h3>
                                <p className="text-sm text-neutral-500">Daftarkan Kelompok Pembudidaya Ikan baru ke dalam sistem.</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nama Pokdakan *</label>
                                    <Input required value={formPokdakan.data.nama_pokdakan} onChange={e => formPokdakan.setData('nama_pokdakan', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">No. Badan Hukum / SK</label>
                                    <Input value={formPokdakan.data.no_badan_hukum_sk} onChange={e => formPokdakan.setData('no_badan_hukum_sk', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nama Ketua *</label>
                                    <Input required value={formPokdakan.data.nama_ketua} onChange={e => formPokdakan.setData('nama_ketua', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">No. WhatsApp Aktif *</label>
                                    <Input required type="tel" value={formPokdakan.data.no_whatsapp} onChange={e => formPokdakan.setData('no_whatsapp', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Desa / Pekon *</label>
                                    <Input required value={formPokdakan.data.pekon_desa} onChange={e => formPokdakan.setData('pekon_desa', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Kecamatan *</label>
                                    <Input required value={formPokdakan.data.kecamatan} onChange={e => formPokdakan.setData('kecamatan', e.target.value)} />
                                </div>
                            </div>

                            <hr />

                            <div>
                                <h4 className="font-medium mb-2">Titik Koordinat Lokasi</h4>
                                <p className="text-sm text-neutral-500 mb-4">Geser peta dan klik pada lokasi kolam budidaya untuk mendapatkan koordinat secara otomatis.</p>
                                
                                <div className="flex gap-2 mb-3">
                                    <Input 
                                        placeholder="Cari desa/lokasi..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSearch())}
                                    />
                                    <Button type="button" variant="secondary" onClick={handleSearch} disabled={isSearching}>
                                        Cari
                                    </Button>
                                    <Button type="button" variant="outline" onClick={handleUseMyLocation} title="Gunakan Lokasi Saya Saat Ini">
                                        <MapPin className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="h-64 bg-neutral-100 rounded-lg overflow-hidden border">
                                    {/* Default coordinate: Lampung Area */}
                                    <MapContainer ref={mapRef} center={[-5.0, 105.0]} zoom={8} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                        <LocationMarker position={position} setPosition={setPosition} />
                                    </MapContainer>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div>
                                        <label className="block text-xs text-neutral-500 mb-1">Latitude</label>
                                        <Input readOnly value={formPokdakan.data.latitude} placeholder="-5.xxx" className="bg-neutral-50 dark:bg-neutral-900/50" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-neutral-500 mb-1">Longitude</label>
                                        <Input readOnly value={formPokdakan.data.longitude} placeholder="105.xxx" className="bg-neutral-50 dark:bg-neutral-900/50" />
                                    </div>
                                </div>
                            </div>

                            <hr />

                            <div>
                                <h4 className="font-medium mb-4">Detail Bantuan yang Diterima</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Tahun Anggaran *</label>
                                        <Input type="number" required value={formPokdakan.data.tahun_anggaran} onChange={e => formPokdakan.setData('tahun_anggaran', parseInt(e.target.value))} />
                                    </div>
                                    <div className="hidden md:block"></div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Jumlah Mesin Pakan (Unit) *</label>
                                        <Input type="number" min="0" required value={formPokdakan.data.jumlah_mesin_pakan} onChange={e => formPokdakan.setData('jumlah_mesin_pakan', parseInt(e.target.value))} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Spesifikasi Mesin</label>
                                        <Input value={formPokdakan.data.spesifikasi_mesin} onChange={e => formPokdakan.setData('spesifikasi_mesin', e.target.value)} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Jumlah Kolam RAS (Unit) *</label>
                                        <Input type="number" min="0" required value={formPokdakan.data.jumlah_kolam_ras} onChange={e => formPokdakan.setData('jumlah_kolam_ras', parseInt(e.target.value))} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Spesifikasi Kolam RAS</label>
                                        <Input value={formPokdakan.data.spesifikasi_kolam} onChange={e => formPokdakan.setData('spesifikasi_kolam', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" disabled={formPokdakan.processing}>
                                {formPokdakan.processing ? 'Menyimpan...' : 'Simpan Pokdakan Baru'}
                            </Button>
                        </form>
                    )}

                    {/* FORM LAPORAN MESIN */}
                    {activeTab === 'mesin' && (
                        <form onSubmit={submitMesin} className="space-y-6 max-w-4xl">
                            <div>
                                <h3 className="text-lg font-medium">Input Laporan Mesin Pakan Mandiri</h3>
                                <p className="text-sm text-neutral-500">Isi laporan rutin untuk operasional mesin pakan.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Pilih Pokdakan *</label>
                                    <Select value={formMesin.data.pokdakan_id} onValueChange={val => formMesin.setData('pokdakan_id', val)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="-- Pilih Kelompok --" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {pokdakans.map(p => (
                                                <SelectItem key={p.id} value={p.id.toString()}>{p.nama_pokdakan}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tanggal Laporan *</label>
                                    <Input type="date" required value={formMesin.data.tanggal_input} onChange={e => formMesin.setData('tanggal_input', e.target.value)} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Status Mesin *</label>
                                    <Select value={formMesin.data.status_mesin} onValueChange={val => formMesin.setData('status_mesin', val)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Baik">Baik / Beroperasi</SelectItem>
                                            <SelectItem value="Rusak Ringan">Rusak Ringan</SelectItem>
                                            <SelectItem value="Rusak Berat">Rusak Berat</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Bahan Baku Utama *</label>
                                    <Input required placeholder="Misal: Tepung Ikan, Dedak" value={formMesin.data.bahan_baku_utama} onChange={e => formMesin.setData('bahan_baku_utama', e.target.value)} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Total Produksi (Kg) *</label>
                                    <Input type="number" step="0.01" min="0" required value={formMesin.data.produksi_pakan_kg} onChange={e => formMesin.setData('produksi_pakan_kg', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Biaya Produksi / Kg (Rp) *</label>
                                    <Input type="number" step="100" min="0" required value={formMesin.data.biaya_produksi_per_kg} onChange={e => formMesin.setData('biaya_produksi_per_kg', e.target.value)} />
                                </div>
                                
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Keterangan / Kendala (Opsional)</label>
                                    <Input value={formMesin.data.keterangan_kendala} onChange={e => formMesin.setData('keterangan_kendala', e.target.value)} />
                                </div>
                            </div>

                            <Button type="submit" disabled={formMesin.processing}>
                                {formMesin.processing ? 'Menyimpan...' : 'Kirim Laporan Mesin'}
                            </Button>
                        </form>
                    )}

                    {/* FORM LAPORAN RAS */}
                    {activeTab === 'ras' && (
                        <form onSubmit={submitRas} className="space-y-6 max-w-4xl">
                            <div>
                                <h3 className="text-lg font-medium">Input Laporan Budidaya Kolam Mini RAS</h3>
                                <p className="text-sm text-neutral-500">Laporkan siklus budidaya mulai dari tebar benih hingga panen.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Pilih Pokdakan *</label>
                                    <Select value={formRas.data.pokdakan_id} onValueChange={val => formRas.setData('pokdakan_id', val)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="-- Pilih Kelompok --" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {pokdakans.map(p => (
                                                <SelectItem key={p.id} value={p.id.toString()}>{p.nama_pokdakan}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tanggal Laporan *</label>
                                    <Input type="date" required value={formRas.data.tanggal_input} onChange={e => formRas.setData('tanggal_input', e.target.value)} />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-1">Siklus Ke- *</label>
                                    <Input type="number" min="1" required value={formRas.data.siklus_ke} onChange={e => formRas.setData('siklus_ke', parseInt(e.target.value))} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Status Siklus *</label>
                                    <Select value={formRas.data.status_siklus} onValueChange={val => formRas.setData('status_siklus', val)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Berjalan">Berjalan (Proses Budidaya)</SelectItem>
                                            <SelectItem value="Panen">Panen Selesai</SelectItem>
                                            <SelectItem value="Gagal">Gagal Panen</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="md:col-span-2 pt-4 border-t">
                                    <h4 className="font-medium text-sm mb-4">Informasi Tebar</h4>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Komoditas Ikan *</label>
                                    <Input required placeholder="Misal: Nila, Lele" value={formRas.data.komoditas_ikan} onChange={e => formRas.setData('komoditas_ikan', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tanggal Tebar *</label>
                                    <Input type="date" required value={formRas.data.tanggal_tebar} onChange={e => formRas.setData('tanggal_tebar', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Jumlah Benih (Ekor) *</label>
                                    <Input type="number" min="1" required value={formRas.data.jumlah_benih_ekor} onChange={e => formRas.setData('jumlah_benih_ekor', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Ukuran Benih (cm) *</label>
                                    <Input required placeholder="Misal: 3-5 cm" value={formRas.data.ukuran_benih_cm} onChange={e => formRas.setData('ukuran_benih_cm', e.target.value)} />
                                </div>
                                
                                <div className="md:col-span-2 pt-4 border-t">
                                    <h4 className="font-medium text-sm mb-4">Data Opsional (Diisi Saat Panen / Pengecekan)</h4>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Kondisi Air</label>
                                    <Input placeholder="Suhu, DO, pH, dll" value={formRas.data.kondisi_air} onChange={e => formRas.setData('kondisi_air', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Kendala / Penyakit</label>
                                    <Input value={formRas.data.kendala_penyakit} onChange={e => formRas.setData('kendala_penyakit', e.target.value)} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Tanggal Panen</label>
                                    <Input type="date" value={formRas.data.tanggal_panen} onChange={e => formRas.setData('tanggal_panen', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Total Panen (Kg)</label>
                                    <Input type="number" step="0.01" min="0" value={formRas.data.total_panen_kg} onChange={e => formRas.setData('total_panen_kg', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Harga Jual / Kg (Rp)</label>
                                    <Input type="number" step="100" min="0" value={formRas.data.harga_jual_per_kg} onChange={e => formRas.setData('harga_jual_per_kg', e.target.value)} />
                                </div>
                            </div>

                            <Button type="submit" disabled={formRas.processing}>
                                {formRas.processing ? 'Menyimpan...' : 'Kirim Laporan RAS'}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}

InputData.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard Pemantauan',
            href: dashboard(),
        },
        {
            title: 'Input Data Laporan',
            href: '/input',
        },
    ],
};
