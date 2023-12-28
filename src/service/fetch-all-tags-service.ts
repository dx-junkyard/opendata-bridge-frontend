import { getSdk, TagEntity } from '@/lib/generated/client';
import { gqlClient } from '@/lib/gql-client/gql-client';
import { ProjectTag } from '@/types/project-tag';

export const fetchAllTagsService = async (): Promise<ProjectTag[]> => {
  const projectTag = (await getSdk(gqlClient).fetchAllTags()).tags?.data || [];

  return projectTag
    .map((tag) => buildTag(tag))
    .filter((tag) => tag !== undefined) as ProjectTag[];
};

const buildTag = (tagEntity: TagEntity): ProjectTag | undefined => {
  if (!tagEntity.id || !tagEntity.attributes?.title) {
    return undefined;
  }

  return {
    id: tagEntity.id,
    title: tagEntity.attributes?.title,
  };
};
