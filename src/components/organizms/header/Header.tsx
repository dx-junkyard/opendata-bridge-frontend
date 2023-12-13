import React from 'react';

import './header.scss';
import Image from 'next/image';
import { GlobalVanillaMenu } from '@/components/atoms/global-menu/vanilla/GlobalVanillaMenu';
import { User } from '@/types/user';
import { GlobalUserMenu } from '@/components/atoms/global-menu/user/GlobalUserMenu';

interface HeaderProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
}

export const Header = ({ user, onLogin, onLogout }: HeaderProps) => (
  <header>
    <div className="flex items-center storybook-header bg-white text-black">
      <div className="flex items-center">
        <Image src="/logo.svg" alt={'logo'} width={54} height={54} />
        <h1 className="font-bold text-2xl leading-none">Opendata Bridge</h1>
      </div>
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
    </div>
  </header>
);
