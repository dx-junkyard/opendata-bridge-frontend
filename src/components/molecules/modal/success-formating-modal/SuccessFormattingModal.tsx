'use client';
import { Button } from '@/components/atoms/ui-parts/button/Button';
import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';

import 'react-responsive-modal/styles.css';

import './success-formatting-modal.scss';

export const SuccessFormattingModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="w-full bg-white flex justify-center items-center">
      <Button
        color={'primary'}
        size={'2xl'}
        label={'データ整形を実行する'}
        onClick={openModal}
      />
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        center
        classNames={{
          modal: 'success-formatting-modal',
        }}
      >
        <div className="bg-white h-full flex flex-col justify-center items-center space-y-5 md:px-[50px]">
          <div className="text-left space-y-4">
            <p className="text-2xl text-black font-bold">
              ファイルの整形に成功しました
            </p>
            <p className="text-sm text-black">
              整形済みのファイルをダウンロードしましょう
            </p>
          </div>
          <Button color={'primary'} size={'2xl'} label={'ダウンロードする'} />
          <p
            className="text-sm text-center text-blue-700 underline"
            onClick={closeModal}
          >
            ダウンロードせず閉じる
          </p>
        </div>
      </Modal>
    </div>
  );
};
