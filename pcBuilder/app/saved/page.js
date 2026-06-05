
import Link from 'next/link';

export default function SavedPage() {
    return (
        <main className="flex flex-col items-center justify-center flex-grow bg-slate-50 dark:bg-slate-900 transition-colors duration-200 min-h-[70vh] py-12 px-6">

            <div className="bg-white dark:bg-slate-800 p-10 md:p-14 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl text-center max-w-md w-full transition-colors duration-200">

                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6">
                    <svg className="h-12 w-12 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                    Build Saved!
                </h1>

                <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                    Your Super Wacky Rig has been successfully recorded. When the database is hooked up, it will be waiting for you right here.
                </p>

                <div className="flex flex-col gap-4">
                    <Link
                        href="/build"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold py-4 rounded-lg transition-all"
                    >
                        Make Another Build
                    </Link>

                    <Link
                        href="/"
                        className="w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-4 rounded-lg transition-all"
                    >
                        Return to Homepage
                    </Link>
                </div>

            </div>

        </main>
    );
}