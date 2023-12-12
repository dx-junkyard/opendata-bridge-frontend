import React from 'react';

import { Button } from '../../atoms/button/Button';
import './header.scss';
import Image from 'next/image';

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
}

export const Header = ({ user, onLogin, onLogout }: HeaderProps) => (
  <header>
    <div className="flex items-center storybook-header bg-white">
      <div className="flex items-center">
        <Image src="/logo.svg" alt={'logo'} width={54} height={54} />
        <h1 className="text-black font-bold text-2xl leading-none">
          Opendata Bridge
        </h1>
      </div>
      <div>
        {user ? (
          <>
            <span className="welcome">
              Welcome, <b>{user.name}</b>!
            </span>
            <Button size="small" onClick={onLogout} label="Log out" />
          </>
        ) : (
          <>
            <Button size="small" onClick={onLogin} label="Log in" />
            <Button primary size="small" label="Sign up" />
          </>
        )}
      </div>
    </div>
  </header>
);
