import React, { FC } from 'react';
import { ChatInput } from './ChatInput';
import { ChatMessages } from './ChatMessages';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/molecules/project/project-card/ProjectCard';
import { useInputPrompt } from '@/hooks/use-input-prompt';

interface ChatUIProps {
  project: Project;
}

export const ChatUI: FC<ChatUIProps> = ({ project }) => {
  const {
    prompt,
    updatePrompt,
    actionUsePrompt,
    fileList,
    addFile,
    removeFile,
    messages,
    isChatting,
    cancelChat,
  } = useInputPrompt(project.recipes[0]?.prompt || '');

  return (
    <div className="relative flex h-full flex-col items-center mb-[200px]">
      <div className="flex h-full w-full flex-col">
        {messages.length > 0 ? (
          <ChatMessages chatMessages={messages} />
        ) : (
          <div className="w-[99vw] h-full bg-white text-black flex justify-center">
            <div className="w-full md:w-[768px] flex justify-center flex-col mx-3">
              <ProjectCard project={project} />
            </div>
          </div>
        )}
      </div>

      <div className="fixed z-50 bottom-0 items-end w-[99vw] text-black bg-white border-t flex justify-center">
        <div className="w-full md:w-[768px] mx-3">
          <ChatInput
            addFile={addFile}
            fileList={fileList}
            removeFile={removeFile}
            prompt={prompt}
            updatePrompt={updatePrompt}
            actionUsePrompt={actionUsePrompt}
            isChatting={isChatting}
            cancelChat={cancelChat}
          />
        </div>
      </div>
    </div>
  );
};
