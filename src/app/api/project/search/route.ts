import { searchProject } from '@/service/search-project-service';

export async function GET(req: Request) {
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
