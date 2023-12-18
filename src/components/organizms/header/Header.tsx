import React from 'react';

import './header.scss';
import Image from 'next/image';
import { GlobalVanillaMenu } from '@/components/atoms/global-menu/vanilla/GlobalVanillaMenu';
import { User } from '@/types/user';
import { GlobalUserMenu } from '@/components/atoms/global-menu/user/GlobalUserMenu';
import Link from 'next/link';

interface HeaderProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
}

export const Header = ({ user }: HeaderProps) => (
  <header className="flex items-center header bg-white text-black">
    <Link href={'/'} className="flex items-center">
      <Image src="/logo.svg" alt={'logo'} width={54} height={54} />
      <h1 className="font-bold text-2xl leading-none">Opendata Bridge</h1>
    </Link>
    <div className="flex items-center space-x-8">
      {user ? (
        <>
          <GlobalUserMenu user={user} />
          <GlobalVanillaMenu title={'ログアウト'} href={'/'} />
        </>
      ) : (
        <>
          <GlobalUserMenu user={undefined} />
          <GlobalVanillaMenu title={'ログイン'} href={'/'} />
        </>
      )}
    </div>
  </header>
);
