'use client';
import React from 'react';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/molecules/project/project-card/ProjectCard';
import { ProjectTags } from '@/components/molecules/project/project-tags/ProjectTags';
import { InputFileList } from '@/components/organizms/input-file-list/InputFileList';
import SelectFileModal from '@/components/molecules/modal/select-file-modal/SelectFileModal';
import UploadButton from '@/components/atoms/ui-parts/upload-button/UploadButton';
import MarkdownArea from '@/components/atoms/ui-parts/markdown-area/MarkdownArea';
import DownloadButton from '@/components/atoms/ui-parts/download-button/DownloadButton';
import { TableView } from '@/components/atoms/ui-parts/table/TableView';
import CodeEditor from '@/components/atoms/ui-parts/code-editor/CodeEditor';
import { Button } from '@/components/atoms/ui-parts/button/Button';
import { useInputRecipe } from '@/hooks/use-input-recipe';

interface UseRecipeProps {
  project: Project;
}

export const UseRecipe = ({ project }: UseRecipeProps) => {
  const {
    recipe,
    updateRecipe,
    actionUsePrompt,
    isLoading,
    result,
    fileList,
    addFile,
    removeFile,
    code,
    output,
  } = useInputRecipe(project.recipes[0]?.script || '');

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
        <h2 className="text-xl">データ整形を実行する</h2>
        <div className="w-full flex flex-col relative">
          <h3 className="text-sm">データ整形用スクリプト(python)</h3>
          <CodeEditor code={recipe} language="python" />
        </div>
        <div className="w-full bg-white flex justify-center items-center">
          <Button
            color={'primary'}
            size={'2xl'}
            label={'データ整形を実行する'}
            onClick={actionUsePrompt}
            isLoading={isLoading}
            loadingLabel={'実行中'}
          />
        </div>
      </div>
      {result && (
        <div className="w-full bg-white text-black px-[10px] py-[50px] flex flex-col space-y-8">
          <h2 className="text-xl">データ整形の実行結果</h2>
          <MarkdownArea value={result} />
          {output.content.length > 0 && !isLoading && (
            <div className="w-full flex flex-col">
              <h3 className="text-sm">整形されたデータ</h3>
              <div className="grid grid-cols-10">
                <span className="text-left col-span-8">
                  ※最大5行までプレビュー表示されます
                </span>
                <div className="flex items-center justify-end col-span-2">
                  <DownloadButton filename={output.name} value={output.raw} />
                </div>
              </div>
              <div className="w-full hover:overflow-scroll">
                <TableView defaultData={output.content.slice(0, 5)} />
              </div>
            </div>
          )}
          {code && !isLoading && <CodeEditor code={code} language="python" />}
        </div>
      )}
    </article>
  );
};
