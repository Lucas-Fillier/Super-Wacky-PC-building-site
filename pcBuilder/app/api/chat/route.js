import { createGroq } from "@ai-sdk/groq";
import { generateText, Output } from "ai";
import { z } from "zod";
import { NextResponse } from "next/server";

const groqApiKey = process.env.GROQ_API_KEY;

if (!groqApiKey) {
    throw new Error("GROQ_API_KEY is not configured");
}

const groqModels = createGroq({
    apiKey: groqApiKey,
});

const chatResponseSchema = z.object({
    message: z.string().min(1).describe("The AI assistant response answering the user PC building question"),
    techTip: z.string().describe("A short hardware tip. MUST return an empty string if a tip is not relevant to the specific prompt."),
    dangerRating: z.string().describe("Humorous risk assessment using NO dash characters. MUST return an empty string if the user is not asking about a specific risky build or action."),
    suggestedCategory: z.string().describe("Component category related to prompt like CPU, GPU, Cooling, or General")
});

export async function POST(request) {
    try {
        const { chatHistory } = await request.json();

        if (!chatHistory || chatHistory.length === 0) {
            return NextResponse.json({ error: "No chat history provided." }, { status: 400 });
        }

        const SYSTEM_PROMPT = `You are "Wacky PC Guru", an expert yet humorous PC building assistant on a PC building website. Answer user questions about custom PC building, hardware compatibility, cooling, and specs. Be helpful, witty, and enthusiastic about hardware.
        IMPORTANT: Only provide a techTip and dangerRating if the user is explicitly asking about a specific build, a compatibility check, or doing something potentially risky. If they are just asking for general recommendations, return empty strings ("") for those fields.`;

        const result = await generateText({
            model: groqModels("openai/gpt-oss-20b"),
            system: SYSTEM_PROMPT,
            prompt: `Here is the conversation history with the user:
            ${JSON.stringify(chatHistory, null, 2)}`.trim(),
            output: Output.object({
                name: "pc_assistant_response",
                description: "Structured chat response from the PC Assistant",
                schema: chatResponseSchema,
            }),
            maxRetries: 0,
            providerOptions: {
                groq: {
                    reasoningEffort: "low",
                }
            },
            maxOutputTokens: 2500
        });

        const analysis = result.experimental_output || result.output;

        return NextResponse.json({ reply: analysis });

    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Failed to generate chat response" }, { status: 500 });
    }
}