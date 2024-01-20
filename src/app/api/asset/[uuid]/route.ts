import fetchAsset from '@/service/fetch-asset';
import { getUpload } from '@/service/get-upload-service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/auth-options';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { uuid: string };
  }
) {
  console.info('GET ' + req.url);

  const session = await getServerSession(authOptions);

  const isGuest = !session?.user?.name;

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

  const url = await getUpload(params.uuid);

  if (!url) {
    return new Response(JSON.stringify({ status: 404 }), {
      status: 404,
    });
  }

  const asset = await fetchAsset(url);

  return new Response(asset, {
    status: 200,
  });
}
