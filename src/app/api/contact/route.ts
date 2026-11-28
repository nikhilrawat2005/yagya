import { NextResponse } from 'next/server';
import { validateContactForm } from '@/lib/validation/forms';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    const payload = {
      name: String(body?.name ?? ''),
      email: String(body?.email ?? ''),
      message: String(body?.message ?? ''),
    };

    const errors = validateContactForm(payload);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, errors, message: 'Please correct the highlighted fields.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      receivedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Invalid request payload.' },
      { status: 400 }
    );
  }
}
