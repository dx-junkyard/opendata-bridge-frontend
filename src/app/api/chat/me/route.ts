// auth.jsでtokenを取得するAPI

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/auth-options';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.info(token);

  return new Response('{}', { status: 200 });
}
