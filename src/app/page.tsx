'use client';
import { SearchProject } from '@/components/templates/search-project/SearchProject';
import { useSearchProject } from '@/hooks/use-search-project';

const SearchProjectPage = () => {
  const {
    query,
    updateQuery,
    isTyping,
    updateIsTyping,
    projectList,
    isLoading,
  } = useSearchProject();

  return (
    <SearchProject
      query={query}
      updateQuery={updateQuery}
      isTyping={isTyping}
      updateIsTyping={updateIsTyping}
      projectList={projectList}
      isLoading={isLoading}
    />
  );
};

export default SearchProjectPage;
