import { getSdk } from '@/lib/generated/client';
import { gqlClient } from '@/lib/gql-client/gql-client';

export const getUpload = async (uuid: string): Promise<string | undefined> => {
  const uploadList =
    (
      (await getSdk(gqlClient).fetchUpload({
        name: `${uuid}_output.csv`,
      })) || []
    ).uploadFiles?.data.map((uploadFile) => uploadFile.attributes?.url || '') ||
    [];

  return uploadList[0] || undefined;
};
