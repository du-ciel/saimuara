import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
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
import { Edit2, KeyRound, UserPlus, Trash2, ShieldCheck, AlertTriangle } from 'lucide-react';
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

    const handleKabupatenSelect = (kab: string) => {
        createForm.setData({
            ...createForm.data,
            kabupaten: kab,
            name: createForm.data.name || `Admin Kab. ${kab}`,
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

    return (
        <>
            <Head title="Kelola Admin" />
            <div className="relative flex h-full flex-1 flex-col gap-6 overflow-y-auto rounded-xl p-4 md:p-8 z-0">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-blue-950 dark:text-blue-50">
                                Kelola Admin Kabupaten
                            </h1>
                        </div>
                        <p className="text-slate-500 dark:text-neutral-400 mt-1 text-sm">
                            Manajemen terpusat akun resmi admin kabupaten se-Provinsi Lampung. Registrasi publik dinonaktifkan untuk keamanan.
                        </p>
                    </div>

                    <Button
                        type="button"
                        onClick={() => {
                            createForm.reset();
                            setIsCreateOpen(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm rounded-xl cursor-pointer"
                    >
                        <UserPlus className="h-4 w-4" />
                        Tambah Admin Baru
                    </Button>
                </div>

                <div className="rounded-xl border border-slate-200/60 bg-white/70 shadow-sm backdrop-blur-xl dark:bg-neutral-900/70 dark:border-neutral-800/60 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 dark:bg-neutral-800/50 dark:text-neutral-400 border-b border-slate-200 dark:border-neutral-800">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Nama</th>
                                    <th className="px-6 py-4 font-medium">Kabupaten</th>
                                    <th className="px-6 py-4 font-medium">Email</th>
                                    <th className="px-6 py-4 font-medium text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminUsers.map((user) => (
                                    <tr key={user.id} className="border-b border-slate-100 dark:border-neutral-800/50 hover:bg-slate-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-neutral-100">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-neutral-300">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50">
                                                {user.kabupaten || '-'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-neutral-300">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Button variant="outline" size="sm" onClick={() => openEditModal(user)} className="cursor-pointer">
                                                <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => openPasswordModal(user)} className="cursor-pointer">
                                                <KeyRound className="w-3.5 h-3.5 mr-1" /> Reset Sandi
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => setDeleteUser(user)} className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {adminUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-slate-500 dark:text-neutral-500">
                                            Belum ada akun admin kabupaten terdaftar. Klik tombol di atas untuk menambahkan.
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
                        <DialogTitle className="flex items-center gap-2">
                            <UserPlus className="h-5 w-5 text-blue-600" />
                            Tambah Admin Kabupaten
                        </DialogTitle>
                        <DialogDescription>
                            Daftarkan akun admin baru untuk perwakilan dinas perikanan kabupaten/kota.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitCreate} className="space-y-3.5">
                        <div className="space-y-1.5">
                            <Label htmlFor="create-kabupaten">Pilih Wilayah Kabupaten *</Label>
                            <Select value={createForm.data.kabupaten} onValueChange={handleKabupatenSelect}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Kabupaten / Kota" />
                                </SelectTrigger>
                                <SelectContent>
                                    {listKabupaten.map((kab) => (
                                        <SelectItem key={kab} value={kab}>{kab}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {createForm.errors.kabupaten && <p className="text-xs text-red-500">{createForm.errors.kabupaten}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="create-name">Nama Akun *</Label>
                            <Input
                                id="create-name"
                                value={createForm.data.name}
                                onChange={(e) => createForm.setData('name', e.target.value)}
                                placeholder="Admin Kab. ..."
                                required
                            />
                            {createForm.errors.name && <p className="text-xs text-red-500">{createForm.errors.name}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="create-email">Alamat Email *</Label>
                            <Input
                                id="create-email"
                                type="email"
                                value={createForm.data.email}
                                onChange={(e) => createForm.setData('email', e.target.value)}
                                placeholder="admin@dkp.lampung.go.id"
                                required
                            />
                            {createForm.errors.email && <p className="text-xs text-red-500">{createForm.errors.email}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="create-password">Kata Sandi *</Label>
                            <Input
                                id="create-password"
                                type="password"
                                value={createForm.data.password}
                                onChange={(e) => createForm.setData('password', e.target.value)}
                                placeholder="Minimal 8 karakter"
                                required
                            />
                            {createForm.errors.password && <p className="text-xs text-red-500">{createForm.errors.password}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="create-password-confirmation">Konfirmasi Kata Sandi *</Label>
                            <Input
                                id="create-password-confirmation"
                                type="password"
                                value={createForm.data.password_confirmation}
                                onChange={(e) => createForm.setData('password_confirmation', e.target.value)}
                                placeholder="Ketik ulang kata sandi"
                                required
                            />
                        </div>

                        <DialogFooter className="pt-2">
                            <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={createForm.processing} className="bg-blue-600 hover:bg-blue-700 text-white">
                                {createForm.processing ? 'Menyimpan...' : 'Simpan Admin'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Modal Edit Profil */}
            <Dialog open={!!editUser} onOpenChange={(open) => !open && setEditUser(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Profil Admin</DialogTitle>
                        <DialogDescription>Ubah detail email atau nama kabupaten untuk {editUser?.name}.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitEdit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="kabupaten">Kabupaten</Label>
                            <Input
                                id="kabupaten"
                                value={editForm.data.kabupaten}
                                onChange={(e) => editForm.setData('kabupaten', e.target.value)}
                                required
                            />
                            {editForm.errors.kabupaten && <p className="text-sm text-red-500">{editForm.errors.kabupaten}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={editForm.data.email}
                                onChange={(e) => editForm.setData('email', e.target.value)}
                                required
                            />
                            {editForm.errors.email && <p className="text-sm text-red-500">{editForm.errors.email}</p>}
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setEditUser(null)}>Batal</Button>
                            <Button type="submit" disabled={editForm.processing}>Simpan Perubahan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Modal Reset Password */}
            <Dialog open={!!passwordUser} onOpenChange={(open) => !open && setPasswordUser(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reset Kata Sandi</DialogTitle>
                        <DialogDescription>Masukkan kata sandi baru untuk {passwordUser?.name}.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitPassword} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Kata Sandi Baru</Label>
                            <Input
                                id="password"
                                type="password"
                                value={passwordForm.data.password}
                                onChange={(e) => passwordForm.setData('password', e.target.value)}
                                required
                            />
                            {passwordForm.errors.password && <p className="text-sm text-red-500">{passwordForm.errors.password}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation">Konfirmasi Kata Sandi</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                required
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setPasswordUser(null)}>Batal</Button>
                            <Button type="submit" disabled={passwordForm.processing}>Simpan Kata Sandi</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Modal Konfirmasi Hapus */}
            <Dialog open={!!deleteUser} onOpenChange={(open) => !open && setDeleteUser(null)}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-rose-600">
                            <AlertTriangle className="h-5 w-5" />
                            Hapus Akun Admin?
                        </DialogTitle>
                        <DialogDescription>
                            Akun <strong>{deleteUser?.name}</strong> ({deleteUser?.email}) akan dihapus secara permanen dari sistem.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0 pt-2">
                        <Button type="button" variant="outline" onClick={() => setDeleteUser(null)}>Batal</Button>
                        <Button type="button" variant="destructive" onClick={confirmDelete}>
                            Ya, Hapus
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
