import { Dataset } from '@/types/dataset';

export const searchDatasetPath = '/api/dataset/search';

export default async function datasetSearchFetcher() {
  const res = await fetch(`${searchDatasetPath}`);
  return ((await res.json()) || []) as Dataset[];
}
