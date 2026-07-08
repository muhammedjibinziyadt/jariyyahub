import { NextResponse } from 'next/server';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const SETTINGS_FILE_PATH = path.join(process.cwd(), 'src/lib/settings.json');

const DEFAULT_SETTINGS = {
  upiId: '',
  targetAmount: 0,
  raisedAmount: 0
};

let memorySettings = { ...DEFAULT_SETTINGS };

async function getSettings() {
  if (isFirebaseConfigured) {
    try {
      const docRef = doc(db, 'settings', 'donation');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          upiId: data.upiId || DEFAULT_SETTINGS.upiId,
          targetAmount: Number(data.targetAmount) || DEFAULT_SETTINGS.targetAmount,
          raisedAmount: Number(data.raisedAmount) || DEFAULT_SETTINGS.raisedAmount,
        };
      }
    } catch (e) {
      console.error('Error fetching settings from Firestore:', e);
    }
  }

  // Fallback 1: Local file
  try {
    if (fs.existsSync(SETTINGS_FILE_PATH)) {
      const fileData = fs.readFileSync(SETTINGS_FILE_PATH, 'utf-8');
      return JSON.parse(fileData);
    }
  } catch (e) {
    console.error('Error reading settings file:', e);
  }

  // Fallback 2: Memory
  return memorySettings;
}

async function saveSettings(settings: any) {
  if (isFirebaseConfigured) {
    try {
      const docRef = doc(db, 'settings', 'donation');
      await setDoc(docRef, settings, { merge: true });
      return true;
    } catch (e) {
      console.error('Error saving settings to Firestore:', e);
    }
  }

  // Fallback 1: Local file
  try {
    const dir = path.dirname(SETTINGS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SETTINGS_FILE_PATH, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing settings file:', e);
  }

  // Fallback 2: Memory
  memorySettings = { ...settings };
  return true;
}

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({ success: true, data: settings });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const current = await getSettings();

    const updated = {
      upiId: body.upiId !== undefined ? body.upiId : current.upiId,
      targetAmount: body.targetAmount !== undefined ? Number(body.targetAmount) : current.targetAmount,
      raisedAmount: body.raisedAmount !== undefined ? Number(body.raisedAmount) : current.raisedAmount,
    };

    await saveSettings(updated);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
