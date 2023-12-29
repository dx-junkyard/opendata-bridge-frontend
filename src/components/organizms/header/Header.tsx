import React from 'react';

import './header.scss';
import Image from 'next/image';
import { User } from '@/types/user';
import { GlobalUserMenu } from '@/components/atoms/global-menu/user/GlobalUserMenu';
import Link from 'next/link';
import { LoginModal } from '@/components/molecules/login-modal/LoginModal';
import LogoutMenu from '@/components/molecules/logout-menu/LogoutMenu';

interface HeaderProps {
  user?: User;
}

export const Header = ({ user }: HeaderProps) => {
  return (
    <header className="flex items-center header bg-white text-black">
      <Link href={'/'} className="flex items-center">
        <Image src="/logo.svg" alt={'logo'} width={54} height={54} />
        <h1 className="font-bold text-2xl leading-none">Opendata Bridge</h1>
      </Link>
      <div className="flex items-center space-x-8">
        {user ? (
          <>
            <GlobalUserMenu user={user} />
            <LogoutMenu />
          </>
        ) : (
          <>
            <GlobalUserMenu user={undefined} />
            <LoginModal />
          </>
        )}
      </div>
    </header>
  );
};
