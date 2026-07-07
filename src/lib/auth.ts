
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-this';

export async function verifyAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');

    if (!token) {
        return false;
    }

    try {
        const verified = await jwtVerify(token.value, new TextEncoder().encode(JWT_SECRET));
        return verified.payload.role === 'admin';
    } catch (err) {
        return false;
    }
}
