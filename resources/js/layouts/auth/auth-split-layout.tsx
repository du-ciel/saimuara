import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, MapPin, Activity, ShieldCheck, Waves } from 'lucide-react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-12 bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
            
            {/* PANEL KIRI: VISUAL & BRANDING SAIMUARA (Tampil di Desktop/Layar Lebar) */}
            <div className="hidden lg:flex lg:col-span-7 xl:col-span-7 relative flex-col justify-between p-10 xl:p-14 overflow-hidden bg-slate-950 text-white border-r border-slate-800/80">
                {/* Background Gradient & Animated Orbs */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#071936] to-[#04282c] -z-20" />
                
                {/* Ambient glowing orbs */}
                <div className="absolute -top-28 -left-28 w-96 h-96 rounded-full bg-blue-600/20 blur-[130px] pointer-events-none -z-10" />
                <div className="absolute top-1/2 -right-28 w-96 h-96 rounded-full bg-teal-400/15 blur-[140px] pointer-events-none -z-10" />
                <div className="absolute -bottom-28 left-1/3 w-80 h-80 rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none -z-10" />

                {/* Geometric Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none -z-10" />

                {/* Header Kiri: Brand & Logo */}
                <div className="relative z-10 flex items-center justify-between">
                    <Link
                        href={home()}
                        className="group flex items-center gap-3.5 transition-all"
                    >
                        <div className="h-12 w-12 rounded-xl bg-white/10 p-2 border border-white/20 backdrop-blur-md shadow-lg shadow-blue-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <img src="/logo.png" alt="Saimuara Logo" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <div className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                                <span>SAIMUARA</span>
                                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">v2.0</span>
                            </div>
                            <p className="text-xs text-slate-400 font-medium">Dinas Kelautan dan Perikanan Prov. Lampung</p>
                        </div>
                    </Link>

                    <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-950/40 px-3.5 py-1 text-xs text-teal-300 backdrop-blur-md shadow-xs">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-medium">Portal Resmi Terintegrasi</span>
                    </div>
                </div>

                {/* Center Content: Headline & 3 Highlight Cards */}
                <div className="relative z-10 my-auto py-10 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold mb-5">
                        <Waves className="h-3.5 w-3.5" />
                        Akuntabilitas & Modernisasi Akuakultur
                    </div>

                    <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight text-white mb-4">
                        Pemantauan Cerdas Distribusi & Produksi{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-cyan-200">
                            Akuakultur Lampung
                        </span>
                    </h1>

                    <p className="text-sm xl:text-base text-slate-300/90 leading-relaxed mb-8">
                        Sistem Informasi Akuntabilitas & Integrasi Mesin Pakan Mandiri dan Kolam RAS untuk mengoptimalkan potensi perikanan budidaya dan kemandirian Pokdakan se-Provinsi Lampung.
                    </p>

                    {/* 3 Modern Feature Cards */}
                    <div className="space-y-3.5">
                        <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.07] transition-all">
                            <div className="h-9 w-9 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                <MapPin className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="text-xs font-bold text-slate-100">Pemetaan Geografis Spasial</h2>
                                <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                                    Lacak sebaran kelompok pembudidaya (Pokdakan) dan aset bantuan di 15 Kabupaten/Kota secara interaktif dan akurat.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.07] transition-all">
                            <div className="h-9 w-9 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                <Activity className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="text-xs font-bold text-slate-100">Monitoring Mesin & Kolam RAS</h2>
                                <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                                    Pelaporan berkala operasional mesin pakan mandiri, tebar benih, kondisi air, hingga rekapitulasi hasil panen.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.07] transition-all">
                            <div className="h-9 w-9 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                <ShieldCheck className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="text-xs font-bold text-slate-100">Statistik Berkala Terintegrasi</h2>
                                <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                                    Rekapitulasi total produksi pakan dan RAS yang dapat disaring per hari, minggu, bulan, dan tahun.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Kiri: Security Assurance */}
                <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10 text-xs text-slate-400">
                    <span className="font-medium text-slate-300">Pemerintah Provinsi Lampung</span>
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <span>🔒 Akses Terenkripsi & Terverifikasi</span>
                    </span>
                </div>
            </div>

            {/* PANEL KANAN: FORM LOGIN / AUTH */}
            <div className="col-span-12 lg:col-span-5 xl:col-span-5 flex flex-col justify-between p-6 sm:p-10 lg:p-12 relative min-h-screen overflow-y-auto">
                {/* Background ambient lighting for form side */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/5 dark:bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

                {/* Top Nav: Kembali ke Beranda */}
                <div className="flex items-center justify-between mb-4">
                    <Link
                        href={home()}
                        className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm shadow-2xs hover:shadow-xs transition-all"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>Kembali ke Beranda</span>
                    </Link>

                    <span className="text-[11px] text-slate-400 dark:text-neutral-500 font-mono">SAIMUARA AUTH</span>
                </div>

                {/* Form Container */}
                <div className="mx-auto w-full max-w-sm sm:max-w-md py-6 sm:py-8 flex flex-col justify-center flex-1">
                    {/* Header Khusus Mobile (Muncul hanya di layar kecil) */}
                    <div className="lg:hidden flex items-center gap-3.5 mb-8 pb-6 border-b border-slate-200/80 dark:border-neutral-800">
                        <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 p-2 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-center shrink-0">
                            <img src="/logo.png" alt="Saimuara Logo" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <div className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">SAIMUARA</div>
                            <p className="text-xs text-slate-500 dark:text-neutral-400">Dinas Kelautan dan Perikanan Prov. Lampung</p>
                        </div>
                    </div>

                    {/* Judul & Deskripsi Halaman */}
                    <div className="space-y-1.5 mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {title || 'Masuk ke Akun Anda'}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                            {description || 'Silakan masukkan email dan kata sandi untuk mengakses dashboard SAIMUARA.'}
                        </p>
                    </div>

                    {/* Konten Form */}
                    <div className="w-full">
                        {children}
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="text-center text-[11px] text-slate-400 dark:text-neutral-500 pt-6 border-t border-slate-200/60 dark:border-neutral-800/60">
                    &copy; 2026 SAIMUARA &bull; Dinas Kelautan dan Perikanan Provinsi Lampung.
                </div>
            </div>

        </div>
    );
}
