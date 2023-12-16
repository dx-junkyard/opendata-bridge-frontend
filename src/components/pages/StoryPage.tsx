'use client';
import React, { FC, useState } from 'react';

import { Header } from '../organizms/header/Header';
import './story-page.scss';
import { Hero } from '@/components/molecules/hero/Hero';
import { User } from '@/types/user';
import { Footer } from '@/components/organizms/footer/Footer';
import { SearchWindow } from '@/components/organizms/search-window/SearchWindow';

export const StoryPage: FC = () => {
  const [user, setUser] = useState<User>();
  const [query, setQuery] = useState<string>('');

  return (
    <>
      <Header
        user={user}
        onLogin={() => setUser({ name: 'dx-junkyard' })}
        onLogout={() => setUser(undefined)}
      />
      <article>
        <Hero />
        <SearchWindow query={query} updateQuery={setQuery} />
      </article>
      <Footer />
    </>
  );
};
