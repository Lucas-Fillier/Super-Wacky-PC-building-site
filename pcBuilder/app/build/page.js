"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BuildPage() {
    const router = useRouter();

    const [parts, setParts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentBuild, setCurrentBuild] = useState([]);

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const response = await fetch('/api/parts');
                if (!response.ok) throw new Error('Failed to fetch hardware data');
                const data = await response.json();
                setParts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchParts();
    }, []);

    const addToBuild = (part) => setCurrentBuild([...currentBuild, part]);
    const clearBuild = () => setCurrentBuild([]);
    const removeFromBuild = (indexToRemove) => {
        setCurrentBuild(currentBuild.filter((_, index) => index !== indexToRemove));
    };

    return (
        <main className="flex flex-col flex-grow bg-slate-50 dark:bg-slate-900 transition-colors duration-200 min-h-screen">

            <section className="bg-white dark:bg-slate-950 py-12 px-6 border-b border-slate-200 dark:border-slate-800 text-center transition-colors duration-200">
                <h1 className="text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">
                    System <span className="text-emerald-600 dark:text-emerald-400">Builder</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                    Select your components to see them added to your active build list.
                </p>
            </section>

            <div className="max-w-7xl mx-auto py-12 px-6 w-full flex flex-col lg:flex-row gap-8">

                {/* Left Column: Parts Selection */}
                <div className="lg:w-2/3">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                        Available Components
                    </h2>

                    {isLoading && (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg border border-red-200 dark:border-red-800 text-center">
                            Error: {error}
                        </div>
                    )}

                    {!isLoading && !error && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {parts.map((part) => (
                                <div key={part.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 transition-colors shadow-sm flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{part.category}</span>
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{part.price}</span>
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{part.name}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 flex-grow">{part.specs}</p>

                                    <button
                                        onClick={() => addToBuild(part)}
                                        className="w-full py-2 bg-slate-100 dark:bg-slate-700 hover:bg-emerald-500 dark:hover:bg-emerald-500 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-slate-950 rounded-md transition-colors text-sm font-bold mt-auto"
                                    >
                                        Add to Build
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="lg:w-1/3">
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 sticky top-6 shadow-xl transition-colors duration-200">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                            Your Wacky Rig
                        </h2>

                        {currentBuild.length === 0 ? (
                            <p className="text-slate-500 dark:text-slate-400 text-sm text-center py-8">
                                Your build is completely empty. Start adding parts!
                            </p>
                        ) : (
                            <ul className="space-y-3 mb-6">
                                {currentBuild.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center text-sm bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-700 group">
                                        <div className="flex-grow">
                                            <span className="block text-xs text-slate-500 dark:text-slate-400 font-bold">{item.category}</span>
                                            <span className="text-slate-900 dark:text-slate-100 truncate w-32 inline-block" title={item.name}>{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.price}</span>
                                            <button
                                                onClick={() => removeFromBuild(index)}
                                                className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30"
                                                title="Remove item"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => {
                                    if (currentBuild.length > 0) {
                                        router.push('/saved');
                                    } else {
                                        alert("Add some parts before saving!");
                                    }
                                }}
                                className="flex-grow bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold py-3 rounded-lg transition-all"
                            >
                                Save Build
                            </button>

                            {currentBuild.length > 0 && (
                                <button
                                    onClick={clearBuild}
                                    className="px-4 bg-slate-200 dark:bg-slate-700 hover:bg-red-500 dark:hover:bg-red-500 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white font-bold py-3 rounded-lg transition-all"
                                    title="Clear all parts"
                                >
                                    Reset
                                </button>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
}