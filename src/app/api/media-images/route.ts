import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';


export async function GET(req: Request) {
  if (!isFirebaseConfigured) {
    console.warn('[Firebase] Firestore is not configured. Returning empty photos list.');
    return NextResponse.json({ success: true, data: [] });
  }

  try {
    const { searchParams } = new URL(req.url);
    const showAll = searchParams.get('all') === 'true';

    const imagesRef = collection(db, 'media_images');
    const snapshot = await getDocs(imagesRef);
    
    let images = snapshot.docs.map(doc => {
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

    // If database is empty, return empty array
    if (images.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Filter active if not requesting all (non-admin view)
    if (!showAll) {
      images = images.filter((img: any) => img.isActive === true);
    }

    // Sort in memory by createdAt descending
    images.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ success: true, data: images });
  } catch (error: any) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to fetch images' }, { status: 500 });
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
    const imagesRef = collection(db, 'media_images');

    const data = {
      src: body.src,
      title: body.title || 'Untitled Photo',
      desc: body.desc || '',
      isActive: true,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(imagesRef, data);
    const newImage = {
      _id: docRef.id,
      id: docRef.id,
      ...data,
      createdAt: data.createdAt.toDate().toISOString()
    };

    return NextResponse.json({ success: true, data: newImage }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating image:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to create image' }, { status: 400 });
  }
}
