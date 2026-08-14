"use client";

import { useState, useRef, useEffect } from "react";
import Link from 'next/link';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            message: "Welcome to Wacky Support! I can help you find your saved builds, navigate the site, or explain our bizarre shipping policies. What do you need help with?",
            ticketCategory: "General Help",
            suggestedLink: ""
        }
    ]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setIsLoading(true);

        setMessages((prev) => [...prev, { sender: "user", message: userMessage }]);

        try {
            const chatHistoryForAPI = messages.map(msg => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.message
            }));
            chatHistoryForAPI.push({ role: "user", content: userMessage });

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatHistory: chatHistoryForAPI }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to talk to Support Bot");

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    message: data.reply.message,
                    ticketCategory: data.reply.ticketCategory,
                    suggestedLink: data.reply.suggestedLink
                }
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    message: "My thermal paste melted! Something went wrong generating that response.",
                    ticketCategory: "Error",
                    suggestedLink: ""
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 group"
                aria-label="Open support chat"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z" />
                </svg>
                <span className="absolute right-16 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:inline">
                    Wacky Support
                </span>
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] h-[500px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
            <div className="p-4 bg-emerald-600 dark:bg-emerald-700 text-white flex justify-between items-center shadow-sm">
                <div>
                    <h3 className="font-bold text-sm tracking-wide">Wacky Support Desk</h3>
                    <p className="text-[10px] text-emerald-100">Online & ready to navigate</p>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-emerald-500 dark:hover:bg-emerald-600 rounded-lg transition-colors"
                    aria-label="Close chat"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-900">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                        <div className={`max-w-[85%] rounded-2xl p-4 text-sm shadow-sm ${msg.sender === "user" ? "bg-emerald-600 text-white rounded-br-none" : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none"}`}>
                            <p className="whitespace-pre-wrap">{msg.message}</p>
                            {msg.sender === "bot" && msg.ticketCategory && (
                                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                                    <div className="flex flex-wrap items-center gap-3 text-xs">
                                        <span className="inline-flex items-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-600 shadow-sm">
                                            🏷️ {msg.ticketCategory}
                                        </span>
                                        {msg.suggestedLink && (
                                            <Link href={msg.suggestedLink} className="inline-flex items-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 font-bold px-3 py-1.5 rounded-md border border-emerald-200 dark:border-emerald-800/50 shadow-sm hover:bg-emerald-200 dark:hover:bg-emerald-800/50 hover:-translate-y-0.5 transition-all cursor-pointer capitalize">
                                                🔗 Go to {msg.suggestedLink.replace('/', '')}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex items-start">
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl text-xs text-slate-500 dark:text-slate-400 animate-pulse">
                            Consulting dashboard archives...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about shipping, saving builds..."
                    className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-4 py-1.5 text-sm rounded-lg font-bold transition-all"
                >
                    {isLoading ? "..." : "Send"}
                </button>
            </form>
        </div>
    );
}