'use client';
import { Button } from '@/components/atoms/ui-parts/button/Button';
import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';

import 'react-responsive-modal/styles.css';

import './select-file-modal.scss';
import { useFetchDataset } from '@/hooks/use-fetch-dataset';
import DatasetCardList from '@/components/molecules/project/dataset-card-list/DatasetCardList';
import { Dataset } from '@/types/dataset';
import fetchAsset from '@/service/fetch-asset';

interface SelectFileModalProps {
  addFile: (file: File) => void;
}

const SelectFileModal = ({ addFile }: SelectFileModalProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const { datasetList } = useFetchDataset();

  return (
    <div className="w-full bg-white flex justify-center items-center">
      <Button
        color={'secondary'}
        size={'2xl'}
        label={'登録済みオープンデータから選ぶ'}
        onClick={openModal}
        isLoading={isLoading}
      />
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        center
        classNames={{
          modal: 'select-file-modal',
        }}
      >
        <div className="bg-white h-full flex flex-col justify-center items-center space-y-5 w-full">
          <div className="text-left space-y-4 w-full">
            <p className="text-2xl text-black font-bold">
              オープンデータを選択してください
            </p>
            <p className="text-sm text-black">登録済オープンデータ一覧</p>
          </div>

          <div className="overflow-y-auto max-h-[300px] w-full">
            <DatasetCardList
              datasetList={datasetList}
              onClickItem={async (dataset: Dataset) => {
                setIsLoading(true);
                closeModal();
                const asset = await fetch(`/api/dataset/asset/${dataset.id}`);
                addFile(new File([await asset.text()], dataset.title));
                setIsLoading(false);
              }}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-3 place-content-center w-full">
            <div className="md:col-start-4">
              <Button
                color={'secondary'}
                size={'xl'}
                label={'閉じる'}
                onClick={closeModal}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SelectFileModal;
