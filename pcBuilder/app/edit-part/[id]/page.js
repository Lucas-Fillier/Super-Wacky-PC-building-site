
"use client";

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EditPart({ params }) {
    const router = useRouter();


    const unwrappedParams = use(params);
    const partId = unwrappedParams.id;

    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '', category: 'CPU', price: '', specs: ''
    });

    useEffect(() => {
        const fetchPart = async () => {
            try {
                const response = await fetch(`/api/parts/${partId}`);
                if (!response.ok) throw new Error('Failed to fetch part data');
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                setStatus({ type: 'error', message: error.message });
            } finally {
                setIsLoading(false);
            }
        };
        fetchPart();
    }, [partId]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch(`/api/parts/${partId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to update database');

            setStatus({ type: 'success', message: 'Part successfully updated!' });
            setTimeout(() => router.push('/parts'), 1500);

        } catch (error) {
            setStatus({ type: 'error', message: error.message });
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div className="text-center py-24 text-slate-500">Loading part data...</div>;

    return (
        <main className="flex flex-col flex-grow bg-slate-50 dark:bg-slate-900 min-h-screen py-16 px-6">
            <div className="max-w-2xl mx-auto w-full bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl">

                <div className="flex justify-between items-center mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Edit Part</h1>
                    <Link href="/parts" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-bold">
                        Cancel
                    </Link>
                </div>

                {status.message && (
                    <div className={`p-4 rounded-lg mb-6 text-sm font-bold ${status.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Part Name</label>
                        <input type="text" id="name" required value={formData.name} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Category</label>
                            <select id="category" value={formData.category} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                                <option value="CPU">CPU</option>
                                <option value="GPU">GPU</option>
                                <option value="Memory">Memory</option>
                                <option value="Motherboard">Motherboard</option>
                                <option value="Power Supply">Power Supply</option>
                                <option value="Case">Case</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="price" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Price</label>
                            <input type="text" id="price" required value={formData.price} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="specs" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Short Specifications</label>
                        <input type="text" id="specs" required value={formData.specs} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-bold py-4 rounded-lg transition-all mt-4">
                        {isSubmitting ? 'Saving...' : 'Update Part'}
                    </button>
                </form>

            </div>
        </main>
    );
}