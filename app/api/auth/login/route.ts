import { NextRequest, NextResponse } from 'next/server';
import { signJwt } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const login = body?.login;
  const password = body?.password;

  const expectedLogin = process.env.ADMIN_LOGIN || 'admin';
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (login !== expectedLogin || password !== expectedPassword) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = signJwt({ sub: 'admin-user', login });

  const response = NextResponse.json({ ok: true });
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24
  });

  return response;
}
