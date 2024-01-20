'use client';
import React from 'react';
import { Hero } from '@/components/atoms/ui-parts/hero/Hero';
import { Button } from '@/components/atoms/ui-parts/button/Button';
import { useLogin } from '@/hooks/use-login';

export const GuestHome = () => {
  const { loginForm, setEmail, setPassword, login } = useLogin();

  return (
    <article className="w-full flex flex-col justify-center items-center">
      <Hero />
      <div className="z-50 bg-white w-full h-full my-7 flex flex-col justify-center items-center space-y-10 text-left">
        <div className="space-y-4 text-black w-full md:w-[60%]">
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
      </div>
    </article>
  );
};
