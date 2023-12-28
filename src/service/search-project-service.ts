import {
  getSdk,
  ProjectEntity,
  ProjectFiltersInput,
} from '@/lib/generated/client';
import { gqlClient } from '@/lib/gql-client/gql-client';

export const searchProject = async (
  query: string,
  tagIds: string[],
  page: number = 1
): Promise<ProjectEntity[]> => {
  const filterVariables: ProjectFiltersInput = {};

  if (tagIds.length > 0) {
    filterVariables.tags = { id: { in: tagIds } };
  }

  if (query) {
    // @ts-ignore
    return (
      (
        await getSdk(gqlClient).searchProject({
          query,
          filterVariables,
          page,
        })
      ).search?.projects?.data || []
    );
  } else {
    // @ts-ignore
    return (
      (
        await getSdk(gqlClient).filterProject({
          filterVariables,
          page,
        })
      ).projects?.data || []
    );
  }
};
