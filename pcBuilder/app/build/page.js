"use client";

import { useState, useEffect } from 'react';
import { useRouter, redirect } from 'next/navigation';
import { useSession } from "next-auth/react";
import PartImage from "@/components/PartImage";

export default function BuildPage() {
    const router = useRouter();

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/login')
        }
    })

    const [parts, setParts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentBuild, setCurrentBuild] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState(null);

    const [isAutoBuilding, setIsAutoBuilding] = useState(false);
    const [autoBuildMessage, setAutoBuildMessage] = useState(null);

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

    const addToBuild = (part) => {
        setCurrentBuild([...currentBuild, part]);
        setAiAnalysis(null);
    };

    const clearBuild = () => {
        setCurrentBuild([]);
        setAiAnalysis(null);
        setAutoBuildMessage(null);
    };

    const removeFromBuild = (indexToRemove) => {
        setCurrentBuild(currentBuild.filter((_, index) => index !== indexToRemove));
        setAiAnalysis(null);
    };

    const calculateTotal = () => {
        const total = currentBuild.reduce((sum, item) => {
            const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
            return sum + numericPrice;
        }, 0);
        return total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const handleAutoBuild = async (tier) => {
        if (parts.length === 0) return;

        setIsAutoBuilding(true);
        setAutoBuildMessage(null);
        setAiAnalysis(null);

        try {
            const response = await fetch('/api/auto-build', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tier: tier, inventory: parts }),
            });

            if (!response.ok) throw new Error('Auto-build failed');

            const data = await response.json();

            const selectedParts = data.selectedPartIds.map(id =>
                parts.find(p => (p._id || p.id) === id)
            ).filter(Boolean);

            setCurrentBuild(selectedParts);

            setAutoBuildMessage({
                name: data.buildName,
                explanation: data.explanation
            });

        } catch (error) {
            console.error(error);
            alert("The AI got confused browsing the store. Please try again.");
        } finally {
            setIsAutoBuilding(false);
        }
    };

    const handleAnalyzeBuild = async () => {
        if (currentBuild.length === 0) return;
        setIsAnalyzing(true);
        setAiAnalysis(null);
        try {
            const response = await fetch('/api/analyze-build', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ parts: currentBuild }),
            });
            if (!response.ok) throw new Error('Failed to reach AI');
            const data = await response.json();
            setAiAnalysis(data);
        } catch (error) {
            console.error(error);
            alert("AI failed to analyze your rig. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSaveBuild = async () => {
        if (currentBuild.length === 0) return;
        const defaultName = aiAnalysis?.buildName || autoBuildMessage?.name || "My Awesome Rig";
        const buildName = prompt("Give your rig a name:", defaultName);
        if (!buildName) return;
        setIsSaving(true);
        try {
            const buildData = {
                name: buildName,
                parts: currentBuild,
                totalPrice: calculateTotal(),
                aiAnalysis: aiAnalysis
            };
            const response = await fetch('/api/builds', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(buildData),
            });
            if (!response.ok) throw new Error('Failed to save build');
            alert("Build saved successfully!");
            clearBuild();
            router.push('/dashboard');
        } catch (error) {
            console.error(error);
            alert("There was an error saving your build.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <main className="flex flex-col flex-grow bg-slate-50 dark:bg-slate-900 transition-colors duration-200 min-h-screen">
            <section className="bg-white dark:bg-slate-950 py-12 px-6 border-b border-slate-200 dark:border-slate-800 text-center transition-colors duration-200">
                <h1 className="text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">
                    System <span className="text-emerald-600 dark:text-emerald-400">Builder</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                    Welcome to Super Wacky PC Builder, <strong>{session?.user?.name}</strong>. Select your components or let our AI build it for you!
                </p>
            </section>

            <div className="max-w-7xl mx-auto py-12 px-6 w-full flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">

                    <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800/50 rounded-2xl p-6 mb-8">
                        <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-2 flex items-center gap-2">
                            <span>✨</span> AI Auto-Builder
                        </h2>
                        <p className="text-sm text-indigo-700 dark:text-indigo-400 mb-4">
                            Not sure what to pick? Tell the AI what kind of performance you want, and it will instantly draft a compatible build from our current inventory.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button
                                onClick={() => handleAutoBuild("Low-End / Budget")}
                                disabled={isAutoBuilding || parts.length === 0}
                                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                            >
                                🥉 Budget
                            </button>
                            <button
                                onClick={() => handleAutoBuild("Mid-Range / Solid 1080p")}
                                disabled={isAutoBuilding || parts.length === 0}
                                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                            >
                                🥈 Mid-Range
                            </button>
                            <button
                                onClick={() => handleAutoBuild("High-End / 4K Gaming")}
                                disabled={isAutoBuilding || parts.length === 0}
                                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                            >
                                🥇 High-End
                            </button>
                        </div>

                        {isAutoBuilding && (
                            <div className="mt-4 text-center text-sm font-bold text-indigo-600 dark:text-indigo-400 animate-pulse">
                                The AI is browsing the shelves...
                            </div>
                        )}
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                        Available Components
                    </h2>

                    {isLoading && (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                        </div>
                    )}

                    {!isLoading && !error && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {parts.map((part) => (
                                <div key={part._id || part.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 transition-colors shadow-sm flex flex-col">
                                    <PartImage part={part}/>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{part.category}</span>
                                        <span className="font-bold text-emerald-600">{part.price}</span>
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{part.name}</h3>
                                    <p className="text-xs text-slate-500 mb-4 flex-grow">{part.specs}</p>

                                    <button
                                        onClick={() => addToBuild(part)}
                                        className="w-full py-2 bg-slate-100 dark:bg-slate-700 hover:bg-emerald-500 text-slate-700 hover:text-white rounded-md transition-colors text-sm font-bold mt-auto"
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
                            Your Rig
                        </h2>

                        {currentBuild.length === 0 ? (
                            <p className="text-slate-500 text-sm text-center py-8">
                                Your build is completely empty. Start adding parts!
                            </p>
                        ) : (
                            <ul className="space-y-3 mb-2">
                                {currentBuild.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center text-sm bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                                        <div className="flex-grow">
                                            <span className="block text-xs text-slate-500 font-bold">{item.category}</span>
                                            <span className="text-slate-900 dark:text-slate-100 truncate w-32 inline-block" title={item.name}>{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-emerald-600">{item.price}</span>
                                            <button onClick={() => removeFromBuild(index)} className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {currentBuild.length > 0 && (
                            <div className="flex justify-between items-center py-4 mt-2 border-t border-slate-200 dark:border-slate-700 mb-2">
                                <span className="text-lg font-bold text-slate-900 dark:text-slate-100">Total Estimate</span>
                                <span className="text-2xl font-extrabold text-emerald-600">{calculateTotal()}</span>
                            </div>
                        )}

                        {autoBuildMessage && !aiAnalysis && (
                            <div className="mb-4 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
                                <h3 className="font-black text-sm text-indigo-700 dark:text-indigo-400 mb-1">{autoBuildMessage.name}</h3>
                                <p className="text-xs text-slate-700 dark:text-slate-300">{autoBuildMessage.explanation}</p>
                            </div>
                        )}

                        {aiAnalysis && (
                            <div className="mb-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-sm">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-black text-lg text-slate-900 dark:text-slate-100">{aiAnalysis.buildName}</h3>
                                    <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-bold px-2 py-1 rounded text-xs">
                                        {aiAnalysis.performanceTier}
                                    </span>
                                </div>

                                <p className="text-slate-700 dark:text-slate-300 mb-3">{aiAnalysis.overallAssessment}</p>

                                <div className="mb-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                    <span className="block font-bold text-amber-700 dark:text-amber-500 mb-1">Bottleneck Check:</span>
                                    <span className="text-amber-900 dark:text-amber-400">{aiAnalysis.bottleneckWarning}</span>
                                </div>

                                {aiAnalysis.suggestedUpgrades?.length > 0 && (
                                    <div>
                                        <span className="block font-bold text-slate-900 dark:text-slate-100 mb-1">Suggested Additions:</span>
                                        <ul className="list-disc pl-4 text-slate-600 dark:text-slate-400 space-y-1">
                                            {aiAnalysis.suggestedUpgrades.map((upgrade, idx) => (
                                                <li key={idx}>{upgrade}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex flex-col gap-3">
                            {currentBuild.length > 0 && !aiAnalysis && (
                                <button
                                    onClick={handleAnalyzeBuild}
                                    disabled={isAnalyzing}
                                    className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 bg-[length:200%_auto] hover:bg-right disabled:from-slate-400 disabled:to-slate-400 dark:disabled:from-slate-700 dark:disabled:to-slate-700 text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:shadow-none transition-all duration-500 flex items-center justify-center gap-3"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Analyzing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                            </svg>
                                            <span>Run AI Build Analysis</span>
                                        </>
                                    )}
                                </button>
                            )}

                            <div className="flex gap-3">
                                <button onClick={handleSaveBuild} disabled={isSaving || currentBuild.length === 0} className="flex-grow bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-400 text-white font-bold py-3 rounded-lg transition-all">
                                    {isSaving ? "Saving..." : "Save Build"}
                                </button>

                                {currentBuild.length > 0 && (
                                    <button onClick={clearBuild} className="px-4 bg-slate-200 hover:bg-red-500 text-slate-700 hover:text-white font-bold py-3 rounded-lg transition-all">
                                        Reset
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}