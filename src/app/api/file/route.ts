import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/auth-options';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: Request) {
  console.info('GET ' + req.url);

  const session = await getServerSession(authOptions);

  const isGuest = !session?.user?.name;

  if (isGuest) {
    return new Response(
      JSON.stringify({
        status: 403,
      }),
      {
        status: 403,
      }
    );
  }

  const response = await fetch(
    `${process.env.CHAT_API || ''}/api/download/${session.user?.name}`
  ).then((res) => res.blob());

  return new Response(response, {
    status: 200,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${uuidv4()}`,
    },
  });
}
