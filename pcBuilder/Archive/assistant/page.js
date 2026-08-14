import PCChatbot from '../../components/ChatBot';

export default function AssistantPage() {
    return (
        <main className="min-h-screen py-12 px-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <h1 className="text-4xl font-extrabold text-center text-slate-900 dark:text-white mb-2">
                    AI Hardware <span className="text-emerald-600 dark:text-emerald-400">Assistant</span>
                </h1>
                <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
                    Get real-time advice, compatibility checks, and wacky tips from our resident AI guru.
                </p>
                <PCChatbot />
            </div>
        </main>
    );
}