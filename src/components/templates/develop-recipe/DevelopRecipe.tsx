'use client';
import React, { useEffect, useState } from 'react';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/molecules/project/project-card/ProjectCard';
import { ProjectTags } from '@/components/molecules/project/project-tags/ProjectTags';
import { Button } from '@/components/atoms/ui-parts/button/Button';
import { useFileList } from '@/hooks/use-file-list';
import { InputFileList } from '@/components/organizms/input-file-list/InputFileList';
import { Alert } from '@/components/atoms/ui-parts/alert/Alert';
import InputRecipe from '@/components/molecules/input-recipe/InputRecipe';
import { useInputPrompt } from '@/hooks/use-input-prompt';
import CodeEditor from '@/components/atoms/ui-parts/code-editor/CodeEditor';
import SelectFileModal from '@/components/molecules/modal/select-file-modal/SelectFileModal';
import UploadButton from '@/components/atoms/ui-parts/upload-button/UploadButton';
import { TableView } from '@/components/atoms/ui-parts/table/TableView';

interface DevelopRecipeProps {
  project: Project;
}

export const DevelopRecipe = ({ project }: DevelopRecipeProps) => {
  const { fileList, addFile, removeFile } = useFileList([]);

  const { prompt, updatePrompt, actionUsePrompt, isLoading, result } =
    useInputPrompt(project.recipes[0]?.prompt || '');

  const [message, setMessage] = useState('');

  useEffect(() => {
    const eventSource = new EventSource(
      'http://127.0.0.1:8000/chat?message=ローカルにあるREADMEファイルをpythonプログラムを読み取って回答してください'
    );

    eventSource.onmessage = (event) => {
      const json = JSON.parse(event.data);
      if (json.end_of_message) {
        console.info("It's the end of the message.");
        eventSource.close();
      } else if (json.message || json.code) {
        setMessage((prev) => prev + (json.message || json.code));
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <article className="w-full flex flex-col justify-center items-center">
      <div className="w-full bg-white text-black px-[10px] py-[50px] flex flex-col space-y-2">
        <h1 className="text-2xl md:text-4xl">データ整形レシピの開発</h1>
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
      <textarea className="w-full text-black" value={message} rows={30} />
      {result && !isLoading && (
        <div className="w-full bg-white text-black px-[10px] py-[50px] flex flex-col space-y-8">
          <h2 className="text-xl">プロンプト実行結果</h2>
          <Alert title={'プロンプト実行が成功しました'} type={'info'} />
          <div className="w-full flex flex-col">
            <h3 className="text-sm">プロンプトによって整形されたデータ</h3>
            <TableView
              defaultData={[
                {
                  id: '1',
                  name: 'name-1',
                  creator: 'creator-1',
                  createdAt: '2021-01-01',
                  description: 'description-1',
                },
                {
                  id: '2',
                  name: 'name-2',
                  creator: 'creator-2',
                  createdAt: '2021-01-01',
                  description: 'description-2',
                },
              ]}
            />
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
