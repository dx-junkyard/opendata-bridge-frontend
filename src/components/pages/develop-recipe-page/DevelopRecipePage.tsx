import React, { FC } from 'react';
import { Project } from '@/types/project';
import { Header } from '@/components/organizms/header/Header';
import { Footer } from '@/components/organizms/footer/Footer';
import { DevelopRecipe } from '@/components/templates/develop-recipe/DevelopRecipe';

// dummyのプロジェクト
const project: Project = {
  id: 'dummy1',
  name: 'dummy1',
  description: 'dummy1',
  tags: ['tag1', 'tag2', 'tag3'],
  thumbnails: ['/dummy.png', '/dummy.png'],
  recipe: '{"dummy": "dummy"}',
};

export const DevelopRecipePage: FC = () => {
  return (
    <>
      <Header user={undefined} onLogin={() => {}} onLogout={() => {}} />
      <DevelopRecipe project={project} />
      <Footer />
    </>
  );
};
