import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, where, Timestamp } from 'firebase/firestore';

export async function GET(req: Request) {
    if (!isFirebaseConfigured) {
        console.warn('[Firebase] Firestore is not configured. Returning empty announcements list.');
        return NextResponse.json({ success: true, data: [] });
    }

    try {
        const { searchParams } = new URL(req.url);
        const showAll = searchParams.get('all') === 'true';

        const announcementsRef = collection(db, 'announcements');
        const q = showAll ? announcementsRef : query(announcementsRef, where('isActive', '==', true));

        const snapshot = await getDocs(q);
        const announcements = snapshot.docs.map(doc => {
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

        // Sort in memory: priority desc first, then createdAt desc
        announcements.sort((a: any, b: any) => {
            const priorityDiff = (Number(b.priority) || 0) - (Number(a.priority) || 0);
            if (priorityDiff !== 0) return priorityDiff;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        return NextResponse.json({ success: true, data: announcements });
    } catch (error: any) {
        console.error('Error fetching announcements:', error);
        return NextResponse.json({ success: false, error: error.message || 'Failed to fetch announcements' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    if (!isFirebaseConfigured) {
        return NextResponse.json({ success: false, error: 'Firebase is not configured' }, { status: 503 });
    }

    const isAuthenticated = await verifyAuth();
    if (!isAuthenticated) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const announcementsRef = collection(db, 'announcements');
        
        const data = {
            text: body.text,
            link: body.link || '',
            label: body.label || 'New',
            isActive: true,
            priority: Number(body.priority) || 0,
            createdAt: Timestamp.now(),
        };

        const docRef = await addDoc(announcementsRef, data);
        const newAnnouncement = {
            _id: docRef.id,
            id: docRef.id,
            ...data,
            createdAt: data.createdAt.toDate().toISOString()
        };

        return NextResponse.json({ success: true, data: newAnnouncement }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating announcement:', error);
        return NextResponse.json({ success: false, error: error.message || 'Failed to create announcement' }, { status: 400 });
    }
}
