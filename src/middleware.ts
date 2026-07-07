
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-this';

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/admin/dashboard')) {
        const token = req.cookies.get('admin_token');

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }

        try {
            await jwtVerify(token.value, new TextEncoder().encode(JWT_SECRET));
            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/admin/dashboard/:path*',
};
