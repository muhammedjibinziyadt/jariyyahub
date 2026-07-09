import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';

// Helper to extract YouTube video ID from various link formats
function getYoutubeId(urlOrId: string) {
  if (!urlOrId) return '';
  const clean = urlOrId.trim();
  if (clean.length === 11) return clean; // Already a 11-char ID
  
  // RegEx to extract YouTube ID
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = clean.match(regExp);
  return (match && match[2].length === 11) ? match[2] : clean;
}

export async function GET(req: Request) {
  if (!isFirebaseConfigured) {
    console.warn('[Firebase] Firestore is not configured. Returning empty videos list.');
    return NextResponse.json({ success: true, data: [] });
  }

  try {
    const { searchParams } = new URL(req.url);
    const showAll = searchParams.get('all') === 'true';

    const videosRef = collection(db, 'media_videos');
    const snapshot = await getDocs(videosRef);
    
    let videos = snapshot.docs.map(doc => {
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
    if (videos.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Filter active if not requesting all (non-admin view)
    if (!showAll) {
      videos = videos.filter((v: any) => v.isActive === true);
    }

    // Sort in memory by createdAt descending
    videos.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ success: true, data: videos });
  } catch (error: any) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to fetch videos' }, { status: 500 });
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
    const videosRef = collection(db, 'media_videos');

    const ytId = getYoutubeId(body.youtubeLink || body.youtubeId);
    if (!ytId) {
      return NextResponse.json({ success: false, error: 'Invalid YouTube link or ID' }, { status: 400 });
    }

    const data = {
      youtubeId: ytId,
      title: body.title || 'Untitled Video',
      desc: body.desc || '',
      isActive: true,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(videosRef, data);
    const newVideo = {
      _id: docRef.id,
      id: docRef.id,
      ...data,
      createdAt: data.createdAt.toDate().toISOString()
    };

    return NextResponse.json({ success: true, data: newVideo }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating video:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to create video' }, { status: 400 });
  }
}
