'use client';
import React from 'react';
import ChatUI from '@/components/organizms/chat/ChatUI';

interface ChatProps {}

const Chat = () => {
  return (
    <article className="w-full flex flex-col justify-center items-center">
      <ChatUI history={[]} />
    </article>
  );
};

export default Chat;
