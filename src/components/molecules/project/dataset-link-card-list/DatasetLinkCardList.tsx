import { Dataset } from '@/types/dataset';
import { DatasetCard } from '@/components/molecules/project/dataset-card/DatasetCard';
import React from 'react';
import Link from 'next/link';

interface DatasetCardListProps {
  datasetList: Dataset[];
}

const DatasetLinkCardList = ({ datasetList }: DatasetCardListProps) => {
  return datasetList.length > 0 ? (
    <div className="w-full">
      {datasetList.map((dataset, index) => {
        return (
          <Link key={index} href={dataset.url} target="_blank">
            <DatasetCard
              dataset={{
                id: dataset.id,
                title: dataset.title,
                organization: dataset.organization,
                url: dataset.url,
                assetUrl: dataset.assetUrl,
              }}
            />
          </Link>
        );
      })}
    </div>
  ) : (
    <div className="w-full h-[100px] bg-gray-50 rounded-xl text-gray-600 flex justify-center items-center text-center">
      <p>登録データがありません</p>
    </div>
  );
};

export default DatasetLinkCardList;
