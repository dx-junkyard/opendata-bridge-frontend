'use client';
import React, { useState } from 'react';

import './header.scss';
import Image from 'next/image';
import { User } from '@/types/user';
import { GlobalUserMenu } from '@/components/atoms/global-menu/user/GlobalUserMenu';
import Link from 'next/link';
import { LoginModal } from '@/components/molecules/user/login-modal/LoginModal';
import LogoutMenu from '@/components/molecules/user/logout-menu/LogoutMenu';

interface HeaderProps {
  user?: User;
}

export const Header = ({ user }: HeaderProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleMenuOpen = () => {
    setOpen(!isOpen);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <header className="flex items-center header bg-white text-black w-full fixed z-10">
      <Link href={'/'} className="flex items-center">
        <Image src="/logo.svg" alt={'logo'} width={54} height={54} />
        <h1 className="font-bold text-2xl leading-none">Opendata Bridge</h1>
      </Link>

      <nav
        className={
          isOpen
            ? 'z-20 bg-white fixed top-[80px] right-0 left-0 flex flex-col'
            : 'fixed right-[-100%] md:right-4'
        }
      >
        <ul
          className={
            isOpen
              ? 'flex justify-center items-center flex-col md:gap-6 text-xl'
              : 'block md:flex md:gap-8'
          }
        >
          {user ? (
            <>
              <li className="w-full">
                <GlobalUserMenu user={user} />
              </li>
              <li className="w-full">
                <LogoutMenu />
              </li>
            </>
          ) : (
            <>
              <li className="w-full">
                <GlobalUserMenu user={undefined} />
              </li>
              <li className="w-full" onClick={handleMenuClose}>
                <LoginModal />
              </li>
            </>
          )}
        </ul>
      </nav>

      <button className="space-y-2 md:hidden" onClick={handleMenuOpen}>
        <span
          className={
            'block w-8 h-0.5 bg-gray-600 duration-300' +
            (isOpen ? ' translate-y-[0.3rem] rotate-45' : '')
          }
        />
        <span
          className={
            'block duration-300' +
            (isOpen ? ' opacity-0' : ' w-8 h-0.5 bg-gray-600')
          }
        />
        <span
          className={
            'block w-8 h-0.5 bg-gray-600 duration-300' +
            (isOpen ? ' -translate-y-[0.3rem] -rotate-45' : '')
          }
        />
      </button>
    </header>
  );
};
