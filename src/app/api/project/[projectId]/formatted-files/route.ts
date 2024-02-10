import fetchAsset from '@/service/fetch-asset';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/auth-options';
import { getProject } from '@/service/get-project-service';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { projectId: string };
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

  const project = await getProject(params.projectId);

  if (!project) {
    return new Response(JSON.stringify({ status: 404 }), {
      status: 404,
    });
  }

  const asset = await fetchAsset(project.formattedFiles[0].url);

  return new Response(asset, {
    status: 200,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(project.formattedFiles[0].name)}`,
    },
  });
}
