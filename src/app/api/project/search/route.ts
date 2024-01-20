import { searchProject } from '@/service/search-project-service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/auth-options';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  const isGuest =
    (process.env.PRIVATE_MODE === 'true' && !session?.user?.name) || false;

  if (isGuest) {
    return new Response(
      JSON.stringify({
        status: 401,
      }),
      {
        status: 401,
      }
    );
  }

  console.info('GET ' + req.url);

  const { searchParams } = new URL(req.url);

  const query = searchParams.get('q')
    ? (searchParams.get('q') as string).replace('　', ' ')
    : '';

  const tags = searchParams.get('tag')
    ? (searchParams.get('tag') as string).split(',')
    : [];

  const response = await searchProject(query, tags);

  return new Response(JSON.stringify(response), {
    status: 200,
  });
}
