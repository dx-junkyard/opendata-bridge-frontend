'use client';
import React from 'react';
import { Project } from '@/types/project';
import { ChatUI } from '@/components/organizms/chat/ChatUI';

interface DevelopRecipeProps {
  project: Project;
}

export const DevelopRecipe = ({ project }: DevelopRecipeProps) => {
  return (
    <article className="w-full flex flex-col justify-center items-center">
      <ChatUI project={project} />
    </article>
  );
};
