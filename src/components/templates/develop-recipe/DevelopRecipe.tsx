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
      {/*<div className="w-full bg-white text-black px-[10px] py-[50px] flex flex-col space-y-8">*/}
      {/*  <h2 className="text-xl">変換対象データのアップロード</h2>*/}
      {/*  <InputFileList fileList={fileList} removeFile={removeFile} />*/}
      {/*  <div className="w-full bg-white grid md:grid-cols-2 gap-4 justify-items-center">*/}
      {/*    <SelectFileModal addFile={addFile} />*/}
      {/*    <UploadButton*/}
      {/*      color={'secondary'}*/}
      {/*      size={'2xl'}*/}
      {/*      label={'ファイルの追加'}*/}
      {/*      addFile={addFile}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="w-full bg-white text-black px-[10px] py-[50px] flex flex-col space-y-8">*/}
      {/*  <h2 className="text-xl">プロンプトを実行する</h2>*/}
      {/*  <div className="w-full flex flex-col relative">*/}
      {/*    <h3 className="text-sm">データ整形用プロンプト</h3>*/}
      {/*    <CodeEditor*/}
      {/*      code={prompt}*/}
      {/*      updateCode={updatePrompt}*/}
      {/*      language="markdown"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div className="w-full bg-white flex justify-center items-center">*/}
      {/*    <Button*/}
      {/*      color={'primary'}*/}
      {/*      size={'2xl'}*/}
      {/*      label={'プロンプトを実行する'}*/}
      {/*      onClick={actionUsePrompt}*/}
      {/*      isLoading={isLoading}*/}
      {/*      loadingLabel={'実行中'}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*{result && (*/}
      {/*  <div className="w-full bg-white text-black px-[10px] py-[50px] flex flex-col space-y-8">*/}
      {/*    <h2 className="text-xl">プロンプト実行結果</h2>*/}
      {/*    <MarkdownArea value={result} />*/}
      {/*    {output.content.length > 0 && !isLoading && (*/}
      {/*      <div className="w-full flex flex-col">*/}
      {/*        <h3 className="text-sm">プロンプトによって整形されたデータ</h3>*/}
      {/*        <div className="grid grid-cols-10">*/}
      {/*          <span className="text-left col-span-8">*/}
      {/*            ※最大5行までプレビュー表示されます*/}
      {/*          </span>*/}
      {/*          <div className="flex items-center justify-end col-span-2">*/}
      {/*            <DownloadButton filename={output.name} value={output.raw} />*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="w-full overflow-auto">*/}
      {/*          <TableView defaultData={output.content.slice(0, 5)} />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*    {code && !isLoading && <CodeEditor code={code} language="python" />}*/}
      {/*  </div>*/}
      {/*)}*/}
    </article>
  );
};
