import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';

export async function GET(req: Request) {
  if (!isFirebaseConfigured) {
    console.warn('[Firebase] Firestore is not configured. Returning empty about cards list.');
    return NextResponse.json({ success: true, data: [] });
  }

  try {
    const { searchParams } = new URL(req.url);
    const showAll = searchParams.get('all') === 'true';

    const cardsRef = collection(db, 'about_cards');
    const snapshot = await getDocs(cardsRef);
    
    let cards = snapshot.docs.map(doc => {
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

    if (cards.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    if (!showAll) {
      cards = cards.filter((card: any) => card.isActive === true);
    }

    cards.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); // sort ascending for display order

    return NextResponse.json({ success: true, data: cards });
  } catch (error: any) {
    console.error('Error fetching about cards:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to fetch about cards' }, { status: 500 });
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
    const cardsRef = collection(db, 'about_cards');

    const data = {
      image: body.image || '',
      title: body.title || 'Untitled',
      description: body.description || '',
      isActive: true,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(cardsRef, data);
    const newCard = {
      _id: docRef.id,
      id: docRef.id,
      ...data,
      createdAt: data.createdAt.toDate().toISOString()
    };

    return NextResponse.json({ success: true, data: newCard }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating about card:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to create about card' }, { status: 400 });
  }
}
