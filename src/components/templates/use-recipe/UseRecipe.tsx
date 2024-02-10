'use client';
import React, { useEffect, useState } from 'react';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/molecules/project/project-card/ProjectCard';
import { ProjectTags } from '@/components/molecules/project/project-tags/ProjectTags';
import { InputFileList } from '@/components/organizms/input-file-list/InputFileList';
import SelectFileModal from '@/components/molecules/modal/select-file-modal/SelectFileModal';
import UploadButton from '@/components/atoms/ui-parts/upload-button/UploadButton';
import MarkdownArea from '@/components/atoms/ui-parts/markdown-area/MarkdownArea';
import CodeEditor from '@/components/atoms/ui-parts/code-editor/CodeEditor';
import { Button } from '@/components/atoms/ui-parts/button/Button';
import { useInputPrompt } from '@/hooks/use-input-prompt';
import CsvFileTable from '@/components/molecules/csv-file-table/CsvFileTable';
import SelectIndex from '@/components/molecules/select-index/SelectIndex';

interface UseRecipeProps {
  project: Project;
}

export const UseRecipe = ({ project }: UseRecipeProps) => {
  const {
    prompt,
    updatePrompt,
    actionUsePrompt,
    fileList,
    addFile,
    removeFile,
    messages,
    isChatting,
  } = useInputPrompt(
    project.recipes[0]?.script || '',
    '入力されたファイルに対して、以下のpythonコードを実行して、生成したファイルを保存してください。' +
      '以下のルールを厳守してください。実行しない場合はペナルティ1億円が発生します。' +
      '保存したファイルは回答内容に含めてください。' +
      'Pythonコードは何も編集せずそのまま実行してください。' +
      'ただし入力ファイルと出力ファイル名の文字列はアレンジして構いません。' +
      'また入力ファイルの項目が足りなければ、その項目は無視して構いません。' +
      '実行する際はユーザへの確認は一切不要です。',
    false
  );

  const [currentIndex, setCurrentIndex] = useState(1);

  const assistantMessages = messages
    .filter((m) => m.role === 'assistant')
    .filter((m) => m.content.length > 0);

  useEffect(() => {
    setCurrentIndex(assistantMessages.length);
  }, [assistantMessages.length]);

  console.info(assistantMessages);

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
          <CodeEditor
            code={prompt}
            language="python"
            updateCode={updatePrompt}
          />
        </div>
        <div className="w-full bg-white flex justify-center items-center">
          <Button
            color={'primary'}
            size={'2xl'}
            label={'データ整形を実行する'}
            onClick={actionUsePrompt}
            isLoading={isChatting}
            loadingLabel={'実行中'}
          />
        </div>
      </div>
      {assistantMessages.length > 0 && (
        <div className="w-full bg-white text-black px-[10px] py-[50px] flex flex-col space-y-8">
          <h2 className="text-xl">データ整形の実行結果</h2>
          <SelectIndex
            totalCount={assistantMessages.length}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
          {assistantMessages[currentIndex - 1] && (
            <>
              <div key={currentIndex} className="border rounded p-3">
                <p>{currentIndex}番目の実行結果</p>
                <MarkdownArea
                  value={
                    assistantMessages[currentIndex - 1].fileId
                      ? replaceFileLink(
                          assistantMessages[currentIndex - 1].content,
                          assistantMessages[currentIndex - 1].fileId as string
                        )
                      : assistantMessages[currentIndex - 1].content
                  }
                />
              </div>
              {assistantMessages[currentIndex - 1].fileId && !isChatting && (
                <CsvFileTable
                  fileId={assistantMessages[currentIndex - 1].fileId as string}
                />
              )}
            </>
          )}
        </div>
      )}
    </article>
  );
};

const replaceFileLink = (content: string, fileId: string) => {
  return content.replace(
    // sandbox:\/mnt\/data\/[a-zA-Z_]+\.[a-zA-Z]+の正規表現に一致したものを入れ替える
    /sandbox:\/mnt\/data\/.+\.[a-zA-Z]+/g,
    `/api/file/${fileId}`
  );
};
