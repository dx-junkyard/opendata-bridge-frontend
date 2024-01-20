import { searchDataset } from '@/service/search-dataset-service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/auth-options';

export async function GET(req: Request) {
  console.info('GET ' + req.url);

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

  const response = await searchDataset();

  return new Response(JSON.stringify(response), {
    status: 200,
  });
}
