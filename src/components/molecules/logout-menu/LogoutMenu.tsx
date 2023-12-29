'use client';
import { signOut } from 'next-auth/react';
import { GlobalVanillaMenu } from '@/components/atoms/global-menu/vanilla/GlobalVanillaMenu';
import React from 'react';

const LogoutMenu = () => {
  return (
    <button
      onClick={async () =>
        await signOut({
          callbackUrl: '/',
        })
      }
    >
      <GlobalVanillaMenu title={'ログアウト'} />
    </button>
  );
};

export default LogoutMenu;
