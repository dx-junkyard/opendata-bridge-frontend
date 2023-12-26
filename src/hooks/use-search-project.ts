import { useState } from 'react';
import useSWR from 'swr';
import projectSearchFeatcher, {
  fetchUsecasePath,
} from '@/lib/fetch/project-search-fetcher';

export const useSearchProject = () => {
  const [query, setQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const { data, isLoading } = useSWR(
    !isTyping ? [fetchUsecasePath, query] : null,
    ([_, query]) => projectSearchFeatcher(query),
    { fallbackData: [] }
  );

  const updateQuery = (q: string) => setQuery(q);

  const updateIsTyping = (isTyping: boolean) => setIsTyping(isTyping);

  return {
    query,
    updateQuery,
    updateIsTyping,
    projectList: data,
    isLoading,
    isTyping,
  };
};
