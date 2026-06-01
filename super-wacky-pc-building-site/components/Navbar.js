import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="relative flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950">
            <div className="text-2xl font-bold text-emerald-400 tracking-tight">Super Wacky PC Builder</div>

            <ul className="absolute left-1/2 -translate-x-1/2 flex space-x-6 text-sm font-medium text-slate-300">
                <Link href="/" className="hover:text-emerald-400 cursor-pointer transition-colors">Home</Link>
                <Link href="/build" className="hover:text-emerald-400 cursor-pointer transition-colors">Start a Build</Link>
                <Link href="/parts" className="hover:text-emerald-400 cursor-pointer transition-colors">Browse Parts</Link>
                <Link href="/contact" className="hover:text-emerald-400 cursor-pointer transition-colors">Contact</Link>
            </ul>

            <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-md font-semibold transition-colors">
                Sign In
            </button>
        </nav>
    );
}