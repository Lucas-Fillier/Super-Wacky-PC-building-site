import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
    title: 'Super Wacky PC Builder',
    description: 'Select your components, check compatibility, and optimize your setup.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className="bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50 font-sans min-h-screen flex flex-col transition-colors duration-200">
        <Navbar />
        {children}
        </body>
        </html>
    );
}