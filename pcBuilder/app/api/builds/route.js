import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const client = await clientPromise;
        const db = client.db("wacky_pc_db");

        const userBuilds = await db.collection("builds")
            .find({ userEmail: session.user.email })
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json(userBuilds);
    } catch (error) {
        console.error("Database connection failed", error);
        return NextResponse.json({ error: "Failed to fetch user builds" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        const client = await clientPromise;
        const db = client.db("wacky_pc_db");

        const newBuild = {
            ...body,
            userEmail: session.user.email,
            createdAt: new Date(),
        };

        const result = await db.collection("builds").insertOne(newBuild);

        return NextResponse.json({ message: "Build saved successfully!", insertedId: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error("Failed to save build", error);
        return NextResponse.json({ error: "Failed to save build" }, { status: 500 });
    }
}