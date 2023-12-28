import { useEffect, useState } from 'react';
import useSWR from 'swr';
import projectSearchFeatcher, {
  fetchUsecasePath,
} from '@/lib/fetch/project-search-fetcher';
import { useFilterTag } from '@/hooks/use-filter-tag';
import { ProjectTag } from '@/types/project-tag';

export const useSearchProject = (projectTags: ProjectTag[]) => {
  const [query, setQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const { tags, updateTagState } = useFilterTag(projectTags);
  const [enableTags, updateEnableTags] = useState<string>('');

  const { data, isLoading } = useSWR(
    !isTyping ? [fetchUsecasePath, query, enableTags] : null,
    ([_, query, enableTags]) => projectSearchFeatcher(query, enableTags),
    { fallbackData: [] }
  );

  const updateQuery = (q: string) => setQuery(q);

  const updateIsTyping = (isTyping: boolean) => setIsTyping(isTyping);

  useEffect(() => {
    const enableTags = Array.from(tags.entries())
      .filter((tag) => tag[1])
      .map((tag) => tag[0].id)
      .join(',');

    console.info(enableTags);

    updateEnableTags(enableTags);
  }, [tags]);

  return {
    query,
    tags,
    updateQuery,
    updateIsTyping,
    updateTagState,
    projectList: data,
    isLoading,
    isTyping,
  };
};
