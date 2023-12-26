'use client';
import React, { FC, useState } from 'react';
import { Hero } from '@/components/molecules/hero/Hero';
import { SearchWindow } from '@/components/organizms/search-window/SearchWindow';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/molecules/project-card/ProjectCard';
import { Header } from '@/components/organizms/header/Header';
import { Footer } from '@/components/organizms/footer/Footer';
import { SearchProject } from '@/components/templates/search-project/SearchProject';

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
  return (
    <>
      <Header user={undefined} onLogin={() => {}} onLogout={() => {}} />
      <SearchProject
        query={''}
        updateQuery={() => {}}
        isTyping={false}
        updateIsTyping={() => {}}
        projectList={projects}
        isLoading={false}
      />
      <Footer />
    </>
  );
};
