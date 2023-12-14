'use client';
import React, { FC, useState } from 'react';

import { Header } from '../organizms/header/Header';
import './story-page.scss';
import { Hero } from '@/components/molecules/hero/Hero';
import { User } from '@/types/user';
import { Footer } from '@/components/organizms/footer/Footer';

export const StoryPage: FC = () => {
  const [user, setUser] = useState<User>();

  return (
    <article>
      <Header
        user={user}
        onLogin={() => setUser({ name: 'dx-junkyard' })}
        onLogout={() => setUser(undefined)}
      />

      <Hero />
      <Footer />
    </article>
  );
};
