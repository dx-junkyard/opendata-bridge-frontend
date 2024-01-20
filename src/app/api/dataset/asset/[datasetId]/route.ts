import { getDataset } from '@/service/get-dataset-service';
import fetchAsset from '@/service/fetch-asset';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/auth-options';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { datasetId: string };
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

  const dataset = await getDataset(params.datasetId);

  if (!dataset) {
    return new Response(JSON.stringify({ status: 404 }), {
      status: 404,
    });
  }

  const asset = await fetchAsset(dataset.assetUrl);

  return new Response(asset, {
    status: 200,
  });
}
