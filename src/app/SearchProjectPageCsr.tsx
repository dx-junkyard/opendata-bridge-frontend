'use client';
import { ProjectTag } from '@/types/project-tag';
import { useSearchProject } from '@/hooks/use-search-project';
import { SearchProject } from '@/components/templates/search-project/SearchProject';

const SearchProjectPageCsr = ({
  projectTags,
}: {
  projectTags: ProjectTag[];
}) => {
  const {
    query,
    tags,
    updateQuery,
    updateTagState,
    isTyping,
    updateIsTyping,
    projectList,
    isLoading,
  } = useSearchProject(projectTags);

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

export default SearchProjectPageCsr;
