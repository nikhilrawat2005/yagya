import { NextResponse } from 'next/server';
import { validateCheckoutForm } from '@/lib/validation/forms';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      address?: string;
      city?: string;
      state?: string;
      pincode?: string;
      paymentMethod?: string;
      items?: unknown[];
    };

    const payload = {
      name: String(body?.name ?? ''),
      email: String(body?.email ?? ''),
      phone: String(body?.phone ?? ''),
      address: String(body?.address ?? ''),
      city: String(body?.city ?? ''),
      state: String(body?.state ?? ''),
      pincode: String(body?.pincode ?? ''),
      paymentMethod: String(body?.paymentMethod ?? 'upi'),
    };

    const errors = validateCheckoutForm(payload);
    if (!Array.isArray(body?.items) || body.items.length === 0) {
      errors.items = 'Your harvest bag is empty.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, errors, message: 'Please correct the highlighted checkout fields.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Invalid checkout request payload.' },
      { status: 400 }
    );
  }
}
