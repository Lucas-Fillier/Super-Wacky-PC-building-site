"use client"

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
    const { data: session, status } = useSession();

    return (
        <nav className="relative flex items-center justify-between p-6 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 transition-colors duration-200">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
                Super Wacky PC Builder
            </div>

            <ul className="absolute left-1/2 -translate-x-1/2 hidden lg:flex space-x-6 text-sm font-medium text-slate-600 dark:text-slate-300">
                <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors">Home</Link>
                <Link href="/build" className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors">Start a Build</Link>
                <Link href="/parts" className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors">Browse Parts</Link>
                <Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors">Contact</Link>
                <Link href="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors">About</Link>
            </ul>

            <div className="z-10">
                {status === 'loading' ? (
                    <div className="text-emerald-500 font-bold px-8 py-4">Loading...</div>
                ) : session ? (
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            {session.user.image && (
                                <img
                                    src={session.user.image}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-emerald-500"
                                />
                            )}
                            <div className="flex flex-col hidden sm:flex">
                                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
                                    {session.user.name}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    Signed In
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 text-sm font-bold rounded-lg transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <Link href="/login" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white dark:text-slate-950 text-lg font-bold rounded-lg shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}