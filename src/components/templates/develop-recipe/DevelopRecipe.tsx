'use client';
import React from 'react';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/molecules/project/project-card/ProjectCard';
import { ProjectTags } from '@/components/molecules/project/project-tags/ProjectTags';
import { Button } from '@/components/atoms/button/Button';
import { useFileList } from '@/hooks/use-file-list';
import { InputFileList } from '@/components/organizms/input-file-list/InputFileList';
import { Alert } from '@/components/atoms/alert/Alert';
import { TableView } from '@/components/atoms/table/TableView';
import InputRecipe from '@/components/molecules/input-recipe/InputRecipe';
import { useInputPrompt } from '@/hooks/use-input-prompt';
import CodeEditor from '@/components/atoms/code-editor/CodeEditor';

interface DevelopRecipeProps {
  project: Project;
}

export const DevelopRecipe = ({ project }: DevelopRecipeProps) => {
  const { fileList, addFile, removeFile } = useFileList([
    new File([''], '変換対象データA.csv', { type: 'text/csv' }),
    new File([''], '変換対象データB.csv', { type: 'text/csv' }),
  ]);

  const { prompt, updatePrompt, actionUsePrompt, isLoading, result } =
    useInputPrompt(project.recipes[0]?.prompt || '');

  return (
    <article>
      <div className="bg-white text-black px-[10px] md:px-[220px] py-[50px] flex flex-col space-y-2">
        <h1 className="text-2xl md:text-4xl">データ整形レシピの開発</h1>
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
        <h2 className="text-xl">プロンプトを実行する</h2>
        <div className="w-full flex flex-col relative">
          <h3 className="text-sm">データ整形用プロンプト</h3>
          <CodeEditor
            code={prompt}
            updateCode={updatePrompt}
            language="markdown"
          />
        </div>
        <div className="w-full bg-white flex justify-center items-center">
          <Button
            color={'primary'}
            size={'2xl'}
            label={'プロンプトを実行する'}
            onClick={actionUsePrompt}
          />
        </div>
      </div>
      {result && !isLoading && (
        <div className="bg-white text-black px-[10px] md:px-[220px] py-[50px] flex flex-col space-y-8">
          <h2 className="text-xl">プロンプト実行結果</h2>
          <Alert title={'プロンプト実行が成功しました'} type={'info'} />
          <div className="w-full flex flex-col">
            <h3 className="text-sm">プロンプトによって整形されたデータ</h3>
            <TableView />
          </div>
          <div className="w-full bg-white flex justify-center items-center">
            <Button
              color={'secondary'}
              size={'2xl'}
              label={'整形後のファイルをダウンロード'}
            />
          </div>
          <InputRecipe
            recipe={{
              script: result.script,
              prompt: '',
            }}
          />
        </div>
      )}
    </article>
  );
};
