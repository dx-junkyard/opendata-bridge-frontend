'use client';
import React, { FC } from 'react';
import { Project } from '@/types/project';
import { Header } from '@/components/organizms/header/Header';
import { Footer } from '@/components/organizms/footer/Footer';
import { SearchProject } from '@/components/templates/search-project/SearchProject';

const projects: Project[] = [
  // dummyのプロジェクト
  {
    id: 'dummy1',
    title: 'dummy1',
    description: 'dummy1',
    tags: ['tag1', 'tag2'],
    thumbnails: ['/dummy.png', '/dummy.png'],
    resources: [],
  },
  {
    id: 'dummy2',
    title: 'dummy2',
    description: 'dummy2',
    tags: ['tag1', 'tag2'],
    thumbnails: ['/dummy.png', '/dummy.png'],
    resources: [],
  },
];

export const SearchPageExample: FC = () => {
  return (
    <>
      <Header user={undefined} />
      <div className="h-[80px]" />
      <SearchProject
        query={''}
        updateQuery={() => {}}
        isTyping={false}
        updateIsTyping={() => {}}
        updateTagState={() => {}}
        tags={new Map([])}
        projectList={projects}
        isLoading={false}
      />
      <Footer />
    </>
  );
};
