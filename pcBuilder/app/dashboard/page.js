// app/dashboard/page.js
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [savedBuilds, setSavedBuilds] = useState([]);
    const [isLoadingBuilds, setIsLoadingBuilds] = useState(true);
    const [expandedBuildId, setExpandedBuildId] = useState(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    useEffect(() => {
        if (status === "authenticated") {
            const fetchUserBuilds = async () => {
                try {
                    const response = await fetch('/api/builds');
                    if (response.ok) {
                        const data = await response.json();
                        setSavedBuilds(data);
                    }
                } catch (error) {
                    console.error("Failed to fetch builds", error);
                } finally {
                    setIsLoadingBuilds(false);
                }
            };
            fetchUserBuilds();
        }
    }, [status]);

    const handleDeleteBuild = async (buildId) => {
        const confirmDelete = window.confirm("Are you sure you want to scrap this build?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/builds/${buildId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete');

            setSavedBuilds((prevBuilds) => prevBuilds.filter(build => build._id !== buildId));

        } catch (error) {
            console.error("Error deleting build:", error);
            alert("Could not delete the build. Please try again.");
        }
    };

    const toggleDetails = (buildId) => {
        if (expandedBuildId === buildId) {
            setExpandedBuildId(null);
        } else {
            setExpandedBuildId(buildId);
        }
    };

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

                    {isLoadingBuilds ? (
                        <div className="text-center py-12 text-slate-500 dark:text-slate-400 font-bold animate-pulse">Loading your lab data...</div>
                    ) : savedBuilds.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {savedBuilds.map((build) => (
                                <div key={build._id} className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 flex flex-col transition-all">

                                    <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{build.name || "Untitled Build"}</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                                Saved on: {new Date(build.createdAt).toLocaleDateString()}
                                            </p>

                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                                    {build.parts?.length || 0} Components
                                                </span>
                                                {build.totalPrice && (
                                                    <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded">
                                                        Total: {build.totalPrice}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 w-full md:w-auto mt-2 md:mt-0">
                                            <button
                                                onClick={() => toggleDetails(build._id)}
                                                className="flex-grow md:flex-grow-0 px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-emerald-500 dark:hover:bg-emerald-500 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white text-sm font-bold rounded-lg transition-colors"
                                            >
                                                {expandedBuildId === build._id ? "Hide Details" : "View Rig"}
                                            </button>

                                            <button
                                                onClick={() => handleDeleteBuild(build._id)}
                                                className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40 text-sm font-bold rounded-lg transition-colors"
                                            >
                                                Scrap
                                            </button>
                                        </div>
                                    </div>

                                    {expandedBuildId === build._id && (
                                        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 uppercase tracking-wider">
                                                Parts List
                                            </h4>

                                            {build.parts && build.parts.length > 0 ? (
                                                <ul className="space-y-3">
                                                    {build.parts.map((part, index) => (
                                                        <li key={index} className="flex justify-between items-center bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                                                            <div className="flex flex-col">
                                                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">{part.category}</span>
                                                                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{part.name}</span>
                                                            </div>
                                                            <span className="font-bold text-slate-700 dark:text-slate-300">{part.price}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-sm text-slate-500">No parts found in this build.</p>
                                            )}
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                            <p className="text-slate-500 dark:text-slate-400 mb-4 font-medium">
                                You haven't saved any wacky PC builds yet!
                            </p>
                            <Link href="/build" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                                Click here to start your first build
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}