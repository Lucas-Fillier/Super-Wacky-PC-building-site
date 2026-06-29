export default function AddPartPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-6 transition-colors duration-200">

            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">

                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6 text-center">
                    Add <span className="text-emerald-500">Component</span>
                </h1>

                <form action="/api/parts" method="POST" className="flex flex-col gap-5">

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Component Name</label>
                        <input
                            name="partName"
                            placeholder="e.g., Quantum Flux Capacitor"
                            required
                            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Category</label>
                        <input
                            name="partCategory"
                            placeholder="e.g., GPU, CPU"
                            required
                            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Price</label>
                        <input
                            name="partPrice"
                            placeholder="e.g., $9,999.99"
                            required
                            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Specs and details</label>
                        <textarea
                            name="partSpecs"
                            placeholder="e.g., Requires a dedicated nuclear substation to operate."
                            rows="3"
                            required
                            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Image URL</label>
                        <input
                            name="partImage"
                            placeholder="Image URL (e.g., from Imgur)"
                            required
                            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-lg shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
                    >
                        Submit to Database
                    </button>

                </form>
            </div>
        </main>
    );
}