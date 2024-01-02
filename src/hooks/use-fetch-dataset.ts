import useSWR from 'swr';
import datasetSearchFetcher, {
  searchDatasetPath,
} from '@/lib/fetch/dataset-search-fetcher';

export const useFetchDataset = () => {
  const { data, isLoading } = useSWR([searchDatasetPath, 1], ([_]) =>
    datasetSearchFetcher()
  );

  return {
    datasetList: data || [],
    isLoading,
  };
};
