import { FC } from 'react';
import { ChatMessage } from './ChatMessage';
import { Message } from '@/types/message';

interface ChatMessagesProps {
  chatMessages: Message[];
}

export const ChatMessages: FC<ChatMessagesProps> = ({ chatMessages }) => {
  return chatMessages.map((message, index) => {
    return <ChatMessage key={index} message={message} />;
  });
};
