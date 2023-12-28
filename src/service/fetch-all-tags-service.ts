import { getSdk, TagEntity } from '@/lib/generated/client';
import { gqlClient } from '@/lib/gql-client/gql-client';

export const fetchAllTagsService = async (): Promise<TagEntity[]> => {
  return (await getSdk(gqlClient).fetchAllTags()).tags?.data || [];
};
