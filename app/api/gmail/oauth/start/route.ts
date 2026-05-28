import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const baseUrl = process.env.NEXTAUTH_URL || new URL(request.url).origin;

  if (!clientId) {
    return NextResponse.redirect(
      new URL('/?error=Missing%20GOOGLE_CLIENT_ID', baseUrl)
    );
  }

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
