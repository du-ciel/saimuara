import { useState, useMemo } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Edit2,
    KeyRound,
    UserPlus,
    Trash2,
    ShieldCheck,
    AlertTriangle,
    Search,
    MapPin,
    Mail,
    Users,
    CheckCircle2,
    RotateCcw,
    Building2,
    ShieldAlert,
} from 'lucide-react';
import type { BreadcrumbItem } from '@/types';
import { toast } from 'sonner';

interface User {
    id: number;
    name: string;
    email: string;
    kabupaten: string;
    role: string;
}

interface PageProps {
    adminUsers: User[];
    listKabupaten?: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Admin Kabupaten',
        href: '/admin/users',
    },
];

const DEFAULT_KABUPATEN = [
    'Lampung Barat', 'Tanggamus', 'Lampung Selatan', 'Lampung Timur', 
    'Lampung Tengah', 'Lampung Utara', 'Way Kanan', 'Tulang Bawang', 
    'Pesawaran', 'Pringsewu', 'Mesuji', 'Tulang Bawang Barat', 
    'Pesisir Barat', 'Bandar Lampung', 'Metro'
];

export default function AdminUsersIndex({ adminUsers, listKabupaten = DEFAULT_KABUPATEN }: PageProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [passwordUser, setPasswordUser] = useState<User | null>(null);
    const [deleteUser, setDeleteUser] = useState<User | null>(null);

    // Search and filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedKabupatenFilter, setSelectedKabupatenFilter] = useState('semua');

    const createForm = useForm({
        name: '',
        email: '',
        kabupaten: '',
        password: '',
        password_confirmation: '',
    });

    const editForm = useForm({
        email: '',
        kabupaten: '',
    });

    const passwordForm = useForm({
        password: '',
        password_confirmation: '',
    });

    // Filtered users calculation
    const filteredUsers = useMemo(() => {
        return adminUsers.filter((user) => {
            const query = searchQuery.toLowerCase().trim();
            const matchesSearch =
                query === '' ||
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                (user.kabupaten && user.kabupaten.toLowerCase().includes(query));

            const matchesKab =
                selectedKabupatenFilter === 'semua' ||
                user.kabupaten === selectedKabupatenFilter;

            return matchesSearch && matchesKab;
        });
    }, [adminUsers, searchQuery, selectedKabupatenFilter]);

    // Summary statistics
    const registeredCount = adminUsers.length;
    const coveredKabupatenCount = useMemo(() => {
        return new Set(adminUsers.map((u) => u.kabupaten).filter(Boolean)).size;
    }, [adminUsers]);
    const totalKabupaten = listKabupaten.length;

    const handleKabupatenSelect = (kab: string) => {
        const cleanKab = kab.toLowerCase().replace(/\s+/g, '');
        createForm.setData({
            ...createForm.data,
            kabupaten: kab,
            name: createForm.data.name || `Admin Kab. ${kab}`,
            email: createForm.data.email || `admin.${cleanKab}@dkp.lampung.go.id`,
        });
    };

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/admin/users', {
            onSuccess: () => {
                setIsCreateOpen(false);
                createForm.reset();
                toast.success('Admin Kabupaten berhasil ditambahkan.');
            },
            onError: () => {
                toast.error('Gagal menambahkan admin. Silakan periksa isian form.');
            }
        });
    };

    const openEditModal = (user: User) => {
        setEditUser(user);
        editForm.setData({
            email: user.email,
            kabupaten: user.kabupaten || '',
        });
        editForm.clearErrors();
    };

    const openPasswordModal = (user: User) => {
        setPasswordUser(user);
        passwordForm.setData({
            password: '',
            password_confirmation: '',
        });
        passwordForm.clearErrors();
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editUser) return;

        editForm.put(`/admin/users/${editUser.id}`, {
            onSuccess: () => {
                setEditUser(null);
                toast.success('Profil admin berhasil diperbarui.');
            },
        });
    };

    const submitPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (!passwordUser) return;

        passwordForm.put(`/admin/users/${passwordUser.id}/password`, {
            onSuccess: () => {
                setPasswordUser(null);
                toast.success('Kata sandi berhasil direset.');
            },
        });
    };

    const confirmDelete = () => {
        if (!deleteUser) return;

        router.delete(`/admin/users/${deleteUser.id}`, {
            onSuccess: () => {
                setDeleteUser(null);
                toast.success('Admin Kabupaten berhasil dihapus.');
            },
        });
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedKabupatenFilter('semua');
    };

    return (
        <>
            <Head title="Kelola Admin Kabupaten" />
            <div className="relative flex h-full flex-1 flex-col gap-6 overflow-y-auto rounded-xl p-4 sm:p-6 md:p-8 z-0">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <div className="h-10 w-10 rounded-xl bg-blue-600/10 dark:bg-blue-400/10 border border-blue-200 dark:border-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-2xs">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    Kelola Admin Kabupaten
                                </h1>
                            </div>
                        </div>
                        <p className="text-slate-500 dark:text-neutral-400 mt-1.5 text-xs sm:text-sm max-w-2xl leading-relaxed">
                            Manajemen terpusat akun resmi admin kabupaten se-Provinsi Lampung. Registrasi publik dinonaktifkan secara ketat untuk keamanan data sistem.
                        </p>
                    </div>

                    <Button
                        type="button"
                        onClick={() => {
                            createForm.reset();
                            setIsCreateOpen(true);
                        }}
                        className="h-10 px-4 text-xs font-bold rounded-xl flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer shrink-0"
                    >
                        <UserPlus className="h-4 w-4" />
                        <span>Tambah Admin Baru</span>
                    </Button>
                </div>

                {/* Statistic Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {/* Stat 1: Total Admin */}
                    <div className="rounded-xl border border-slate-200/80 bg-white/90 p-4 shadow-2xs backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/80 flex items-center gap-3.5 transition-all hover:shadow-sm">
                        <div className="h-11 w-11 rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 flex items-center justify-center shrink-0">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-xs font-medium text-slate-500 dark:text-neutral-400">Total Akun Admin</div>
                            <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                                {registeredCount} <span className="text-xs font-semibold text-slate-400">Akun</span>
                            </div>
                        </div>
                    </div>

                    {/* Stat 2: Cakupan Wilayah */}
                    <div className="rounded-xl border border-slate-200/80 bg-white/90 p-4 shadow-2xs backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/80 flex items-center gap-3.5 transition-all hover:shadow-sm">
                        <div className="h-11 w-11 rounded-xl bg-teal-500/10 text-teal-600 dark:bg-teal-400/10 dark:text-teal-400 flex items-center justify-center shrink-0">
                            <Building2 className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-xs font-medium text-slate-500 dark:text-neutral-400">Cakupan Wilayah</div>
                            <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                                {coveredKabupatenCount} <span className="text-xs font-normal text-slate-400">/ {totalKabupaten} Daerah</span>
                            </div>
                        </div>
                    </div>

                    {/* Stat 3: Keamanan */}
                    <div className="rounded-xl border border-slate-200/80 bg-white/90 p-4 shadow-2xs backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/80 flex items-center gap-3.5 transition-all hover:shadow-sm">
                        <div className="h-11 w-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-xs font-medium text-slate-500 dark:text-neutral-400">Status Akses Portal</div>
                            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1.5">
                                <span>Terkontrol Penuh</span>
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-2xs">
                    <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-neutral-500" />
                            <Input
                                type="text"
                                placeholder="Cari berdasarkan nama, kabupaten, atau email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 h-9.5 text-xs bg-slate-50 dark:bg-neutral-800/80 border-slate-200 dark:border-neutral-700 rounded-lg focus-visible:ring-blue-500/20"
                            />
                        </div>

                        {/* Dropdown Filter Kabupaten */}
                        <div className="w-full sm:w-[220px]">
                            <Select value={selectedKabupatenFilter} onValueChange={setSelectedKabupatenFilter}>
                                <SelectTrigger className="h-9.5 text-xs bg-slate-50 dark:bg-neutral-800/80 border-slate-200 dark:border-neutral-700 rounded-lg">
                                    <SelectValue placeholder="Filter Kabupaten" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="semua">Semua Wilayah ({totalKabupaten})</SelectItem>
                                    {listKabupaten.map((kab) => (
                                        <SelectItem key={kab} value={kab}>{kab}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Reset Filter Button */}
                        {(searchQuery !== '' || selectedKabupatenFilter !== 'semua') && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={resetFilters}
                                className="h-9.5 px-3 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white gap-1.5 cursor-pointer"
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Reset
                            </Button>
                        )}
                    </div>

                    <div className="text-xs font-medium text-slate-500 dark:text-neutral-400 self-end sm:self-center px-1">
                        Menampilkan <strong className="text-slate-800 dark:text-neutral-200">{filteredUsers.length}</strong> dari {registeredCount} admin
                    </div>
                </div>

                {/* Table Section */}
                <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:bg-neutral-900 dark:border-neutral-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200/80 dark:border-neutral-800 bg-slate-50/80 dark:bg-neutral-800/60 text-slate-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="px-5 py-3.5 w-12 text-center">#</th>
                                    <th className="px-5 py-3.5 min-w-[200px]">Nama Akun</th>
                                    <th className="px-5 py-3.5 min-w-[190px]">Wilayah Kabupaten / Kota</th>
                                    <th className="px-5 py-3.5 min-w-[240px]">Alamat Email</th>
                                    <th className="px-5 py-3.5 min-w-[250px] text-right">Aksi Manajemen</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/70">
                                {filteredUsers.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-slate-50/70 dark:hover:bg-neutral-800/40 transition-colors"
                                    >
                                        {/* No */}
                                        <td className="px-5 py-3.5 text-center text-xs font-semibold text-slate-400 dark:text-neutral-500">
                                            {index + 1}
                                        </td>

                                        {/* Nama Admin */}
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8.5 w-8.5 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                                                    {user.name.replace('Admin Kab. ', '').substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 dark:text-white leading-tight">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
                                                        Admin Resmi Kabupaten
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Kabupaten Badge */}
                                        <td className="px-5 py-3.5">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/70 dark:border-blue-900/60 shadow-2xs">
                                                <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                                                <span>{user.kabupaten || '-'}</span>
                                            </span>
                                        </td>

                                        {/* Email */}
                                        <td className="px-5 py-3.5">
                                            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-neutral-300">
                                                <Mail className="h-3.5 w-3.5 text-slate-400 dark:text-neutral-500 shrink-0" />
                                                <span>{user.email}</span>
                                            </div>
                                        </td>

                                        {/* Aksi */}
                                        <td className="px-5 py-3.5 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => openEditModal(user)}
                                                    className="h-8 px-2.5 text-xs font-bold rounded-lg border-slate-200/90 dark:border-neutral-700/80 bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-200 hover:bg-slate-100 dark:hover:bg-neutral-700 shadow-2xs cursor-pointer gap-1"
                                                >
                                                    <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                                                    <span>Edit</span>
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => openPasswordModal(user)}
                                                    className="h-8 px-2.5 text-xs font-bold rounded-lg border-amber-200/80 dark:border-amber-800/70 bg-amber-50/50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 hover:bg-amber-100/70 dark:hover:bg-amber-900/50 shadow-2xs cursor-pointer gap-1"
                                                >
                                                    <KeyRound className="w-3.5 h-3.5 text-amber-500" />
                                                    <span>Reset Sandi</span>
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setDeleteUser(user)}
                                                    className="h-8 w-8 p-0 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                                                    title="Hapus Akun Admin"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                                                <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center text-slate-400 mb-3">
                                                    <Search className="h-6 w-6" />
                                                </div>
                                                <div className="font-bold text-slate-800 dark:text-neutral-200 text-sm">
                                                    Tidak ada admin yang cocok
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 leading-relaxed">
                                                    Tidak ditemukan akun admin dengan kata kunci pencarian atau filter wilayah yang dipilih.
                                                </p>
                                                {(searchQuery !== '' || selectedKabupatenFilter !== 'semua') && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={resetFilters}
                                                        className="mt-3 text-xs font-bold rounded-lg"
                                                    >
                                                        Hapus Filter Pencarian
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Tambah Admin Baru */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                            <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                                <UserPlus className="h-4.5 w-4.5" />
                            </div>
                            <span>Tambah Admin Kabupaten</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Daftarkan akun admin baru untuk perwakilan dinas perikanan kabupaten/kota.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitCreate} className="space-y-3.5 pt-1">
                        <div className="space-y-1.5">
                            <Label htmlFor="create-kabupaten" className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                                Pilih Wilayah Kabupaten *
                            </Label>
                            <Select value={createForm.data.kabupaten} onValueChange={handleKabupatenSelect}>
                                <SelectTrigger className="w-full text-xs h-9.5 rounded-lg bg-slate-50 dark:bg-neutral-800 border-slate-200 dark:border-neutral-700">
                                    <SelectValue placeholder="Pilih Kabupaten / Kota" />
                                </SelectTrigger>
                                <SelectContent>
                                    {listKabupaten.map((kab) => (
                                        <SelectItem key={kab} value={kab}>{kab}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {createForm.errors.kabupaten && <p className="text-xs text-rose-500 font-medium">{createForm.errors.kabupaten}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="create-name" className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                                Nama Akun *
                            </Label>
                            <Input
                                id="create-name"
                                value={createForm.data.name}
                                onChange={(e) => createForm.setData('name', e.target.value)}
                                placeholder="Admin Kab. ..."
                                required
                                className="h-9.5 text-xs rounded-lg bg-slate-50 dark:bg-neutral-800 border-slate-200 dark:border-neutral-700"
                            />
                            {createForm.errors.name && <p className="text-xs text-rose-500 font-medium">{createForm.errors.name}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="create-email" className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                                Alamat Email Resmi *
                            </Label>
                            <Input
                                id="create-email"
                                type="email"
                                value={createForm.data.email}
                                onChange={(e) => createForm.setData('email', e.target.value)}
                                placeholder="admin@dkp.lampung.go.id"
                                required
                                className="h-9.5 text-xs rounded-lg bg-slate-50 dark:bg-neutral-800 border-slate-200 dark:border-neutral-700 font-mono"
                            />
                            {createForm.errors.email && <p className="text-xs text-rose-500 font-medium">{createForm.errors.email}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="create-password" className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                                Kata Sandi Akun *
                            </Label>
                            <Input
                                id="create-password"
                                type="password"
                                value={createForm.data.password}
                                onChange={(e) => createForm.setData('password', e.target.value)}
                                placeholder="Minimal 8 karakter"
                                required
                                className="h-9.5 text-xs rounded-lg bg-slate-50 dark:bg-neutral-800 border-slate-200 dark:border-neutral-700"
                            />
                            {createForm.errors.password && <p className="text-xs text-rose-500 font-medium">{createForm.errors.password}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="create-password-confirmation" className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                                Konfirmasi Kata Sandi *
                            </Label>
                            <Input
                                id="create-password-confirmation"
                                type="password"
                                value={createForm.data.password_confirmation}
                                onChange={(e) => createForm.setData('password_confirmation', e.target.value)}
                                placeholder="Ketik ulang kata sandi"
                                required
                                className="h-9.5 text-xs rounded-lg bg-slate-50 dark:bg-neutral-800 border-slate-200 dark:border-neutral-700"
                            />
                        </div>

                        <DialogFooter className="pt-2">
                            <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} className="text-xs font-bold rounded-lg">
                                Batal
                            </Button>
                            <Button type="submit" disabled={createForm.processing} className="text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
                                {createForm.processing ? 'Menyimpan...' : 'Simpan Admin'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Modal Edit Profil */}
            <Dialog open={!!editUser} onOpenChange={(open) => !open && setEditUser(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                            <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                                <Edit2 className="h-4.5 w-4.5" />
                            </div>
                            <span>Edit Profil Admin</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Ubah detail email atau nama kabupaten untuk <strong>{editUser?.name}</strong>.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitEdit} className="space-y-3.5 pt-1">
                        <div className="space-y-1.5">
                            <Label htmlFor="kabupaten" className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                                Wilayah Kabupaten
                            </Label>
                            <Input
                                id="kabupaten"
                                value={editForm.data.kabupaten}
                                onChange={(e) => editForm.setData('kabupaten', e.target.value)}
                                required
                                className="h-9.5 text-xs rounded-lg bg-slate-50 dark:bg-neutral-800 border-slate-200 dark:border-neutral-700"
                            />
                            {editForm.errors.kabupaten && <p className="text-xs text-rose-500 font-medium">{editForm.errors.kabupaten}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                                Alamat Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={editForm.data.email}
                                onChange={(e) => editForm.setData('email', e.target.value)}
                                required
                                className="h-9.5 text-xs rounded-lg bg-slate-50 dark:bg-neutral-800 border-slate-200 dark:border-neutral-700 font-mono"
                            />
                            {editForm.errors.email && <p className="text-xs text-rose-500 font-medium">{editForm.errors.email}</p>}
                        </div>
                        <DialogFooter className="pt-2">
                            <Button type="button" variant="outline" onClick={() => setEditUser(null)} className="text-xs font-bold rounded-lg">
                                Batal
                            </Button>
                            <Button type="submit" disabled={editForm.processing} className="text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
                                {editForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Modal Reset Password */}
            <Dialog open={!!passwordUser} onOpenChange={(open) => !open && setPasswordUser(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                            <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                                <KeyRound className="h-4.5 w-4.5" />
                            </div>
                            <span>Reset Kata Sandi Akun</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Masukkan kata sandi baru untuk <strong>{passwordUser?.name}</strong> ({passwordUser?.email}).
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitPassword} className="space-y-3.5 pt-1">
                        <div className="space-y-1.5">
                            <Label htmlFor="password" className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                                Kata Sandi Baru *
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={passwordForm.data.password}
                                onChange={(e) => passwordForm.setData('password', e.target.value)}
                                placeholder="Minimal 8 karakter"
                                required
                                className="h-9.5 text-xs rounded-lg bg-slate-50 dark:bg-neutral-800 border-slate-200 dark:border-neutral-700"
                            />
                            {passwordForm.errors.password && <p className="text-xs text-rose-500 font-medium">{passwordForm.errors.password}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="password_confirmation" className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                                Konfirmasi Kata Sandi Baru *
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                placeholder="Ketik ulang kata sandi baru"
                                required
                                className="h-9.5 text-xs rounded-lg bg-slate-50 dark:bg-neutral-800 border-slate-200 dark:border-neutral-700"
                            />
                        </div>
                        <DialogFooter className="pt-2">
                            <Button type="button" variant="outline" onClick={() => setPasswordUser(null)} className="text-xs font-bold rounded-lg">
                                Batal
                            </Button>
                            <Button type="submit" disabled={passwordForm.processing} className="text-xs font-bold rounded-lg bg-amber-600 hover:bg-amber-700 text-white">
                                {passwordForm.processing ? 'Menyimpan...' : 'Simpan Kata Sandi'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Modal Konfirmasi Hapus */}
            <Dialog open={!!deleteUser} onOpenChange={(open) => !open && setDeleteUser(null)}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-rose-600 font-bold">
                            <AlertTriangle className="h-5 w-5" />
                            <span>Hapus Akun Admin?</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs leading-relaxed">
                            Akun resmi <strong>{deleteUser?.name}</strong> ({deleteUser?.email}) untuk wilayah <strong>{deleteUser?.kabupaten}</strong> akan dihapus secara permanen. Admin tersebut tidak akan dapat login lagi.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0 pt-2">
                        <Button type="button" variant="outline" onClick={() => setDeleteUser(null)} className="text-xs font-bold rounded-lg">
                            Batal
                        </Button>
                        <Button type="button" variant="destructive" onClick={confirmDelete} className="text-xs font-bold rounded-lg">
                            Ya, Hapus Akun
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

AdminUsersIndex.layout = {
    breadcrumbs,
};
