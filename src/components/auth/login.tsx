"use client";
import { LogoIcon } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'
import { Loader2 } from 'lucide-react';
import Link from 'next/link'
import Google from '../buttons/OAuth/Google';

export default function Login() {

    const { signInForm, handleSignIn, isLoading } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = signInForm

    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <form
                onSubmit={handleSubmit(handleSignIn)}
                className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
                <div className="p-8 pb-6">
                    <div className='mb-4'>
                        <Link
                            href="/"
                            aria-label="go home">
                            <LogoIcon />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Sign In to Mochi</h1>
                        <p className="text-sm">Welcome back! Sign in to continue</p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="block text-sm">
                                Email
                            </Label>
                            <Input
                                type="email"
                                required
                                {...register("email")}
                                id="email"
                                className={errors.email ? "border-destructive" : ""}
                            />
                            {errors.email && (
                                <p className='text-xs text-destructive'>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-0.5">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="pwd"
                                    className="text-sm">
                                    Password
                                </Label>
                                <Button
                                    asChild
                                    variant="link"
                                    size="sm">
                                    <Link
                                        href="#"
                                        className="link intent-info variant-ghost text-xs">
                                        Forgot your Password?
                                    </Link>
                                </Button>
                            </div>
                            <Input
                                type="password"
                                required
                                {...register("password")}
                                id="password"
                                className={errors.email ? "border-destructive" : ""}
                            />
                            {errors.email && (
                                <p className='text-xs text-destructive'>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {errors.root && (
                            <p className='text-xs text-destructive text-center'>
                                {errors.root.message}
                            </p>
                        )}

                        <Button className="w-full" disabled={isLoading} type='submit'>
                            {
                                isLoading ?
                                    <>
                                        <Loader2 className='animate-spin' /> Signing In...
                                    </>
                                    :
                                    <>Sign In</>
                            }
                        </Button>
                    </div>
                </div>

                <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-3'>
                    <hr className="my-4 border-dashed" />
                    <span className='text-muted-foreground text-xs'>
                        Or continue with
                    </span>
                    <hr className="my-4 border-dashed" />
                </div>

                <div className="grid grid-cols-2 gap-3 p-4">
                    <Google />
                    <Button
                        type="button"
                        variant="outline">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 256 256">
                            <path
                                fill="#f1511b"
                                d="M121.666 121.666H0V0h121.666z"></path>
                            <path
                                fill="#80cc28"
                                d="M256 121.666H134.335V0H256z"></path>
                            <path
                                fill="#00adef"
                                d="M121.663 256.002H0V134.336h121.663z"></path>
                            <path
                                fill="#fbbc09"
                                d="M256 256.002H134.335V134.336H256z"></path>
                        </svg>
                        <span>Microsoft</span>
                    </Button>
                </div>

                <div className="bg-muted rounded-(--radius) border p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Do not have an account ?
                        <Button
                            asChild
                            variant="link"
                            className="px-2">
                            <Link href="/auth/sign-up">Create account</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    )
}
