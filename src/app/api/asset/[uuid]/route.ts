import fetchAsset from '@/service/fetch-asset';
import { getUpload } from '@/service/get-upload-service';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { uuid: string };
  }
) {
  console.info('GET ' + req.url);

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
