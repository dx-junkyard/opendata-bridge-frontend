import {
  getSdk,
  ProjectEntity,
  ProjectFiltersInput,
} from '@/lib/generated/client';
import { gqlClient } from '@/lib/gql-client/gql-client';
import { Project } from '@/types/project';
import { buildProject } from '@/util/build-project-util';

export const searchProject = async (
  query: string = '',
  tagIds: string[] = [],
  page: number = 1
): Promise<Project[]> => {
  const filterVariables: ProjectFiltersInput = {};

  if (tagIds.length > 0) {
    filterVariables.tags = { id: { in: tagIds } };
  }

  let projectEntities: ProjectEntity[];

  if (query) {
    projectEntities = ((
      await getSdk(gqlClient).searchProject({
        query,
        filterVariables,
        page,
      })
    ).search?.projects?.data || []) as ProjectEntity[];
  } else {
    projectEntities = ((
      await getSdk(gqlClient).filterProject({
        filterVariables,
        page,
      })
    ).projects?.data || []) as ProjectEntity[];
  }

  return projectEntities
    .map((project) => buildProject(project))
    .filter((project) => project !== undefined) as Project[];
};
