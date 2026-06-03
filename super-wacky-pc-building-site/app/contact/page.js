
export default function Contact() {
    return (
        <main className="flex flex-col flex-grow bg-slate-50 dark:bg-slate-900 transition-colors duration-200 min-h-screen">
            <section className="max-w-3xl mx-auto py-24 px-6 text-center flex-grow w-full">
                <h1 className="text-5xl font-extrabold mb-6 text-slate-900 dark:text-white">
                    Get in <span className="text-emerald-600 dark:text-emerald-400">Touch.</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                    Have a question about a build, need support with a part list, or just want to talk hardware? Reach out to us.
                </p>

                <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl transition-colors duration-200 text-left">
                    <form className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                placeholder="How do I fit a 4090 in a mini-ITX case?"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
                            <textarea
                                id="message"
                                rows="5"
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                                placeholder="Write your message here..."
                            ></textarea>
                        </div>

                        <button
                            type="button"
                            className="w-full bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 text-lg font-bold py-4 rounded-lg shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
                        >
                            Send Message
                        </button>

                    </form>
                </div>
            </section>

        </main>
    );
}