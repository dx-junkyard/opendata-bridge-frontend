'use client';
import { ProjectTag } from '@/types/project-tag';
import { useSearchProject } from '@/hooks/use-search-project';
import { SearchProject } from '@/components/templates/search-project/SearchProject';
import { Project } from '@/types/project';
import QueryContextProvider from '@/components/atoms/context-provider/QueryContextProvider';

interface SearchProjectPageCsrProps {
  projectTags: ProjectTag[];
  initialProjectList: Project[];
}

const SearchProjectPageCsr = ({
  projectTags,
  initialProjectList,
}: SearchProjectPageCsrProps) => {
  const {
    query,
    tags,
    updateQuery,
    updateTagState,
    isTyping,
    updateIsTyping,
    projectList,
    isLoading,
  } = useSearchProject(projectTags, initialProjectList);

  return (
    <SearchProject
      query={query}
      tags={tags}
      updateQuery={updateQuery}
      isTyping={isTyping}
      updateIsTyping={updateIsTyping}
      updateTagState={updateTagState}
      projectList={projectList}
      isLoading={isLoading}
    />
  );
};

const SearchProjectCsrWithProvider = (props: SearchProjectPageCsrProps) => (
  <QueryContextProvider>
    <SearchProjectPageCsr {...props} />
  </QueryContextProvider>
);

export default SearchProjectCsrWithProvider;
