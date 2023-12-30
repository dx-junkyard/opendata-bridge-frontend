import React, { FC } from 'react';
import { Project } from '@/types/project';
import { Header } from '@/components/organizms/header/Header';
import { Footer } from '@/components/organizms/footer/Footer';
import { UseRecipe } from '@/components/templates/use-recipe/UseRecipe';

// dummyのプロジェクト
const project: Project = {
  id: 'dummy1',
  title: 'dummy1',
  description: 'dummy1',
  tags: ['tag1', 'tag2', 'tag3'],
  thumbnails: ['/dummy.png', '/dummy.png'],
  resources: [],
  recipe: '{"dummy": "dummy"}',
};

export const UseRecipePageExample: FC = () => {
  return (
    <>
      <Header user={undefined} />
      <div className="h-[80px]" />
      <UseRecipe project={project} />
      <Footer />
    </>
  );
};
