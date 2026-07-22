"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="text-xl font-bold text-emerald-500 animate-pulse">
                    Verifying Credentials...
                </div>
            </main>
        );
    }

    if (!session) return null;

    return (
        <main className="flex flex-col flex-grow min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 py-16 px-6">
            <div className="max-w-5xl mx-auto w-full">

                <div className="flex items-center gap-6 mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
                    {session.user?.image && (
                        <img
                            src={session.user.image}
                            alt="Profile"
                            className="w-20 h-20 rounded-full border-4 border-emerald-500 shadow-lg"
                        />
                    )}
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
                            Welcome back, <span className="text-emerald-600 dark:text-emerald-400">{session.user?.name}</span>
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-2 font-medium">
                            Manage your saved builds and account settings here.
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-700/50 pb-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Saved Builds</h2>
                        <Link href="/build" className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors">
                            + New Build
                        </Link>
                    </div>

                    <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                        <p className="text-slate-500 dark:text-slate-400 mb-4 font-medium">
                            You haven't saved any wacky PC builds yet!
                        </p>
                        <Link href="/build" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                            Click here to start your first build
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}