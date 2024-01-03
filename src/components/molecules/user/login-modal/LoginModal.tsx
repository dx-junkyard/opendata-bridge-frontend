'use client';
import { Button } from '@/components/atoms/ui-parts/button/Button';
import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { GlobalVanillaMenu } from '@/components/atoms/global-menu/vanilla/GlobalVanillaMenu';
import { useLogin } from '@/hooks/use-login';

import 'react-responsive-modal/styles.css';

import './login-modal.scss';

export const LoginModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const { loginForm, setEmail, setPassword, login } = useLogin();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <button className="w-full" onClick={openModal}>
        <GlobalVanillaMenu title={'ログイン'} />
      </button>
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        center
        classNames={{
          modal: 'customModal',
        }}
      >
        <div className="z-50 bg-white h-full flex flex-col justify-center items-center space-y-10 text-left">
          <div className="space-y-4 text-black w-full xl:w-[60%]">
            <p className="text-2xl font-bold">ログイン</p>
            <p className="text-sm">メールアドレス</p>
            <input
              className="border border-blue-700 px-[5px] rounded w-full text-xl"
              type="email"
              value={loginForm.email}
              placeholder={'メールアドレス'}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-sm text-black">パスワード</p>
            <input
              className="border border-blue-700 px-[10px] rounded w-full text-xl"
              type="password"
              value={loginForm.password}
              placeholder={'パスワード'}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            color={'primary'}
            size={'2xl'}
            label={'ログインする'}
            onClick={login}
          />
          <p
            className="text-sm text-center text-blue-700 underline"
            onClick={closeModal}
          >
            ログインせず閉じる
          </p>
        </div>
      </Modal>
    </>
  );
};
