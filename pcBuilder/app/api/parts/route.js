
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

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