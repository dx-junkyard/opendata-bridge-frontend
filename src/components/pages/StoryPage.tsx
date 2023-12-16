'use client';
import React, { FC, useState } from 'react';

import { Header } from '../organizms/header/Header';
import './story-page.scss';
import { Hero } from '@/components/molecules/hero/Hero';
import { User } from '@/types/user';
import { Footer } from '@/components/organizms/footer/Footer';
import { SearchWindow } from '@/components/organizms/search-window/SearchWindow';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/molecules/project-card/ProjectCard';

const projects: Project[] = [
  // dummyのプロジェクト
  {
    id: 'dummy1',
    name: 'dummy1',
    description: 'dummy1',
    url: '/dummy1',
    thumbnails: ['/dummy.png', '/dummy.png'],
  },
  {
    id: 'dummy2',
    name: 'dummy2',
    description: 'dummy2',
    url: '/dummy2',
    thumbnails: ['/dummy.png', '/dummy.png'],
  },
];

export const StoryPage: FC = () => {
  const [user, setUser] = useState<User>();
  const [query, setQuery] = useState<string>('');

  return (
    <>
      <Header
        user={user}
        onLogin={() => setUser({ name: 'dx-junkyard' })}
        onLogout={() => setUser(undefined)}
      />
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
