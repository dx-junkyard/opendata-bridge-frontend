import React, { FC, useRef, useState } from 'react';
import { Input } from './Input';
import { TextareaAutosize } from './TextareaAutosize';
import { cn } from '@/util/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { InputFileList } from '@/components/organizms/input-file-list/InputFileList';
import { faCirclePause } from '@fortawesome/free-regular-svg-icons';

interface ChatInputProps {
  fileList: File[];
  addFile: (file: File) => void;
  removeFile: (index: number) => void;
  prompt: string;
  updatePrompt: (value: string) => void;
  actionUsePrompt: () => void;
  isChatting: boolean;
  cancelChat: () => void;
}

export const ChatInput: FC<ChatInputProps> = ({
  fileList,
  addFile,
  removeFile,
  prompt,
  updatePrompt,
  actionUsePrompt,
  isChatting,
  cancelChat,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (
      !isTyping &&
      event.key === 'Enter' &&
      (event.ctrlKey || event.metaKey)
    ) {
      event.preventDefault();
      actionUsePrompt();
    }
  };

  return (
    <>
      <InputFileList fileList={fileList} removeFile={removeFile} />
      <div className="border-input relative my-5 flex min-h-[60px] w-full items-center justify-center rounded-xl border-2">
        <>
          <div
            className="absolute bottom-[12px] left-3 cursor-pointer p-1 hover:opacity-50 text-black"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <FontAwesomeIcon icon={faCirclePlus} width={32} height={32} />
          </div>

          <Input
            ref={fileInputRef}
            className="hidden"
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (!e.target.files) return;
              addFile(e.target.files[0]);
              e.target.value = '';
            }}
            accept={'*/*'}
          />
        </>

        <TextareaAutosize
          className="ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring text-md flex w-full resize-none rounded-md border-none bg-transparent px-14 py-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={`データ整形の方法についてご指示ください。例 : CSV形式に変換して保存してください。`}
          onValueChange={updatePrompt}
          value={prompt}
          minRows={1}
          maxRows={18}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsTyping(true)}
          onCompositionEnd={() => setIsTyping(false)}
        />

        {!isChatting ? (
          <div
            className="absolute bottom-[14px] right-3 cursor-pointer hover:opacity-50 text-black"
            onClick={() => {
              actionUsePrompt();
            }}
          >
            <div
              className={cn(
                'bg-primary text-secondary rounded p-1',
                !prompt && 'cursor-not-allowed opacity-50'
              )}
            >
              <FontAwesomeIcon icon={faPaperPlane} width={30} height={30} />
            </div>
          </div>
        ) : (
          <div
            className="absolute bottom-[14px] right-3 cursor-pointer hover:opacity-50 text-black"
            onClick={() => {
              cancelChat();
            }}
          >
            <div
              className={cn(
                'bg-primary text-secondary rounded p-1',
                !prompt && 'cursor-not-allowed opacity-50'
              )}
            >
              <FontAwesomeIcon icon={faCirclePause} width={30} height={30} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
