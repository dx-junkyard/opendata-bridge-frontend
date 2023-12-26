import { getSdk, ProjectEntity } from '@/lib/generated/client';
import { gqlClient } from '@/lib/gql-client/gql-client';

export const searchProjectWithQuery = async (
  query: string[]
): Promise<ProjectEntity[]> => {
  return (
    (
      await getSdk(gqlClient).searchProject({
        query: query.join(' '),
      })
    ).search?.projects?.data || []
  );
};

export const fetchProject = async (): Promise<ProjectEntity[]> => {
  return (await getSdk(gqlClient).fetchProject()).projects?.data || [];
};
