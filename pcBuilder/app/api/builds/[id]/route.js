import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const resolvedParams = await params;
        const buildId = resolvedParams.id;

        const client = await clientPromise;
        const db = client.db("wacky_pc_db");

        const result = await db.collection("builds").deleteOne({
            _id: new ObjectId(buildId),
            userEmail: session.user.email
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Build not found or you don't have permission to delete it" }, { status: 404 });
        }

        return NextResponse.json({ message: "Build deleted successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Failed to delete build", error);
        return NextResponse.json({ error: "Failed to delete build" }, { status: 500 });
    }
}