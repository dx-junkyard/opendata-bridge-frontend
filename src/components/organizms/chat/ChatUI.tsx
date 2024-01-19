import { FC } from 'react';
import { ChatInput } from './ChatInput';
import { ChatMessages } from './ChatMessages';

interface ChatUIProps {}

export const ChatUI: FC<ChatUIProps> = ({}) => {
  return (
    <div className="relative flex h-full flex-col items-center">
      <div className="flex h-full w-full flex-col overflow-auto border-b">
        <ChatMessages
          chatMessages={[
            {
              role: 'user',
              content: 'Hello',
            },
            {
              role: 'assistant',
              content: 'Hi',
            },
          ]}
        />
      </div>

      <div className="relative w-[300px] items-end pb-8 pt-5 sm:w-[400px] md:w-[500px] lg:w-[660px] xl:w-[800px]">
        <ChatInput />
      </div>
    </div>
  );
};
