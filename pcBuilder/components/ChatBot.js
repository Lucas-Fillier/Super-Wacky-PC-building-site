"use client";

import { useState, useRef, useEffect } from "react";
import Link from 'next/link';

export default function PCChatbot() {
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            message: "Welcome to Wacky Support! I can help you find your saved builds, navigate the site, or explain our bizarre shipping policies. What do you need help with?",
            ticketCategory: "General Help",
            suggestedLink: ""
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { sender: "user", message: input };
        const updatedHistory = [...messages, userMessage];

        setMessages(updatedHistory);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatHistory: updatedHistory }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to talk to PC Guru");

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
                { sender: "bot", message: "My thermal paste melted! Something went wrong generating that response.", dangerRating: "Error" }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto w-full bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden flex flex-col h-[600px]">
            <div className="bg-emerald-600 dark:bg-emerald-500 p-4 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    🤖 Wacky PC Guru
                </h2>
                <span className="text-xs bg-emerald-700 dark:bg-emerald-600 px-3 py-1 rounded-full font-semibold">
                    Powered by Groq AI
                </span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-900">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                        <div className={`max-w-[85%] rounded-2xl p-4 text-sm shadow-sm ${msg.sender === "user" ? "bg-emerald-600 text-white rounded-br-none" : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none"}`}>
                            <p className="whitespace-pre-wrap">{msg.message}</p>
                            {msg.sender === "bot" && msg.ticketCategory && (
                                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                                    <div className="flex items-center gap-2 flex-wrap text-xs">
                            <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold px-2 py-0.5 rounded">
                                🏷️ Category: {msg.ticketCategory}
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
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about CPUs, GPUs, compatibility..."
                    className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-5 py-2 rounded-lg font-bold transition-all"
                >
                    {isLoading ? "..." : "Send"}
                </button>
            </form>
        </div>
    );
}
