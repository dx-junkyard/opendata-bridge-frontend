import { DatasetEntity, getSdk } from '@/lib/generated/client';
import { gqlClient } from '@/lib/gql-client/gql-client';
import { Dataset } from '@/types/dataset';
import { buildDataset } from '@/util/build-dataset-util';

export const getDataset = async (id: string): Promise<Dataset | undefined> => {
  const datasetEntity = (
    await getSdk(gqlClient).getDataset({
      id,
    })
  ).dataset?.data as DatasetEntity | undefined;

  if (!datasetEntity) {
    return undefined;
  }

  const dataset = buildDataset(datasetEntity);

  if (
    dataset.id === '' ||
    dataset.url === '' ||
    dataset.title === '' ||
    dataset.organization === '' ||
    dataset.assetUrl === ''
  ) {
    return undefined;
  } else {
    return dataset;
  }
};
