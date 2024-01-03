'use client';
import React from 'react';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/molecules/project/project-card/ProjectCard';
import { ProjectTags } from '@/components/molecules/project/project-tags/ProjectTags';
import { SuccessFormattingModal } from '@/components/molecules/modal/success-formating-modal/SuccessFormattingModal';
import { useFileList } from '@/hooks/use-file-list';
import { InputFileList } from '@/components/organizms/input-file-list/InputFileList';
import InputRecipe from '@/components/molecules/input-recipe/InputRecipe';
import { useInputRecipe } from '@/hooks/use-input-recipe';
import SelectFileModal from '@/components/molecules/modal/select-file-modal/SelectFileModal';
import UploadButton from '@/components/atoms/ui-parts/upload-button/UploadButton';

interface UseRecipeProps {
  project: Project;
}

export const UseRecipe = ({ project }: UseRecipeProps) => {
  const { fileList, addFile, removeFile } = useFileList([]);

  const { recipes, updateRecipe } = useInputRecipe(
    project.recipes.length > 0
      ? project.recipes
      : [
          {
            script: '',
            prompt: '',
          },
        ]
  );

  return (
    <article className="w-full flex flex-col justify-center items-center">
      <div className="w-full bg-white text-black px-[10px] py-[50px] flex flex-col space-y-2">
        <h1 className="text-2xl md:text-4xl">データ整形レシピの実行</h1>
        <ProjectCard project={project} />
        <ProjectTags tags={project.tags} />
      </div>
      <div className="w-full bg-white text-black px-[10px] py-[50px] flex flex-col space-y-8">
        <h2 className="text-xl">変換対象データのアップロード</h2>
        <InputFileList fileList={fileList} removeFile={removeFile} />
        <div className="w-full bg-white grid md:grid-cols-2 gap-4 justify-items-center">
          <SelectFileModal addFile={addFile} />
          <UploadButton
            color={'secondary'}
            size={'2xl'}
            label={'ファイルの追加'}
            addFile={addFile}
          />
        </div>
      </div>
      <div className="w-full bg-white text-black px-[10px] py-[50px] flex flex-col space-y-8">
        <h2 className="text-xl">データ整形レシピの確認・編集</h2>
        {recipes.map((r, index) => {
          return (
            <div key={index}>
              <InputRecipe
                recipe={r}
                updateRecipe={(updatedRecipe) =>
                  updateRecipe(index, updatedRecipe)
                }
              />
              <SuccessFormattingModal />
            </div>
          );
        })}
      </div>
    </article>
  );
};
