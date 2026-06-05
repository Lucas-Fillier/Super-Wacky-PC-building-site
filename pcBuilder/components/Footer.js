export default function Footer() {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 mt-12 py-8 text-center text-slate-500 dark:text-slate-500 text-sm bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
            <p>&copy; {new Date().getFullYear()} Super Wacky PC Builder. All rights reserved.</p>
        </footer>
    );
}