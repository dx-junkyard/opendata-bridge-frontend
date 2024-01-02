import { searchDataset } from '@/service/search-dataset-service';

export async function GET(req: Request) {
  console.info('GET ' + req.url);

  const response = await searchDataset();

  return new Response(JSON.stringify(response), {
    status: 200,
  });
}
