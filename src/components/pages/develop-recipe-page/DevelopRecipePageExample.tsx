import React, { FC } from 'react';
import { Project } from '@/types/project';
import { Header } from '@/components/organizms/header/Header';
import { Footer } from '@/components/organizms/footer/Footer';
import { DevelopRecipe } from '@/components/templates/develop-recipe/DevelopRecipe';

// dummyのプロジェクト
const project: Project = {
  id: 'dummy1',
  title: 'dummy1',
  description: 'dummy1',
  tags: ['tag1', 'tag2', 'tag3'],
  thumbnails: ['/dummy.png', '/dummy.png'],
  recipe: '{"dummy": "dummy"}',
  resources: [],
};

export const DevelopRecipePageExample: FC = () => {
  return (
    <>
      <Header user={undefined} />
      <DevelopRecipe project={project} />
      <Footer />
    </>
  );
};
