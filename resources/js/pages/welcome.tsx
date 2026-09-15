import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { Map, Activity, FileSpreadsheet, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome to Saimuara" />
            
            {/* Background Gradient & Animated Orbs */}
            <div className="relative min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans text-slate-900 dark:text-slate-100">
                
                {/* Decorative background gradients (Hidden in Dark Mode) */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 dark:opacity-0 transition-opacity duration-300">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px] mix-blend-multiply animate-pulse"></div>
                    <div className="absolute top-[20%] right-[-5%] w-[35%] h-[40%] rounded-full bg-teal-300/20 blur-[100px] mix-blend-multiply"></div>
                    <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-cyan-200/30 blur-[150px] mix-blend-multiply"></div>
                </div>

                {/* Navbar */}
                <header className="absolute top-0 w-full p-6 z-10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-md flex items-center justify-center bg-transparent">
                            <img src="/logo.png" alt="Saimuara Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-blue-950 dark:text-blue-50">Saimuara</span>
                    </div>
                    
                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={dashboard()}>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 rounded-full px-6">
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Link href={login()}>
                                <Button variant="outline" className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-full px-6 font-medium">
                                    Log In
                                </Button>
                            </Link>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="flex-1 flex flex-col items-center justify-center z-10 px-6 pt-32 pb-20 text-center">
                    <div className="inline-flex items-center rounded-full border border-teal-200 dark:border-neutral-800 bg-teal-50 dark:bg-neutral-900 px-3 py-1 text-sm text-teal-600 dark:text-neutral-300 mb-8 backdrop-blur-sm shadow-sm transition-all hover:scale-105 cursor-default">
                        <span className="flex h-2 w-2 rounded-full bg-teal-500 dark:bg-neutral-500 mr-2 animate-pulse"></span>
                        Sistem Informasi & Monitoring
                    </div>
                    
                    <h1 className="max-w-4xl text-5xl md:text-7xl font-extrabold tracking-tight text-blue-950 dark:text-white mb-6 leading-tight">
                        Mengelola Potensi <br className="hidden md:block"/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-neutral-200 dark:to-neutral-400">
                            Akuakultur & Perikanan
                        </span>
                    </h1>
                    
                    <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                        Saimuara adalah platform terintegrasi untuk pelaporan data mesin, RAS, dan kelompok pembudidaya (Pokdakan) berbasis pemetaan geografis interaktif.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        {auth.user ? (
                            <Link href={dashboard()}>
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/25 rounded-full px-8 h-14 text-base gap-2 w-full sm:w-auto">
                                    Akses Dashboard <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        ) : (
                            <Link href={login()}>
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/25 rounded-full px-8 h-14 text-base gap-2 w-full sm:w-auto">
                                    Masuk ke Sistem <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        )}
                    </div>
                </main>

                {/* Features Section */}
                <section className="w-full max-w-7xl mx-auto px-6 pb-24 z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Feature 1 */}
                    <div className="group relative overflow-hidden rounded-2xl bg-white/60 dark:bg-neutral-900 p-8 border border-white/40 dark:border-neutral-800 backdrop-blur-xl shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-teal-500/10 dark:bg-neutral-800/50 rounded-full blur-2xl group-hover:bg-teal-500/20 dark:group-hover:bg-neutral-800 transition-all"></div>
                        <div className="h-12 w-12 rounded-xl bg-teal-100 dark:bg-neutral-800 flex items-center justify-center text-teal-600 dark:text-neutral-300 mb-6 border border-teal-200/50 dark:border-neutral-700 shadow-inner">
                            <Map className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-950 dark:text-neutral-100 mb-3">Pemetaan Geografis</h3>
                        <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed">
                            Lacak titik koordinat lokasi input laporan dari berbagai daerah dengan peta interaktif yang akurat dan mudah diakses.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="group relative overflow-hidden rounded-2xl bg-white/60 dark:bg-neutral-900 p-8 border border-white/40 dark:border-neutral-800 backdrop-blur-xl shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 dark:bg-neutral-800/50 rounded-full blur-2xl group-hover:bg-blue-500/20 dark:group-hover:bg-neutral-800 transition-all"></div>
                        <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-neutral-800 flex items-center justify-center text-blue-600 dark:text-neutral-300 mb-6 border border-blue-200/50 dark:border-neutral-700 shadow-inner">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-950 dark:text-neutral-100 mb-3">Monitoring Terpusat</h3>
                        <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed">
                            Dashboard admin analitik untuk memantau aktivitas pelaporan dari seluruh kabupaten, dilengkapi grafik yang responsif.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="group relative overflow-hidden rounded-2xl bg-white/60 dark:bg-neutral-900 p-8 border border-white/40 dark:border-neutral-800 backdrop-blur-xl shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 dark:bg-neutral-800/50 rounded-full blur-2xl group-hover:bg-cyan-500/20 dark:group-hover:bg-neutral-800 transition-all"></div>
                        <div className="h-12 w-12 rounded-xl bg-cyan-100 dark:bg-neutral-800 flex items-center justify-center text-cyan-600 dark:text-neutral-300 mb-6 border border-cyan-200/50 dark:border-neutral-700 shadow-inner">
                            <FileSpreadsheet className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-950 dark:text-neutral-100 mb-3">Input Data Terstruktur</h3>
                        <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed">
                            Pencatatan data mesin, pakan, dan RAS secara mudah dan terstruktur per kelompok pembudidaya.
                        </p>
                    </div>
                </section>
                
                {/* Footer */}
                <footer className="w-full text-center py-6 text-sm text-slate-500 dark:text-slate-500 z-10 border-t border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md">
                    &copy; {new Date().getFullYear()} Saimuara. Dinas Kelautan dan Perikanan.
                </footer>
            </div>
        </>
    );
}
