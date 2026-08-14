"use client";

import { useState } from "react";

export default function PCChatbot() {
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            message: "Hey there! I'm your Wacky PC Guru. Ask me anything about PC hardware, compatibility, or insane cooling setups!",
            dangerRating: "Safe",
            techTip: "Always remember to peel the clear plastic off the CPU cooler bottom!"
        }
    ]);
    const [input, setInput] = useState("");

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { sender: "user", message: input };
        setMessages([...messages, userMessage]);
        setInput("");
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
                    <div
                        key={idx}
                        className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl p-4 text-sm shadow-sm ${
                                msg.sender === "user"
                                    ? "bg-emerald-600 text-white rounded-br-none"
                                    : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none"
                            }`}
                        >
                            <p className="whitespace-pre-wrap">{msg.message}</p>
                            {msg.sender === "bot" && msg.techTip && (
                                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                                    <div className="flex items-center gap-2 flex-wrap text-xs">
                                        <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded">
                                            💡 Tech Tip: {msg.techTip}
                                        </span>
                                        {msg.dangerRating && (
                                            <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 font-bold px-2 py-0.5 rounded">
                                                ⚠️ Risk: {msg.dangerRating}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
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
                    disabled={!input.trim()}
                    className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-5 py-2 rounded-lg font-bold transition-all"
                >
                    Send
                </button>
            </form>
        </div>
    );
}