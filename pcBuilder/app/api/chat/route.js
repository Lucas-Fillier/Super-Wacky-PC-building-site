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
    message: z.string().describe("The support response to the user's question."),
    suggestedLink: z.string().describe("A relevant URL path on our site to direct them to (e.g., '/build', '/dashboard', or '/login'). Return an empty string if no link is needed."),
    ticketCategory: z.string().describe("Categorize the issue: 'Account/Login', 'Shipping/Returns', 'Site Navigation', or 'General Help'")
});

export async function POST(request) {
    try {
        const { chatHistory } = await request.json();

        if (!chatHistory || chatHistory.length === 0) {
            return NextResponse.json({ error: "No chat history provided." }, { status: 400 });
        }

        const SYSTEM_PROMPT = `You are the Customer Support Agent for the "Super Wacky PC Building Site". Your job is to help users navigate the site, understand policies, and troubleshoot their accounts. Do not analyze hardware or build PCs—tell users to use the "Auto-Builder" tool for that.

        SITE KNOWLEDGE BASE:
        - Navigation: The custom PC builder is located at "/build". Saved builds are on the "/dashboard".
        - Shipping Policy: We ship all parts via high-speed catapult within 3-5 business days. 
        - Return Policy: We accept returns within 30 days, provided the components have not been melted, exploded, or covered in mayonnaise.
        - Compatibility: If a user asks why parts are incompatible, explain that our Wacky Builder checks socket types, form factors, and power draw automatically.
        - Account Issues: Users must be logged in via Google to save their builds.
        
        IMPORTANT FORMATTING RULE:
        Never include raw URL paths (like "/build" or "/dashboard") directly in your conversational message string. Use natural language instead (e.g., "head over to our builder page") and let the 'suggestedLink' field handle providing the actual URL path.`;

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