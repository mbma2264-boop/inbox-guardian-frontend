import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const FALLBACK_GOOGLE_CLIENT_ID = '643505127014-t43qjj12sfnc4emoci8l5pc1ue8880iop.apps.googleusercontent.com';

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID || FALLBACK_GOOGLE_CLIENT_ID;
  const baseUrl = process.env.NEXTAUTH_URL || new URL(request.url).origin;
  const redirectUri = `${baseUrl}/api/gmail/oauth/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'openid',
      'email',
      'profile',
      'https://www.googleapis.com/auth/gmail.readonly'
    ].join(' ')
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
}
