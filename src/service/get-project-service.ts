import { getSdk, ProjectEntity } from '@/lib/generated/client';
import { gqlClient } from '@/lib/gql-client/gql-client';
import { Project } from '@/types/project';
import { buildProject } from '@/util/build-project-util';

export const getProject = async (
  projectId: string
): Promise<Project | undefined> => {
  const projectEntity = ((
    await getSdk(gqlClient).getProject({
      id: projectId,
    })
  ).project?.data || undefined) as ProjectEntity | undefined;

  if (!projectEntity) {
    return undefined;
  }

  return buildProject(projectEntity);
};
