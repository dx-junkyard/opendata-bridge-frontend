import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import { config } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { Header } from '@/components/organizms/header/Header';
import { Footer } from '@/components/organizms/footer/Footer';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OpendataBridge',
  description: '利用目的で探せるオープンデータ検索サービス',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header user={undefined} onLogin={() => {}} onLogout={() => {}} />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
