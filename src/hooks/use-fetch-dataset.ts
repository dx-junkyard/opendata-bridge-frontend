import datasetSearchFetcher, {
  searchDatasetPath,
} from '@/lib/fetch/dataset-search-fetcher';
import useSWRImmutable from 'swr/immutable';

export const useFetchDataset = () => {
  const { data, isLoading } = useSWRImmutable([searchDatasetPath, 1], ([_]) =>
    datasetSearchFetcher()
  );

  return {
    datasetList: data || [],
    isLoading,
  };
};
