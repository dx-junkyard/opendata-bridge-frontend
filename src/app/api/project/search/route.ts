import { ProjectEntity } from '@/lib/generated/client';
import { Project } from '@/types/project';
import { Dataset } from '@/types/dataset';
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

  const response: ProjectEntity[] = await searchProject(query, tags);

  const json: Project[] = response.map((project) => {
    const projectAttribute = project?.attributes;
    const resources: Dataset[] =
      (projectAttribute?.resources?.data || []).map((attribute) => {
        return {
          title: attribute?.attributes?.title || '',
          url: attribute?.attributes?.url || '',
          organization: '',
        };
      }) || [];

    return {
      id: project.id || '',
      title: projectAttribute?.title || '',
      description: projectAttribute?.description || '',
      tags:
        projectAttribute?.tags?.data
          ?.map((tag) => tag.attributes?.title || '')
          .filter((tag) => tag !== '') || [],
      thumbnails: projectAttribute?.thumbnail
        ? projectAttribute?.thumbnail.data.map(
            (data) => data?.attributes?.url || ''
          )
        : [],
      resources,
      recipe: projectAttribute?.recipe || '',
      prompt: projectAttribute?.prompt || '',
      updatedAt:
        projectAttribute?.updatedAt.split('T')[0].replace(/-/g, '/') || '',
    };
  });

  return new Response(JSON.stringify(json), {
    status: 200,
  });
}
