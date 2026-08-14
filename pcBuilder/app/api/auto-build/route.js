import { generateObject } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { z } from 'zod';
import { NextResponse } from 'next/server';

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
    try {
        const { tier, inventory } = await request.json();

        const inventoryString = inventory.map(p =>
            `ID: ${p._id || p.id} | Category: ${p.category} | Name: ${p.name} | Price: ${p.price}`
        ).join('\n');

        const { object } = await generateObject({
            model: groq('openai/gpt-oss-20b'),
            system: "You are an expert PC builder. You will be given a target performance tier (Low-End, Mid-Range, High-End) and a list of available parts from a store. Your job is to select exactly one part from the major categories to create a complete build that fits that performance tier.",
            prompt: `Target Performance Tier: ${tier}\n\nAvailable Store Inventory:\n${inventoryString}\n\nSelect a complete PC build from this inventory.`,

            schema: z.object({
                buildName: z.string().describe('A catchy name for this auto-generated build.'),
                explanation: z.string().describe('A 1-2 sentence explanation of why these parts fit the requested tier.'),
                selectedPartIds: z.array(z.string()).describe('An array containing exactly the IDs of the parts you selected from the inventory.'),
            }),
        });

        return NextResponse.json(object);

    } catch (error) {
        console.error("Auto-Build Failed:", error);
        return NextResponse.json({ error: "Failed to generate auto-build" }, { status: 500 });
    }
}