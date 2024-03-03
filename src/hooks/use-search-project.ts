import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import projectSearchFetcher, {
  searchProjectPath,
} from '@/lib/fetch/project-search-fetcher';
import { useFilterTag } from '@/hooks/use-filter-tag';
import { ProjectTag } from '@/types/project-tag';
import { Project } from '@/types/project';
import {
  QueryContext,
  QueryDispatchContext,
} from '@/components/atoms/context-provider/QueryContextProvider';

export const useSearchProject = (
  projectTags: ProjectTag[],
  initialProjectList: Project[]
) => {
  const query = useContext(QueryContext);
  const dispatch = useContext(QueryDispatchContext);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const { tags, updateTagState } = useFilterTag(projectTags);
  const [enableTags, updateEnableTags] = useState<string>('');

  const { data, isLoading } = useSWR(
    !isTyping ? [searchProjectPath, query, enableTags] : null,
    ([_, query, enableTags]) => projectSearchFetcher(query.value, enableTags),
    { fallbackData: initialProjectList }
  );

  const updateQuery = (q: string) => {
    if (dispatch) {
      dispatch({
        type: 'update',
        payload: { value: q },
      });
    }
  };

  const updateIsTyping = (isTyping: boolean) => setIsTyping(isTyping);

  useEffect(() => {
    const enableTags = Array.from(tags.entries())
      .filter((tag) => tag[1])
      .map((tag) => tag[0].id)
      .join(',');

    updateEnableTags(enableTags);
  }, [tags]);

  return {
    query: query.value,
    tags,
    updateQuery,
    updateIsTyping,
    updateTagState,
    projectList: data,
    isLoading,
    isTyping,
  };
};
