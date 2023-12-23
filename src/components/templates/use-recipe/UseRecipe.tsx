'use client';
import React from 'react';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/molecules/project-card/ProjectCard';
import { ProjectTags } from '@/components/molecules/project-tags/ProjectTags';
import { ResourceOption } from '@/components/molecules/resource-option/ResourceOption';
import { Button } from '@/components/atoms/button/Button';
import CopyButton from '@/components/atoms/copy-button/CopyBotton';
import { SuccessFormattingModal } from '@/components/molecules/success-formating-modal/SuccessFormattingModal';
import { useFileList } from '@/hooks/use-file-list';
import { InputFileList } from '@/components/organizms/InputFileList/InputFileList';

interface UseRecipeProps {
  project: Project;
}

export const UseRecipe = ({ project }: UseRecipeProps) => {
  const { fileList, addFile, removeFile } = useFileList([
    new File([''], '変換対象データA.csv', { type: 'text/csv' }),
    new File([''], '変換対象データB.csv', { type: 'text/csv' }),
  ]);

  const recipe = project.recipe
    ? JSON.stringify(JSON.parse(project.recipe), null, '\t')
    : '';

  return (
    <article>
      <div className="bg-white text-black px-[220px] py-[50px] flex flex-col space-y-2">
        <h1 className="text-4xl">データ整形レシピを実行する</h1>
        <ProjectCard project={project} />
        <ProjectTags tags={project.tags} />
      </div>
      <div className="bg-white text-black px-[220px] py-[50px] flex flex-col space-y-8">
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
      <div className="bg-white text-black px-[220px] py-[50px] flex flex-col space-y-8">
        <h2 className="text-xl">データ整形レシピの確認・編集</h2>
        <div className="w-full flex flex-col relative">
          <h3 className="text-sm">データ整形レシピ(JSON)</h3>
          <textarea
            className="border rounded px-[6px] py-[4px] placeholder-gray-500"
            value={recipe}
            rows={5}
          />
          <div className="absolute top-6 right-2">
            <CopyButton value={recipe} />
          </div>
        </div>
        <SuccessFormattingModal />
      </div>
    </article>
  );
};
