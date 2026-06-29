
import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
    try {

        const resolvedParams = await params;

        const client = await clientPromise;
        const db = client.db("wacky_pc_db");

        const part = await db.collection("parts").findOne({
            _id: new ObjectId(resolvedParams.id)
        });

        if (!part) return NextResponse.json({ error: "Part not found" }, { status: 404 });

        return NextResponse.json(part);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch part" }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const resolvedParams = await params;

        const body = await request.json();
        const { _id, ...updateData } = body;

        const client = await clientPromise;
        const db = client.db("wacky_pc_db");

        const result = await db.collection("parts").updateOne(
            { _id: new ObjectId(resolvedParams.id) },
            { $set: updateData }
        );

        return NextResponse.json({ message: "Part updated successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Failed to update part", error);
        return NextResponse.json({ error: "Failed to update part" }, { status: 500 });
    }
}