import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
import prisma from '@/lib/prisma';


export async function POST(req: Request) {
    try {
        const { id, email, firstName, lastName } = await req.json();

        const profile = await prisma.profile.upsert({
            where: { email },
            update: {
                firstName,
                lastName,
            },
            create: {
                id,
                email,
                firstName,
                lastName,
                subscriptionStatus: 'INACTIVE',
            },
        });

        return NextResponse.json(profile);
    } catch (error: any) {
        console.error('Profile Init Error:', error);
        return new NextResponse(error.message, { status: 500 });
    }
}
