import Link from "next/link";
import clientPromise from '../lib/mongodb';
import PartImage from '../components/PartImage';

export default async function Home() {
    const client = await clientPromise;
    const db = client.db("wacky_pc_db");

    const featuredParts = await db.collection("parts").find({}).limit(4).toArray();

    return (
        <main>
            <section className="flex flex-col items-center justify-center py-24 px-4 text-center bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 transition-colors duration-200">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 dark:text-white">
                    Build Your Dream <span className="text-emerald-600 dark:text-emerald-400">Machine.</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-10">
                    Select your components, check compatibility, and optimize your setup. From budget builds to enthusiast water-cooled rigs, piece it together here.
                </p>
                <Link href="/build" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white dark:text-slate-950 text-lg font-bold rounded-lg shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                    Start System Builder
                </Link>
            </section>
            <section className="max-w-7xl mx-auto py-16 px-6">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Trending Hardware</h2>
                    <Link href="/parts" className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold cursor-pointer hover:underline">View All Components &rarr;</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredParts.map((part) => (
                        <div key={part._id?.toString() || part.id} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 transition-colors group cursor-pointer shadow-sm flex flex-col">
                            <PartImage part = {part}/>
                            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{part.category}</div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 truncate" title={part.name}>{part.name}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 h-8">{part.specs}</p>
                            <div className="flex justify-between items-center mt-auto">
                                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{part.price}</span>
                                <button className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-emerald-500 dark:hover:bg-emerald-500 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-slate-950 rounded-md transition-colors text-sm font-medium">
                                    + Add
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}