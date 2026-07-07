import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, where, orderBy, Timestamp } from 'firebase/firestore';

export async function GET(req: Request) {
    if (!isFirebaseConfigured) {
        console.warn('[Firebase] Firestore is not configured. Returning empty banners list.');
        return NextResponse.json({ success: true, data: [] });
    }

    try {
        const { searchParams } = new URL(req.url);
        const showAll = searchParams.get('all') === 'true';

        const bannersRef = collection(db, 'banners');
        const q = showAll ? bannersRef : query(bannersRef, where('isActive', '==', true));

        const snapshot = await getDocs(q);
        const banners = snapshot.docs.map(doc => {
            const data = doc.data();
            let createdAtStr = new Date().toISOString();
            if (data.createdAt) {
                if (typeof data.createdAt.toDate === 'function') {
                    createdAtStr = data.createdAt.toDate().toISOString();
                } else if (data.createdAt instanceof Date) {
                    createdAtStr = data.createdAt.toISOString();
                } else {
                    createdAtStr = new Date(data.createdAt).toISOString();
                }
            }
            return {
                _id: doc.id,
                id: doc.id,
                ...data,
                createdAt: createdAtStr
            };
        });

        // Sort in memory by createdAt descending to avoid composite index requirements in Firestore
        banners.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json({ success: true, data: banners });
    } catch (error: any) {
        console.error('Error fetching banners:', error);
        return NextResponse.json({ success: false, error: error.message || 'Failed to fetch banners' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    if (!isFirebaseConfigured) {
        return NextResponse.json({ success: false, error: 'Firebase is not configured' }, { status: 503 });
    }

    const isAuthenticated = await verifyAuth();
    if (!isAuthenticated) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await req.json();
        const bannersRef = collection(db, 'banners');

        const data = {
            imageUrl: body.imageUrl,
            link: body.link || '',
            title: body.title || '',
            isActive: true,
            createdAt: Timestamp.now(),
        };

        const docRef = await addDoc(bannersRef, data);
        const newBanner = {
            _id: docRef.id,
            id: docRef.id,
            ...data,
            createdAt: data.createdAt.toDate().toISOString()
        };

        return NextResponse.json({ success: true, data: newBanner }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating banner:', error);
        return NextResponse.json({ success: false, error: error.message || 'Failed to create banner' }, { status: 400 });
    }
}
