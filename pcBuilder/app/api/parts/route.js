
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import {revalidatePath} from "next/cache";

export async function GET() {
    try {
        const client = await clientPromise;

        const db = client.db("wacky_pc_db");

        const parts = await db.collection("parts").find({}).toArray();

        return NextResponse.json(parts);
    } catch (error) {
        console.error("Database connection failed", error);
        return NextResponse.json({ error: "Failed to fetch hardware data" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("wacky_pc_db");

        const formData = await request.formData();
        const name = formData.get('partName');
        const category = formData.get('partCategory');
        const price = formData.get('partPrice');
        const specs = formData.get('partSpecs');

        await db.collection('parts').insertOne({
            name,
            category,
            price,
            specs,
            createdAt: new Date()
        });

        revalidatePath('/parts');

        return Response.redirect(new URL('/parts', request.url), 303);
    } catch (error) {
        console.error("Database entry error:", error);
        return NextResponse.json({error: "Failed to save new component"}, {status: 500});
    }
}

