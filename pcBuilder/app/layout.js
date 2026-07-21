import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
    title: 'Super Wacky PC Builder',
    description: 'Select your components, check compatibility, and optimize your setup.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50 font-sans min-h-screen flex flex-col transition-colors duration-200">
                <AuthProvider>
                    <Navbar />

                    <main className="flex-grow flex flex-col">
                        {children}
                    </main>

                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}