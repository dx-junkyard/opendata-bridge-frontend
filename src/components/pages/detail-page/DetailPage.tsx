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
  url: '/dummy1',
  thumbnails: ['/dummy.png', '/dummy.png'],
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
