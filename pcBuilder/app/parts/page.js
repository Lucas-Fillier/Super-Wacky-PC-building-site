import clientPromise from '../../lib/mongodb';
import PartImage from '../../components/PartImage';
import Link from "next/link";
import {ObjectId} from "mongodb";
import {revalidatePath} from "next/cache";

export default async function BrowseParts() {
    async function deletePart(formData){
        "use server";
        const id = formData.get("id");
        const client = await clientPromise;
        const db = client.db("wacky_pc_db");
        await db.collection('parts').deleteOne( { _id: new ObjectId(id)});
        revalidatePath('/parts')

    }
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

            <section className="bg-white dark:bg-slate-950 py-20 px-6 border-b border-slate-200 dark:border-slate-800 text-center transition-colors duration-200">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">
                        Hardware <span className="text-emerald-600 dark:text-emerald-400">Inventory</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-10">
                        Browse our extensive collection of high-performance components and incredibly questionable prototypes.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto py-12 px-6 w-full flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    {categories.map((category) => (
                        <div key={category} className="mb-16">
                            <div className="flex items-center mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{category}</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {groupedParts[category].map((part) => (
                                    <div key={part._id?.toString() || part.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
                                        <PartImage part={part} />
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-2">{part.category}</div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{part.name}</h3>
                                        <p className="text-xs text-slate-500 mb-6 flex-grow">{part.specs}</p>
                                        <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                                            <span className="text-xl font-bold text-emerald-600">{part.price}</span>
                                            <div className="flex gap-2">
                                                <button className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-emerald-500 dark:hover:bg-emerald-500 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-slate-950 rounded-md transition-colors text-sm font-medium">
                                                    + Add
                                                </button>
                                                <form action={deletePart}>
                                                    <input type="hidden" name="id" value={part._id?.toString() || part.id} />
                                                    <button
                                                        type="submit"
                                                        className="p-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-500 dark:hover:bg-red-500 text-red-700 dark:text-red-400 hover:text-white dark:hover:text-white rounded-md transition-colors text-sm font-medium">
                                                        Delete
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <aside className="lg:w-1/3">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-xl sticky top-6">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                            Inventory Tools
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                            Have a new part design? Add it to the official database now.
                        </p>
                        <Link
                            href="/add-part"
                            className="w-full block text-center py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all">
                            Add Component
                        </Link>
                    </div>
                </aside>
            </div>
    </main>
)};
