import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import { config } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { getServerSession } from 'next-auth';
import { User } from '@/types/user';
import { Header } from '@/components/organizms/header/Header';
import { Footer } from '@/components/organizms/footer/Footer';
import { authOptions } from '@/lib/next-auth/auth-options';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OpendataBridge',
  description: '利用目的で探せるオープンデータ検索サービス',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  const user = session?.user?.name
    ? ({
        name: session.user.name,
      } as User)
    : undefined;

  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header user={user} />
        <div className="h-[80px]" />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
