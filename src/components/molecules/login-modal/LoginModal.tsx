'use client';
import { Button } from '@/components/atoms/button/Button';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { GlobalVanillaMenu } from '@/components/atoms/global-menu/vanilla/GlobalVanillaMenu';
import { useLogin } from '@/hooks/use-login';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '400px',
  },
};

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
      <button onClick={openModal}>
        <GlobalVanillaMenu title={'ログイン'} />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="bg-white h-full flex flex-col justify-center items-center space-y-5">
          <div className="text-left space-y-4 w-[60%] text-black">
            <p className="text-xl font-bold">ログイン</p>
            <p className="text-sm ">ユーザ名</p>
            <input
              className="border border-blue-700 px-[10px] rounded w-full"
              type="email"
              value={loginForm.email}
              placeholder={'メールアドレス'}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-sm text-black">パスワード</p>
            <input
              className="border border-blue-700 px-[10px] rounded w-full"
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
