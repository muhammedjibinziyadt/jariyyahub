import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-this';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
        }

        let authenticated = false;
        let userUid = '';
        let userEmail = '';

        if (!isFirebaseConfigured) {
            // Local dev mode fallback bypass:
            if (email === 'admin@jariyya.hub' && password === 'jariyya-hub-admin-124') {
                authenticated = true;
                userUid = 'dummy-local-admin-uid';
                userEmail = 'admin@jariyya.hub';
                console.log('[Firebase] Running in Local Bypass Mode (Firebase not configured). Accepted fallback admin credentials.');
            } else {
                return NextResponse.json({ 
                    success: false, 
                    error: 'Firebase is not configured. Use local credentials: admin@jariyya.hub / jariyya-hub-admin-124' 
                }, { status: 401 });
            }
        } else {
            // Sign in with Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            authenticated = true;
            userUid = user.uid;
            userEmail = user.email || '';
        }

        if (authenticated) {
            // Create JWT
            const token = await new SignJWT({ 
                role: 'admin',
                uid: userUid,
                email: userEmail
            })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('24h')
                .sign(new TextEncoder().encode(JWT_SECRET));

            // Set cookie
            const cookieStore = await cookies();
            cookieStore.set('admin_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
    }
}
