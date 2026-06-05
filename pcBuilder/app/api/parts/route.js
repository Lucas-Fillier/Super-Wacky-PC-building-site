
import { NextResponse } from 'next/server';
import { pcParts } from '@/data/parts';

export async function GET() {

    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json(pcParts);
}