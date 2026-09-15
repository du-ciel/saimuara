import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Edit2, KeyRound } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    kabupaten: string;
    role: string;
}

interface PageProps {
    adminUsers: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Admin Kabupaten',
        href: '/admin/users',
    },
];

export default function AdminUsersIndex({ adminUsers }: PageProps) {
    const [editUser, setEditUser] = useState<User | null>(null);
    const [passwordUser, setPasswordUser] = useState<User | null>(null);

    const editForm = useForm({
        email: '',
        kabupaten: '',
    });

    const passwordForm = useForm({
        password: '',
        password_confirmation: '',
    });

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
            onSuccess: () => setEditUser(null),
        });
    };

    const submitPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (!passwordUser) return;

        passwordForm.put(`/admin/users/${passwordUser.id}/password`, {
            onSuccess: () => setPasswordUser(null),
        });
    };

    return (
        <>
            <Head title="Kelola Admin" />
            <div className="relative flex h-full flex-1 flex-col gap-6 overflow-y-auto rounded-xl p-4 md:p-8 z-0">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-blue-950 dark:text-blue-50">
                            Kelola Admin Kabupaten
                        </h1>
                        <p className="text-slate-500 dark:text-neutral-400 mt-1">
                            Manajemen akun admin kabupaten (Ubah Email / Reset Sandi).
                        </p>
                    </div>
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
                                            {user.kabupaten || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-neutral-300">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Button variant="outline" size="sm" onClick={() => openEditModal(user)}>
                                                <Edit2 className="w-4 h-4 mr-1" /> Edit
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => openPasswordModal(user)}>
                                                <KeyRound className="w-4 h-4 mr-1" /> Reset Sandi
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {adminUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-slate-500 dark:text-neutral-500">
                                            Belum ada data admin kabupaten.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

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
        </>
    );
}

AdminUsersIndex.layout = {
    breadcrumbs,
};
