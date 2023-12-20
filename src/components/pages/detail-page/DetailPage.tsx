import React, { FC } from 'react';
import { Project } from '@/types/project';
import { Header } from '@/components/organizms/header/Header';
import { Footer } from '@/components/organizms/footer/Footer';
import { DetailProject } from '@/components/templates/detail-project/DetailProject';

// dummyのプロジェクト
const project: Project = {
  id: 'dummy1',
  name: 'dummy1',
  description: 'dummy1',
  tags: ['tag1', 'tag2', 'tag3'],
  url: '/dummy1',
  thumbnails: ['/dummy.png', '/dummy.png'],
  recipe: '',
};

export const DetailPage: FC = () => {
  return (
    <>
      <Header user={undefined} onLogin={() => {}} onLogout={() => {}} />
      <DetailProject project={project} />
      <Footer />
    </>
  );
};
