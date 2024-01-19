import { FC } from 'react';
import { Message } from './Message';

interface ChatMessagesProps {
  chatMessages: { role: string; content: string }[];
}

export const ChatMessages: FC<ChatMessagesProps> = ({ chatMessages }) => {
  return chatMessages.map((message, index) => {
    return <Message key={index} message={message} />;
  });
};
