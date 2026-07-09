import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isFirebaseConfigured) {
    return NextResponse.json({ success: false, error: 'Firebase is not configured' }, { status: 503 });
  }

  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const docRef = doc(db, 'about_cards', id);

    // Filter out undefined values
    const updateData: any = {};
    if (body.isActive !== undefined) updateData.isActive = body.isActive;
    if (body.image !== undefined) updateData.image = body.image;
    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;

    await updateDoc(docRef, updateData);

    return NextResponse.json({ success: true, data: { id, ...updateData } });
  } catch (error: any) {
    console.error('Error updating about card:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to update about card' }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isFirebaseConfigured) {
    return NextResponse.json({ success: false, error: 'Firebase is not configured' }, { status: 503 });
  }

  const isAuthenticated = await verifyAuth();
  if (!isAuthenticated) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const docRef = doc(db, 'about_cards', id);
    await deleteDoc(docRef);

    return NextResponse.json({ success: true, data: { id } });
  } catch (error: any) {
    console.error('Error deleting about card:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to delete about card' }, { status: 400 });
  }
}
