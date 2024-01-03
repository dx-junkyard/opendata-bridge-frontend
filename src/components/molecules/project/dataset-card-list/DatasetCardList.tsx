import { Dataset } from '@/types/dataset';
import { DatasetCard } from '@/components/molecules/project/dataset-card/DatasetCard';
import React from 'react';

interface DatasetCardListProps {
  datasetList: Dataset[];
  onClickItem: (dataset: Dataset) => void;
}

const DatasetCardList = ({
  datasetList,
  onClickItem,
}: DatasetCardListProps) => {
  return datasetList.length > 0 ? (
    <div className="w-full">
      {datasetList.map((dataset, index) => {
        return (
          <button key={index} onClick={() => onClickItem(dataset)}>
            <DatasetCard
              dataset={{
                id: dataset.id,
                title: dataset.title,
                organization: dataset.organization,
                url: dataset.url,
                assetUrl: dataset.assetUrl,
              }}
            />
          </button>
        );
      })}
    </div>
  ) : (
    <div className="w-full h-[100px] bg-gray-50 rounded-xl text-gray-600 flex justify-center items-center text-center">
      <p>登録データがありません</p>
    </div>
  );
};

export default DatasetCardList;
