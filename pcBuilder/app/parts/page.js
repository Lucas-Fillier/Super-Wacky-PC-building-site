import clientPromise from '../../lib/mongodb';
import PartImage from '../../components/PartImage';

export default async function BrowseParts() {
    const client = await clientPromise;
    const db = client.db("wacky_pc_db");
    const pcParts = await db.collection("parts").find({}).toArray();

    const groupedParts = pcParts.reduce((acc, part) => {
        if (!acc[part.category]) {
            acc[part.category] = [];
        }
        acc[part.category].push(part);
        return acc;
    }, {});

    const categories = Object.keys(groupedParts);

    return (
        <main className="flex flex-col flex-grow min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">

            <section className="bg-white dark:bg-slate-950 py-16 px-6 border-b border-slate-200 dark:border-slate-800 text-center transition-colors duration-200">
                <h1 className="text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">
                    Hardware <span className="text-emerald-600 dark:text-emerald-400">Inventory</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                    Browse our extensive collection of high-performance components and incredibly questionable prototypes.
                </p>
            </section>

            <div className="max-w-7xl mx-auto py-12 px-6 w-full">

                {categories.map((category) => (
                    <div key={category} className="mb-16">

                        <div className="flex items-center mb-6">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{category}</h2>
                            <div className="flex-grow h-px bg-slate-200 dark:bg-slate-800 ml-6 transition-colors duration-200"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {groupedParts[category].map((part) => (

                                <div key={part._id?.toString() || part.id} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 transition-colors group cursor-pointer flex flex-col shadow-sm">

                                    <PartImage part = {part}/>

                                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{part.category}</div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 leading-tight">{part.name}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 flex-grow">{part.specs}</p>

                                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-200 dark:border-slate-700/50">
                                        <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{part.price}</span>
                                        <button className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-emerald-500 dark:hover:bg-emerald-500 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-slate-950 rounded-md transition-colors text-sm font-medium">
                                            + Add
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>

        </main>
    );
}