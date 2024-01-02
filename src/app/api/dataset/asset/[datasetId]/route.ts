import { getDataset } from '@/service/get-dataset-service';
import fetchAsset from '@/service/fetch-asset';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { datasetId: string };
  }
) {
  console.info('GET ' + req.url);

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
