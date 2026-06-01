export default function Contact() {
    return (
        <main className="flex flex-col flex-grow">
            <section className="max-w-3xl mx-auto py-24 px-6 text-center flex-grow w-full">
                <h1 className="text-5xl font-extrabold mb-6">
                    Get in <span className="text-emerald-400">Touch.</span>
                </h1>
                <p className="text-lg text-slate-400 mb-12">
                    Have a question about a wacky build, need support with a part list, or just want to talk hardware? Reach out to us.
                </p>

                <div className="bg-slate-800 p-10 rounded-xl border border-slate-700 shadow-lg">
                    <svg className="w-12 h-12 text-emerald-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <h2 className="text-2xl font-semibold mb-2 text-slate-100">Email Support</h2>
                    <p className="text-slate-400 mb-6">
                        We aim to respond to all questions within 24 hours.
                    </p>

                    <a
                        href="mailto:support@superwackypc.com"
                        className="inline-block text-xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors border-b-2 border-emerald-400/30 hover:border-emerald-400 pb-1"
                    >
                        support@superwackypc.com
                    </a>
                </div>
            </section>

            <footer className="border-t border-slate-800 mt-auto py-8 text-center text-slate-500 text-sm bg-slate-950 w-full">
                <p>&copy; {new Date().getFullYear()} Super Wacky PC Builder. All rights reserved.</p>
            </footer>
        </main>
    );
}