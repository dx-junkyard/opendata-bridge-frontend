'use client';
import React, { FC, useState } from 'react';
import { Hero } from '@/components/molecules/hero/Hero';
import { SearchWindow } from '@/components/organizms/search-window/SearchWindow';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/molecules/project-card/ProjectCard';
import { Header } from '@/components/organizms/header/Header';
import { Footer } from '@/components/organizms/footer/Footer';

const projects: Project[] = [
  // dummyのプロジェクト
  {
    id: 'dummy1',
    name: 'dummy1',
    description: 'dummy1',
    tags: ['tag1', 'tag2'],
    thumbnails: ['/dummy.png', '/dummy.png'],
    resources: [],
  },
  {
    id: 'dummy2',
    name: 'dummy2',
    description: 'dummy2',
    tags: ['tag1', 'tag2'],
    thumbnails: ['/dummy.png', '/dummy.png'],
    resources: [],
  },
];

export const SearchPageExample: FC = () => {
  const [query, setQuery] = useState<string>('');

  return (
    <>
      <Header user={undefined} onLogin={() => {}} onLogout={() => {}} />
      <article>
        <Hero />
        <SearchWindow query={query} updateQuery={setQuery} />
        <div className="bg-white text-black px-[220px] py-[50px] flex flex-col">
          <h1 className="text-sm">検索結果 : {projects.length}件</h1>
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </article>
      <Footer />
    </>
  );
};
