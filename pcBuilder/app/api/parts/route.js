
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

export async function POST(request) {
    try {

        const body = await request.json();

        const client = await clientPromise;

        const db = client.db("wacky_pc_db");

        const result = await db.collection("parts").insertOne(body);

        return NextResponse.json({
            message: "Part successfully added!",
            insertedId: result.insertedId
        }, { status: 201 });

    } catch (error) {
        console.error("Failed to create part", error);
        return NextResponse.json({ error: "Failed to add part to database" }, { status: 500 });
    }
}