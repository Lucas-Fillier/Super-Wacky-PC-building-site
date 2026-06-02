export default function AboutPage() {
        return (
            <main className="min-h-screen bg-slate-900 py-16 px-6 text-slate-100">
                    <div className="max-w-4xl mx-auto space-y-12">

                            <section className="text-center space-y-4">
                                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                                            About <span className="text-emerald-400">Super Wacky PC Builder</span>
                                    </h1>
                                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                                            A smarter way to plan your next gaming rig, built by students for CP4485.
                                    </p>
                            </section>

                            <section className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
                                    <h2 className="text-2xl font-bold text-slate-100 mb-4">Why We Built This</h2>
                                    <p className="text-slate-300 leading-relaxed text-lg mb-8">
                                            We're big into gaming and building PCs, so we decided that as the topic for our Emerging Trends projects, we wanted to make something we'd actually use. Figuring out if your parts are compatible or if a CPU will bottleneck your GPU usually means digging through Reddit threads and articles. We're building this app to put all that info in one clean interface.
                                    </p>

                                    <h3 className="text-xl font-bold text-emerald-400 mb-6">What It Does (Or Will Do Soon!)</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-400/50 transition-colors group">
                                                    <h4 className="font-bold text-slate-100 mb-2 text-lg group-hover:text-emerald-400 transition-colors">⚡ Part Compatibility</h4>
                                                    <p className="text-slate-400 text-sm leading-relaxed">
                                                            Making sure your motherboard actually fits your case and supports your processor so you don't waste money.
                                                    </p>
                                            </div>

                                            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-400/50 transition-colors group">
                                                    <h4 className="font-bold text-slate-100 mb-2 text-lg group-hover:text-emerald-400 transition-colors">📊 Keeping Track of Costs</h4>
                                                    <p className="text-slate-400 text-sm leading-relaxed">
                                                            PC parts get expensive fast. We're adding a way to track your total budget as you add components to your build.
                                                    </p>
                                            </div>

                                            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-400/50 transition-colors group">
                                                    <h4 className="font-bold text-slate-100 mb-2 text-lg group-hover:text-emerald-400 transition-colors">🧠 AI Checkups</h4>
                                                    <p className="text-slate-400 text-sm leading-relaxed">
                                                            Later on we plan on attempting to hook up an AI API to look at your build and warn you if your parts are mismatched.
                                                    </p>
                                            </div>

                                            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-400/50 transition-colors group">
                                                    <h4 className="font-bold text-slate-100 mb-2 text-lg group-hover:text-emerald-400 transition-colors">💾 Saving Builds</h4>
                                                    <p className="text-slate-400 text-sm leading-relaxed">
                                                            Once we hook up the database, you'll be able to log in, save your dream builds, and come back to them later.
                                                    </p>
                                            </div>
                                    </div>
                            </section>
                    </div>
            </main>
        );
}