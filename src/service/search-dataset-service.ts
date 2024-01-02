import { DatasetEntity, getSdk } from '@/lib/generated/client';
import { gqlClient } from '@/lib/gql-client/gql-client';
import { Dataset } from '@/types/dataset';
import { buildDataset } from '@/util/build-dataset-util';

export const searchDataset = async (page: number = 1): Promise<Dataset[]> => {
  const datasetList = ((
    await getSdk(gqlClient).fetchDataset({
      page,
    })
  ).datasets?.data || []) as DatasetEntity[];

  return datasetList
    .map(buildDataset)
    .filter(
      (dataset) =>
        dataset.url !== '' ||
        dataset.title !== '' ||
        dataset.organization !== '' ||
        dataset.assetUrl !== ''
    ) as Dataset[];
};
