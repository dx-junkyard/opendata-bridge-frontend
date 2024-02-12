'use client';
import React from 'react';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/molecules/project/project-card/ProjectCard';
import { ActionCard } from '@/components/atoms/ui-parts/action-card/ActionCard';
import { ProjectTags } from '@/components/molecules/project/project-tags/ProjectTags';
import DatasetLinkCardList from '@/components/molecules/project/dataset-link-card-list/DatasetLinkCardList';
import { CsvFile } from '@/types/csv-file';
import TableView from '@/components/atoms/ui-parts/table/TableView';
import DownloadButton from '@/components/atoms/ui-parts/download-button/DownloadButton';
import fetchAsset from '@/service/fetch-asset';
import { parse } from 'csv-parse/sync';
import useSWR from 'swr';

interface DetailProjectProps {
  project: Project;
  isLogin: boolean;
}

const fetchCsvFile = async (project: Project): Promise<CsvFile> => {
  const csvString = await fetchAsset(
    `/api/project/${project.id}/formatted-files`
  );
  const csvData = parse(await csvString.text(), { columns: true });
  return {
    name: project.formattedFiles[0].name,
    content: csvData,
    raw: csvString,
  };
};

export const DetailProject = ({
  project,
  isLogin = false,
}: DetailProjectProps) => {
  const { data } = useSWR(
    [`/api/project/${project.id}/formattedFiles`, project],
    ([_, project]) => fetchCsvFile(project)
  );

  return (
    <article className="w-full flex flex-col justify-center items-center">
      <div className="w-full bg-white text-black px-[10px] py-[50px] flex flex-col space-y-2">
        <h1 className="text-2xl md:text-4xl">プロジェクト詳細情報</h1>
        <ProjectCard project={project} />
        <ProjectTags tags={project.tags} />
      </div>
      <div className="w-full bg-white text-black px-[10px] py-[50px] flex flex-col space-y-2">
        <h2 className="text-xl">変換元のオープンデータのリンク一覧</h2>
        <div>
          <DatasetLinkCardList datasetList={project.resources} />
        </div>
      </div>

      {data && (
        <div className="w-full bg-white text-black px-[10px] py-[50px] flex flex-col space-y-2">
          <h2 className="text-xl">
            整形済みデータ(自治体標準データセットに準ずる)
          </h2>
          <div className="grid grid-cols-10">
            <span className="text-left col-span-8">
              ※最大5行までプレビュー表示されます
            </span>
            <div className="flex items-center justify-end col-span-2">
              <DownloadButton filename={data.name} value={data.raw} />
            </div>
          </div>
          <div className="w-full overflow-auto">
            <TableView defaultData={data.content.slice(0, 5)} />
          </div>
        </div>
      )}

      {isLogin && (
        <div className="w-[99vw] text-black bg-blue-100 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 px-[10px] py-[50px] max-w-[1000px]">
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
        </div>
      )}
    </article>
  );
};
