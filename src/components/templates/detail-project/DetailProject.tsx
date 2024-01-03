'use client';
import React from 'react';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/molecules/project/project-card/ProjectCard';
import { ActionCard } from '@/components/atoms/ui-parts/action-card/ActionCard';
import { ProjectTags } from '@/components/molecules/project/project-tags/ProjectTags';
import CodeEditor from '@/components/atoms/ui-parts/code-editor/CodeEditor';
import DatasetLinkCardList from '@/components/molecules/project/dataset-link-card-list/DatasetLinkCardList';

interface DetailProjectProps {
  project: Project;
  isLogin: boolean;
}

export const DetailProject = ({
  project,
  isLogin = false,
}: DetailProjectProps) => {
  const script = project.recipes[0]?.script || '';

  return (
    <article>
      <div className="bg-white text-black px-[10px] md:px-[220px] py-[50px] flex flex-col space-y-2">
        <h1 className="text-2xl md:text-4xl">プロジェクト詳細情報</h1>
        <ProjectCard project={project} />
        <ProjectTags tags={project.tags} />
      </div>
      <div className="bg-white text-black px-[10px] md:px-[220px] py-[50px] flex flex-col space-y-2">
        <h2 className="text-xl">変換元のオープンデータのリンク一覧</h2>
        <div>
          <DatasetLinkCardList datasetList={project.resources} />
        </div>
      </div>
      {script && (
        <div className="bg-white text-black px-[10px] md:px-[220px] pt-[50px] pb-[100px] flex flex-col space-y-2 ">
          <h2 className="text-xl">変換用のPythonコード</h2>
          <CodeEditor code={script} language="python" />
        </div>
      )}
      {isLogin && (
        <div className="w-full text-black bg-blue-100 grid grid-cols-1 md:grid-cols-2 gap-24 px-[10px] md:px-[320px] py-[50px]">
          <ActionCard
            title="データ整形レシピの実行"
            description="作成済みのデータ整形レシピを使って、データ整形を実行します"
            url={`/project/${project.id}/use-recipe/`}
            thumbnails="/dummy1_1.png"
            buttonLabel="レシピを実行する"
          />
          <ActionCard
            title="データ整形レシピの開発"
            description="AIを使ってデータ整形用のレシピを開発します"
            url={`/project/${project.id}/develop-recipe/`}
            thumbnails="/dummy1_1.png"
            buttonLabel="レシピを開発する"
          />
        </div>
      )}
    </article>
  );
};
