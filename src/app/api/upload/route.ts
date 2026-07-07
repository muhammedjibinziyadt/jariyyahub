import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function POST(req: Request) {
    // 1. Check Auth
    const isAuthenticated = await verifyAuth();
    if (!isAuthenticated) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    // 2. Check for Vercel Blob Token
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.error('BLOB_READ_WRITE_TOKEN is missing in environment variables');
        return NextResponse.json({
            success: false,
            error: 'Server configuration error: Upload token missing'
        }, { status: 500 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const filename = searchParams.get('filename') || `banner-${Date.now()}.png`;

        // Check if there is a body
        if (!req.body) {
            return NextResponse.json({ success: false, error: 'No file data received' }, { status: 400 });
        }

        // Use arrayBuffer for more reliable handling in serverless functions
        const fileBuffer = await req.arrayBuffer();

        if (fileBuffer.byteLength === 0) {
            return NextResponse.json({ success: false, error: 'Empty file received' }, { status: 400 });
        }

        const blob = await put(filename, fileBuffer, {
            access: 'public',
            contentType: req.headers.get('content-type') || 'image/png'
        });

        console.log('Successfully uploaded to Vercel Blob:', blob.url);
        return NextResponse.json({ success: true, url: blob.url });
    } catch (error: any) {
        console.error('Vercel Blob Upload error:', error);
        return NextResponse.json({
            success: false,
            error: `Upload failed: ${error.message || 'Unknown error'}`
        }, { status: 500 });
    }
}

