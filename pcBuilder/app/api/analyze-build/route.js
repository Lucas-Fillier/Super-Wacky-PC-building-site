import { generateObject } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { z } from 'zod';
import { NextResponse } from 'next/server';

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
    try {
        const { parts } = await request.json();

        const partsList = parts.map(p => `${p.name} (${p.category})`).join(', ');

        const { object } = await generateObject({
            model: groq('openai/gpt-oss-20b'),
            system: "You are a professional, highly knowledgeable PC building expert. Your job is to analyze PC part lists, identify potential bottlenecks, determine the performance tier, and provide helpful, realistic upgrade suggestions.",
            prompt: `Analyze this list of PC parts currently in the user's build: [${partsList}]. Provide a structured, professional assessment.`,

            schema: z.object({
                buildName: z.string().describe('A catchy, professional name for this specific build.'),
                overallAssessment: z.string().describe('A 2-3 sentence professional assessment of the build. Note if any crucial components (like a Motherboard or PSU) are entirely missing from the list.'),
                bottleneckWarning: z.string().describe('Identify any specific bottlenecks (e.g., CPU is too weak for the GPU). If none, state "No significant bottlenecks detected."'),
                performanceTier: z.string().describe('Categorize the build (e.g., Office/Budget, Entry-Level Gaming, Mid-Range, High-End, Enthusiast/Workstation).'),
                suggestedUpgrades: z.array(z.string()).describe('1 to 3 specific suggestions to improve or complete the build.').max(3),
            }),
        });

        return NextResponse.json(object);

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        return NextResponse.json({ error: "Failed to analyze build" }, { status: 500 });
    }
}