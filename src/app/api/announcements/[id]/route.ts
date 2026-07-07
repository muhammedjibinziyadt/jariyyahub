import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!isFirebaseConfigured) {
        return NextResponse.json({ success: false, error: 'Firebase is not configured' }, { status: 503 });
    }

    const isAuthenticated = await verifyAuth();
    if (!isAuthenticated) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;
        const docRef = doc(db, 'announcements', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
        }

        await deleteDoc(docRef);
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        console.error('Error deleting announcement:', error);
        return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!isFirebaseConfigured) {
        return NextResponse.json({ success: false, error: 'Firebase is not configured' }, { status: 503 });
    }

    const isAuthenticated = await verifyAuth();
    if (!isAuthenticated) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;
        const body = await req.json();
        
        const docRef = doc(db, 'announcements', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
        }

        const updateData: Record<string, any> = {};
        if (body.text !== undefined) updateData.text = body.text;
        if (body.link !== undefined) updateData.link = body.link;
        if (body.label !== undefined) updateData.label = body.label;
        if (body.isActive !== undefined) updateData.isActive = body.isActive;
        if (body.priority !== undefined) updateData.priority = Number(body.priority);

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

        const updated = {
            _id: id,
            id: id,
            ...updatedData,
            createdAt: createdAtStr
        };

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error('Error updating announcement:', error);
        return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
    }
}
