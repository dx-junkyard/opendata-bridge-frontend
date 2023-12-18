'use client';
import React from 'react';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/molecules/project-card/ProjectCard';
import { SearchFilter } from '@/components/atoms/search/filter/SearchFilter';
import { Button } from '@/components/atoms/button/Button';
import { DatasetCard } from '@/components/molecules/dataset-card/DatasetCard';

interface DetailProjectProps {
  project: Project;
}

export const DetailProject = ({ project }: DetailProjectProps) => {
  return (
    <article>
      <div className="bg-white text-black px-[220px] py-[50px] flex flex-col space-y-2">
        <h1 className="text-4xl">プロジェクト詳細情報</h1>
        <ProjectCard project={project} />
        <div className="flex space-x-8">
          <Button
            color={'primary'}
            size={'large'}
            label={'ラベルA'}
            onClick={() => {}}
          />
          <Button
            color={'primary'}
            size={'large'}
            label={'ラベルB'}
            onClick={() => {}}
          />
          <Button
            color={'primary'}
            size={'large'}
            label={'ラベルC'}
            onClick={() => {}}
          />
        </div>
      </div>
      <div className="bg-white text-black px-[220px] py-[50px] flex flex-col space-y-2">
        <h2 className="text-xl">変換元のオープンデータのリンク一覧</h2>
        <div>
          <DatasetCard
            dataset={{
              title: 'ファイル名1',
              organization: '自治体名1',
              url: '',
            }}
          />
          <DatasetCard
            dataset={{
              title: 'ファイル名2',
              organization: '自治体名2',
              url: '',
            }}
          />
          <DatasetCard
            dataset={{
              title: 'ファイル名3',
              organization: '自治体名3',
              url: '',
            }}
          />
        </div>
      </div>
    </article>
  );
};
