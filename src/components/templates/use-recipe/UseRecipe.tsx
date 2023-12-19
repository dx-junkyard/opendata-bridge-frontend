'use client';
import React from 'react';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/molecules/project-card/ProjectCard';
import { Button } from '@/components/atoms/button/Button';
import { DatasetCard } from '@/components/molecules/dataset-card/DatasetCard';
import { ActionCard } from '@/components/molecules/action-card/ActionCard';
import { ProjectTags } from '@/components/molecules/project-tags/ProjectTags';

interface UseRecipeProps {
  project: Project;
}

export const UseRecipe = ({ project }: UseRecipeProps) => {
  return (
    <article>
      <div className="bg-white text-black px-[220px] py-[50px] flex flex-col space-y-2">
        <h1 className="text-4xl">データ整形レシピを実行する</h1>
        <ProjectCard project={project} />
        <ProjectTags tags={project.tags} />
      </div>
      <div className="bg-white text-black px-[220px] py-[50px] flex flex-col space-y-2">
        <h2 className="text-xl">変換対象データのアップロード</h2>
      </div>
      <div className="bg-white text-black px-[220px] py-[50px] flex flex-col space-y-2">
        <h2 className="text-xl">データ整形レシピの確認・編集</h2>
      </div>
    </article>
  );
};
