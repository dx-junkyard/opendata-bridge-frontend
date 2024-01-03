import React from 'react';
import { Hero } from '@/components/atoms/ui-parts/hero/Hero';
import { SearchWindow } from '@/components/organizms/search-window/SearchWindow';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/molecules/project/project-card/ProjectCard';
import { LoadingProjectCard } from '@/components/molecules/project/loading-project-card/LoadingProjectCard';
import { ProjectTag } from '@/types/project-tag';
import { TagMap } from '@/hooks/use-filter-tag';

interface SearchProjectProps {
  query: string;
  tags: TagMap;
  updateQuery: (query: string) => void;
  updateTagState: (tag: ProjectTag, selected: boolean) => void;
  isTyping: boolean;
  updateIsTyping: (isTyping: boolean) => void;
  projectList: Project[];
  isLoading: boolean;
}

export const SearchProject = ({
  query,
  tags,
  updateQuery,
  updateTagState,
  isTyping,
  updateIsTyping,
  projectList,
  isLoading,
}: SearchProjectProps) => {
  return (
    <article className="w-full">
      <Hero />
      <SearchWindow
        query={query}
        updateQuery={updateQuery}
        updateIsTyping={updateIsTyping}
        tags={tags}
        updateTagState={updateTagState}
      />
      <div className="w-full bg-white text-black px-[10px] md:px-[220px] py-[50px] flex flex-col">
        {!isLoading && !isTyping ? (
          <>
            <h1 className="text-sm">検索結果 : {projectList.length}件</h1>
            {projectList.length > 0 ? (
              projectList.map((project) => (
                <ProjectCard project={project} key={project.id} />
              ))
            ) : (
              <div className="flex justify-center items-center h-[200px]">
                <h2>オープンデータが見つかりませんでした</h2>
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-sm">検索中...</h1>
            <LoadingProjectCard />
            <LoadingProjectCard />
            <LoadingProjectCard />
          </>
        )}
      </div>
    </article>
  );
};
