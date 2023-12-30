'use client';
import React, { useState } from 'react';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/molecules/project-card/ProjectCard';
import { ProjectTags } from '@/components/molecules/project-tags/ProjectTags';
import { Button } from '@/components/atoms/button/Button';
import { SuccessFormattingModal } from '@/components/molecules/success-formating-modal/SuccessFormattingModal';
import { useFileList } from '@/hooks/use-file-list';
import { InputFileList } from '@/components/organizms/input-file-list/InputFileList';
import InputRecipe from '@/components/molecules/input-recipe/InputRecipe';
import { useInputRecipe } from '@/hooks/use-input-recipe';

interface UseRecipeProps {
  project: Project;
}

export const UseRecipe = ({ project }: UseRecipeProps) => {
  const { fileList, addFile, removeFile } = useFileList([
    new File([''], '変換対象データA.csv', { type: 'text/csv' }),
    new File([''], '変換対象データB.csv', { type: 'text/csv' }),
  ]);

  const { recipe, updateRecipe } = useInputRecipe(project.recipe);

  return (
    <article>
      <div className="bg-white text-black px-[10px] md:px-[220px] py-[50px] flex flex-col space-y-2">
        <h1 className="text-2xl md:text-4xl">データ整形レシピの実行</h1>
        <ProjectCard project={project} />
        <ProjectTags tags={project.tags} />
      </div>
      <div className="bg-white text-black px-[10px] md:px-[220px] py-[50px] flex flex-col space-y-8">
        <h2 className="text-xl">変換対象データのアップロード</h2>
        <InputFileList fileList={fileList} removeFile={removeFile} />
        <div className="w-full bg-white grid grid-cols-1 gap-4 justify-items-center">
          <Button color={'secondary'} size={'2xl'} label={'ファイルの追加'} />
          {/*<Button*/}
          {/*  color={'secondary'}*/}
          {/*  size={'2xl'}*/}
          {/*  label={'登録済みオープンデータから選ぶ'}*/}
          {/*/>*/}
        </div>
      </div>
      <div className="bg-white text-black px-[10px] md:px-[220px] py-[50px] flex flex-col space-y-8">
        <h2 className="text-xl">データ整形レシピの確認・編集</h2>
        <InputRecipe recipe={recipe} updateRecipe={updateRecipe} />
        <SuccessFormattingModal />
      </div>
    </article>
  );
};
