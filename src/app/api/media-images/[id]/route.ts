import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!isFirebaseConfigured) {
        return NextResponse.json({ success: false, error: 'Firebase is not configured' }, { status: 503 });
    }

    const isAuthenticated = await verifyAuth();
    if (!isAuthenticated) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;
        const docRef = doc(db, 'media_images', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

        await deleteDoc(docRef);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting image:', error);
        return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!isFirebaseConfigured) {
        return NextResponse.json({ success: false, error: 'Firebase is not configured' }, { status: 503 });
    }

    const isAuthenticated = await verifyAuth();
    if (!isAuthenticated) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;
        const body = await req.json();

        const docRef = doc(db, 'media_images', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

        const updateData: Record<string, any> = {};
        if (body.src !== undefined) updateData.src = body.src;
        if (body.title !== undefined) updateData.title = body.title;
        if (body.desc !== undefined) updateData.desc = body.desc;
        if (body.isActive !== undefined) updateData.isActive = body.isActive;

        await updateDoc(docRef, updateData);

        const updatedSnap = await getDoc(docRef);
        const updatedData = updatedSnap.data();

        let createdAtStr = new Date().toISOString();
        if (updatedData?.createdAt) {
            if (typeof updatedData.createdAt.toDate === 'function') {
                createdAtStr = updatedData.createdAt.toDate().toISOString();
            } else if (updatedData.createdAt instanceof Date) {
                createdAtStr = updatedData.createdAt.toISOString();
            } else {
                createdAtStr = new Date(updatedData.createdAt).toISOString();
            }
        }

        return NextResponse.json({
            success: true,
            data: {
                _id: id,
                id: id,
                ...updatedData,
                createdAt: createdAtStr
            }
        });
    } catch (error: any) {
        console.error('Error updating image:', error);
        return NextResponse.json({ success: false, error: error.message || 'Failed to update image' }, { status: 400 });
    }
}
