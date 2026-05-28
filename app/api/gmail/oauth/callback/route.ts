import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const error = searchParams.get('error');
  const code = searchParams.get('code');

  if (error) {
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(error)}`, origin)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL('/?error=Missing%20authorization%20code', origin)
    );
  }

  const cookieStore = await cookies();
  cookieStore.set('gmail_connected', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30
  });

  return NextResponse.redirect(
    new URL('/?gmail=connected', origin)
  );
}
