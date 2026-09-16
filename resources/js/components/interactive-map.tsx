import { useState, useRef, useEffect, useMemo } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Tooltip, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
    MapPin, 
    Users, 
    Cog, 
    Waves, 
    Maximize2, 
    RotateCcw, 
    Layers, 
    CheckCircle2, 
    HelpCircle,
    Building2,
    Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export interface DaerahMapItem {
    nama: string;
    tipe: string; // 'Kabupaten' | 'Kota'
    lat: number;
    lng: number;
    total_pokdakan: number;
    total_mesin_pakan: number;
    total_kolam_ras: number;
}

export interface PokdakanLocation {
    id: number;
    nama_pokdakan: string;
    nama_ketua?: string;
    no_whatsapp?: string;
    pekon_desa: string;
    kecamatan: string;
    kabupaten_kota: string;
    latitude: string | number | null;
    longitude: string | number | null;
    jumlah_mesin_pakan: number;
    jumlah_kolam_ras: number;
}

interface InteractiveMapProps {
    mapData: DaerahMapItem[];
    pokdakans?: PokdakanLocation[];
    selectedKabupaten?: string;
    onSelectKabupaten?: (kabupaten: string) => void;
    role?: string;
}

// Center coordinates for Lampung Province
const LAMPUNG_CENTER: [number, number] = [-4.85, 105.15];
const DEFAULT_ZOOM = 8;

// Sub-component to manage map camera animations and safe viewport padding
function MapCameraController({ 
    target, 
    zoom,
    mapData,
}: { 
    target: [number, number] | null; 
    zoom?: number; 
    mapData: DaerahMapItem[];
}) {
    const map = useMap();

    // Pastikan seluruh penanda memiliki padding aman dari border map saat pertama dimuat
    useEffect(() => {
        if (mapData.length > 0 && !target) {
            const bounds = L.latLngBounds(mapData.map(d => [d.lat, d.lng]));
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 9 });
        }
    }, [map, mapData]);

    useEffect(() => {
        if (target) {
            map.flyTo(target, zoom ?? 10, { duration: 1.2 });
        }
    }, [target, zoom, map]);

    return null;
}

// Create custom animated SVG icons for regions
function createDaerahIcon(item: DaerahMapItem, isSelected: boolean) {
    const hasData = item.total_pokdakan > 0;
    
    // Styling states
    let bgGradient = hasData 
        ? 'linear-gradient(135deg, #2563eb, #0d9488)' 
        : 'linear-gradient(135deg, #64748b, #475569)';
    
    if (isSelected) {
        bgGradient = 'linear-gradient(135deg, #f97316, #ea580c)';
    }

    const ringColor = isSelected ? '#f97316' : (hasData ? '#0d9488' : '#94a3b8');
    const badgeHtml = hasData 
        ? `<span style="position: absolute; top: -6px; right: -6px; background-color: #f97316; color: white; border-radius: 9999px; font-size: 10px; font-weight: 700; min-width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; padding: 0 4px; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">${item.total_pokdakan}</span>` 
        : '';

    const pulseHtml = hasData 
        ? `<div style="position: absolute; inset: -4px; border-radius: 9999px; background-color: ${ringColor}; opacity: 0.35; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>` 
        : '';

    return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
            <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s;">
                ${pulseHtml}
                <div style="position: relative; width: 34px; height: 34px; border-radius: 9999px; background: ${bgGradient}; border: 2.5px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; color: white;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    ${badgeHtml}
                </div>
            </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        tooltipAnchor: [0, -32],
        popupAnchor: [0, -32],
    });
}

// Create custom icon for individual Pokdakan
function createPokdakanIcon() {
    return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
            <div style="position: relative; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                <div style="width: 26px; height: 26px; border-radius: 9999px; background: #0284c7; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
                        <path d="M9 22v-4h6v4"/>
                        <path d="M8 6h.01"/>
                        <path d="M16 6h.01"/>
                        <path d="M12 6h.01"/>
                        <path d="M12 10h.01"/>
                        <path d="M12 14h.01"/>
                        <path d="M16 10h.01"/>
                        <path d="M16 14h.01"/>
                        <path d="M8 10h.01"/>
                        <path d="M8 14h.01"/>
                    </svg>
                </div>
            </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 26],
        tooltipAnchor: [0, -26],
        popupAnchor: [0, -26],
    });
}

export default function InteractiveMap({
    mapData,
    pokdakans = [],
    selectedKabupaten,
    onSelectKabupaten,
    role
}: InteractiveMapProps) {
    const [cameraTarget, setCameraTarget] = useState<[number, number] | null>(null);
    const [cameraZoom, setCameraZoom] = useState<number>(DEFAULT_ZOOM);
    const [showPokdakanPoints, setShowPokdakanPoints] = useState<boolean>(false);

    // Calculate aggregated stats for header pills
    const totalPokdakanAll = useMemo(() => mapData.reduce((acc, curr) => acc + curr.total_pokdakan, 0), [mapData]);
    const totalMesinAll = useMemo(() => mapData.reduce((acc, curr) => acc + curr.total_mesin_pakan, 0), [mapData]);
    const totalKolamAll = useMemo(() => mapData.reduce((acc, curr) => acc + curr.total_kolam_ras, 0), [mapData]);
    const activeDaerahCount = useMemo(() => mapData.filter(d => d.total_pokdakan > 0).length, [mapData]);

    // Valid pokdakans with coordinates
    const validPokdakanPoints = useMemo(() => {
        return pokdakans.filter(p => {
            const lat = Number(p.latitude);
            const lng = Number(p.longitude);
            return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
        });
    }, [pokdakans]);

    // Handle flying to selected kabupaten when prop changes
    useEffect(() => {
        if (selectedKabupaten && selectedKabupaten !== 'semua') {
            const found = mapData.find(d => d.nama.toLowerCase() === selectedKabupaten.toLowerCase());
            if (found) {
                setCameraTarget([found.lat, found.lng]);
                setCameraZoom(10);
            }
        }
    }, [selectedKabupaten, mapData]);

    const handleResetView = () => {
        setCameraTarget(LAMPUNG_CENTER);
        setCameraZoom(DEFAULT_ZOOM);
        if (onSelectKabupaten && selectedKabupaten !== 'semua') {
            onSelectKabupaten('semua');
        }
    };

    const handleMarkerClick = (daerah: DaerahMapItem) => {
        setCameraTarget([daerah.lat, daerah.lng]);
        setCameraZoom(10);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Top Toolbar / Header Details */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-xs text-blue-700 dark:text-blue-300 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span><strong>{activeDaerahCount}</strong> / {mapData.length} Daerah Terdata</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 text-xs text-indigo-700 dark:text-indigo-300 font-medium">
                        <Users className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span><strong>{totalPokdakanAll}</strong> Pokdakan</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-900 text-xs text-teal-700 dark:text-teal-300 font-medium">
                        <Cog className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                        <span><strong>{totalMesinAll}</strong> Mesin Pakan</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-900 text-xs text-cyan-700 dark:text-cyan-300 font-medium">
                        <Waves className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span><strong>{totalKolamAll}</strong> Kolam RAS</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                    {validPokdakanPoints.length > 0 && (
                        <Button 
                            variant={showPokdakanPoints ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowPokdakanPoints(!showPokdakanPoints)}
                            className="h-8 text-xs gap-1.5"
                        >
                            <Building2 className="w-3.5 h-3.5" />
                            {showPokdakanPoints ? "Sembunyikan Titik" : "Titik Pokdakan"}
                        </Button>
                    )}

                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleResetView}
                        className="h-8 text-xs gap-1.5 bg-white dark:bg-neutral-900"
                        title="Pusatkan kembali ke seluruh Provinsi Lampung"
                    >
                        <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
                        Pusatkan Peta
                    </Button>
                </div>
            </div>

            {/* Map Container */}
            <div className="relative w-full h-[480px] rounded-xl overflow-hidden border border-slate-200/80 dark:border-neutral-800 shadow-inner z-0">
                <MapContainer
                    center={LAMPUNG_CENTER}
                    zoom={DEFAULT_ZOOM}
                    scrollWheelZoom={true}
                    className="w-full h-full"
                    style={{ background: '#f8fafc' }}
                >
                    <MapCameraController target={cameraTarget} zoom={cameraZoom} mapData={mapData} />

                    {/* OpenStreetMap Tile Layer (Gratis, Resmi & Tanpa API Key) */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maxZoom={19}
                    />

                    {/* Markers for each Daerah (Kabupaten / Kota) */}
                    {mapData.map((daerah) => {
                        const isSelected = selectedKabupaten?.toLowerCase() === daerah.nama.toLowerCase();
                        const icon = createDaerahIcon(daerah, isSelected);

                        return (
                            <Marker
                                key={`daerah-${daerah.nama}`}
                                position={[daerah.lat, daerah.lng]}
                                icon={icon}
                                eventHandlers={{
                                    click: () => handleMarkerClick(daerah),
                                }}
                            >
                                {/* HOVER TOOLTIP: Tampil di layer paling depan (z-index 9999) dan arah otomatis agar tidak terpotong border */}
                                <Tooltip 
                                    direction="auto" 
                                    offset={[0, -12]} 
                                    opacity={1}
                                    pane="tooltipPane"
                                    className="custom-map-tooltip-wrapper"
                                >
                                    <div className="min-w-[240px] rounded-xl bg-white/95 p-3.5 shadow-2xl backdrop-blur-md border border-slate-200/90 dark:bg-neutral-900/95 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 font-sans pointer-events-auto">
                                        {/* Header Tooltip */}
                                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-2 mb-2.5">
                                            <div className="flex items-center gap-2">
                                                <div className={`p-1.5 rounded-lg ${daerah.total_pokdakan > 0 ? 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400' : 'bg-slate-100 text-slate-500 dark:bg-neutral-800 dark:text-neutral-400'}`}>
                                                    <MapPin className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold leading-tight text-slate-900 dark:text-white">
                                                        {daerah.tipe} {daerah.nama}
                                                    </h4>
                                                    <span className="text-[11px] text-slate-500 dark:text-neutral-400">
                                                        Provinsi Lampung
                                                    </span>
                                                </div>
                                            </div>

                                            {daerah.total_pokdakan > 0 ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                                    Aktif
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 dark:bg-neutral-800 dark:text-neutral-400">
                                                    0 Bantuan
                                                </span>
                                            )}
                                        </div>

                                        {/* 3 Metric Rows: Total Pokdakan, Mesin Pakan, Kolam RAS */}
                                        <div className="space-y-1.5">
                                            {/* Row 1: Total Pokdakan */}
                                            <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-blue-50/80 dark:bg-blue-950/40 text-xs border border-blue-100/50 dark:border-blue-900/30">
                                                <span className="flex items-center gap-1.5 text-slate-700 dark:text-neutral-300 font-medium">
                                                    <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                                    Total Pokdakan
                                                </span>
                                                <span className="font-bold text-blue-700 dark:text-blue-300">
                                                    {daerah.total_pokdakan} <span className="font-normal text-[10px] text-slate-500 dark:text-neutral-400">Kelompok</span>
                                                </span>
                                            </div>

                                            {/* Row 2: Mesin Pakan */}
                                            <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-teal-50/80 dark:bg-teal-950/40 text-xs border border-teal-100/50 dark:border-teal-900/30">
                                                <span className="flex items-center gap-1.5 text-slate-700 dark:text-neutral-300 font-medium">
                                                    <Cog className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                                                    Mesin Pakan
                                                </span>
                                                <span className="font-bold text-teal-700 dark:text-teal-300">
                                                    {daerah.total_mesin_pakan} <span className="font-normal text-[10px] text-slate-500 dark:text-neutral-400">Unit</span>
                                                </span>
                                            </div>

                                            {/* Row 3: Kolam RAS */}
                                            <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-cyan-50/80 dark:bg-cyan-950/40 text-xs border border-cyan-100/50 dark:border-cyan-900/30">
                                                <span className="flex items-center gap-1.5 text-slate-700 dark:text-neutral-300 font-medium">
                                                    <Waves className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                                                    Kolam RAS
                                                </span>
                                                <span className="font-bold text-cyan-700 dark:text-cyan-300">
                                                    {daerah.total_kolam_ras} <span className="font-normal text-[10px] text-slate-500 dark:text-neutral-400">Unit</span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Footer tip */}
                                        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between text-[10px] text-slate-400 dark:text-neutral-500">
                                            <span>Klik untuk fokus wilayah</span>
                                            {onSelectKabupaten && role === 'admin_provinsi' && (
                                                <span className="font-semibold text-blue-600 dark:text-blue-400">
                                                    Filter tabel ↵
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Tooltip>

                                {/* POPUP on Click */}
                                <Popup>
                                    <div className="p-1 text-xs">
                                        <div className="font-bold text-sm mb-1">{daerah.tipe} {daerah.nama}</div>
                                        <p className="text-slate-600 mb-2">
                                            Memiliki <strong>{daerah.total_pokdakan}</strong> Pokdakan, <strong>{daerah.total_mesin_pakan}</strong> Unit Mesin Pakan, dan <strong>{daerah.total_kolam_ras}</strong> Unit Kolam RAS.
                                        </p>
                                        {onSelectKabupaten && role === 'admin_provinsi' && (
                                            <Button 
                                                size="sm" 
                                                className="w-full h-7 text-[11px] bg-blue-600 hover:bg-blue-700 text-white"
                                                onClick={() => onSelectKabupaten(daerah.nama)}
                                            >
                                                Filter Data ke {daerah.nama}
                                            </Button>
                                        )}
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}

                    {/* Optional markers for individual Pokdakan locations */}
                    {showPokdakanPoints && validPokdakanPoints.map((p) => {
                        const lat = Number(p.latitude);
                        const lng = Number(p.longitude);

                        return (
                            <Marker
                                key={`pokdakan-${p.id}`}
                                position={[lat, lng]}
                                icon={createPokdakanIcon()}
                            >
                                <Tooltip 
                                    direction="auto" 
                                    offset={[0, -10]} 
                                    opacity={1} 
                                    pane="tooltipPane"
                                    className="custom-map-tooltip-wrapper"
                                >
                                    <div className="min-w-[200px] rounded-lg bg-white/95 p-3 shadow-xl backdrop-blur-md border border-slate-200 dark:bg-neutral-900/95 dark:border-neutral-700 text-xs">
                                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                                            <Building2 className="w-3.5 h-3.5 text-sky-600" />
                                            {p.nama_pokdakan}
                                        </div>
                                        <div className="text-[11px] text-slate-500 dark:text-neutral-400 mb-2">
                                            {p.pekon_desa}, {p.kecamatan}, {p.kabupaten_kota}
                                        </div>
                                        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                                            <div className="bg-teal-50 dark:bg-teal-950/40 p-1 rounded text-teal-700 dark:text-teal-300 font-medium">
                                                Mesin: {p.jumlah_mesin_pakan} Unit
                                            </div>
                                            <div className="bg-cyan-50 dark:bg-cyan-950/40 p-1 rounded text-cyan-700 dark:text-cyan-300 font-medium">
                                                RAS: {p.jumlah_kolam_ras} Unit
                                            </div>
                                        </div>
                                    </div>
                                </Tooltip>
                            </Marker>
                        );
                    })}
                </MapContainer>

                {/* Map Legend Overlay (z-[400] agar tooltip z-index 9999 selalu berada paling depan) */}
                <div className="absolute bottom-3 left-3 z-[400] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-200/80 dark:border-neutral-800 shadow-md text-xs pointer-events-auto">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-1.5 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        Keterangan Penanda
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 inline-block shadow-sm"></span>
                            <span className="text-[11px] text-slate-700 dark:text-neutral-300">Daerah Penerima Bantuan</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-slate-500 inline-block shadow-sm"></span>
                            <span className="text-[11px] text-slate-700 dark:text-neutral-300">Daerah Terdaftar (Belum ada bantuan)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
