import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
            {/* Ambient Background Glows */}
            <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-teal-400/10 dark:bg-teal-500/10 blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="w-full max-w-[420px] relative z-10 flex flex-col items-center">
                {/* Tombol Kembali ke Beranda */}
                <Link
                    href={home()}
                    className="self-start mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400 transition-colors"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Kembali ke Beranda</span>
                </Link>

                {/* Card Login Modern */}
                <div className="w-full rounded-2xl border border-slate-200/80 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 p-7 sm:p-8 transition-all">
                    {/* Header Logo & Judul */}
                    <div className="flex flex-col items-center text-center mb-6">
                        <Link href={home()} className="mb-3 hover:scale-105 transition-transform">
                            <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-neutral-800/80 border border-slate-100 dark:border-neutral-700/70 p-2.5 flex items-center justify-center shadow-xs">
                                <img src="/logo.png" alt="Saimuara Logo" className="w-full h-full object-contain" />
                            </div>
                        </Link>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {title || 'Masuk ke Akun'}
                        </h1>
                        {description && (
                            <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Konten Form */}
                    {children}
                </div>

                {/* Footer Copyright Minimalis */}
                <p className="mt-6 text-center text-[11px] text-slate-400 dark:text-neutral-500">
                    &copy; 2026 SAIMUARA &bull; DKP Provinsi Lampung
                </p>
            </div>
        </div>
    );
}
