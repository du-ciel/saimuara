import { Form, Head } from '@inertiajs/react';
import { Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import PasskeyVerify from '@/components/passkey-verify';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Masuk - SAIMUARA" />

            <PasskeyVerify />

            {status && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{status}</span>
                </div>
            )}

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-4"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-4">
                            {/* Alamat Email */}
                            <div className="grid gap-1.5">
                                <Label htmlFor="email" className="text-xs font-medium text-slate-700 dark:text-neutral-300">
                                    Email
                                </Label>
                                <div className="relative">
                                    <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 z-10">
                                        <Mail className="h-4 w-4 text-slate-400 dark:text-neutral-500" />
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="nama@email.com"
                                        className="pl-10 h-10.5 bg-slate-50/70 dark:bg-neutral-800/70 border-slate-200 dark:border-neutral-700/80 rounded-xl focus-visible:ring-blue-500/25 focus-visible:border-blue-500 text-sm shadow-2xs transition-all placeholder:text-slate-400"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            {/* Kata Sandi */}
                            <div className="grid gap-1.5">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-xs font-medium text-slate-700 dark:text-neutral-300">
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                                            tabIndex={5}
                                        >
                                            Lupa password?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Masukkan password"
                                    icon={<Lock className="h-4 w-4 text-slate-400 dark:text-neutral-500" />}
                                    className="h-10.5 bg-slate-50/70 dark:bg-neutral-800/70 border-slate-200 dark:border-neutral-700/80 rounded-xl focus-visible:ring-blue-500/25 focus-visible:border-blue-500 text-sm shadow-2xs transition-all placeholder:text-slate-400"
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Ingat Saya */}
                            <div className="flex items-center space-x-2 pt-0.5">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="rounded-md border-slate-300 dark:border-neutral-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                                <Label htmlFor="remember" className="text-xs font-normal text-slate-600 dark:text-neutral-400 cursor-pointer select-none">
                                    Ingat saya
                                </Label>
                            </div>

                            {/* Tombol Masuk */}
                            <Button
                                type="submit"
                                className="mt-1 w-full h-10.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 text-sm"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing ? (
                                    <>
                                        <Spinner className="h-4 w-4 text-white" />
                                        <span>Memproses...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Masuk</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Tautan Pendaftaran */}
                        <div className="text-center text-xs text-slate-500 dark:text-neutral-400 pt-3 border-t border-slate-100 dark:border-neutral-800">
                            Belum punya akun?{' '}
                            <TextLink href={register()} tabIndex={6} className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline">
                                Daftar
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Login.layout = {
    title: 'Masuk ke Akun',
};
