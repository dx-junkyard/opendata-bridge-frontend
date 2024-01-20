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
  } = useInputPrompt(project.recipes[0]?.prompt || '');

  return (
    <div className="relative flex h-full flex-col items-center">
      <div className="flex h-[500px] w-full flex-col overflow-auto border-b">
        {messages.length > 0 ? (
          <ChatMessages chatMessages={messages} />
        ) : (
          <div className="w-screen h-full bg-white text-black flex justify-center">
            <div className="sm:w-[400px] h-[300px] md:w-[500px] lg:w-[600px] xl:w-[700px] flex justify-center flex-col">
              <ProjectCard project={project} />
            </div>
          </div>
        )}
      </div>

      <div className="relative w-[300px] items-end sm:w-[400px] md:w-[500px] lg:w-[660px] xl:w-[800px] text-black">
        <ChatInput
          addFile={addFile}
          fileList={fileList}
          removeFile={removeFile}
          prompt={prompt}
          updatePrompt={updatePrompt}
          actionUsePrompt={actionUsePrompt}
          isChatting={isChatting}
        />
      </div>
    </div>
  );
};
