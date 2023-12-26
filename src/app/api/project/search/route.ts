import { getSdk, ProjectEntity } from '@/lib/generated/client';
import { gqlClient } from '@/lib/gql-client/gql-client';
import { Project } from '@/types/project';
import { Dataset } from '@/types/dataset';
import {
  fetchProject,
  searchProjectWithQuery,
} from '@/service/search-project-service';

export async function GET(req: Request) {
  console.info('GET ' + req.url);

  const { searchParams } = new URL(req.url);
  const query = (searchParams.get('q') as string) || '';

  const queryList = query.split(/ |　/).map((query) => query.trim());

  const response: ProjectEntity[] = query
    ? await searchProjectWithQuery(queryList)
    : await fetchProject();

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
      name: projectAttribute?.title || '',
      description: projectAttribute?.description || '',
      tags: projectAttribute?.tags || [],
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
