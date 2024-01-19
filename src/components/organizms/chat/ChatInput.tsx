import React, { FC, useRef, useState } from 'react';
import { Input } from './Input';
import { TextareaAutosize } from './TextareaAutosize';
import { cn } from '@/util/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface ChatInputProps {}

export const ChatInput: FC<ChatInputProps> = ({}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userInput, setUserInput] = useState<string>('');

  const handleInputChange = (value: string) => {
    setUserInput(value);
  };

  return (
    <>
      <div className="border-input relative mt-3 flex min-h-[60px] w-full items-center justify-center rounded-xl border-2">
        <>
          <div className="absolute bottom-[12px] left-3 cursor-pointer p-1 hover:opacity-50 text-black">
            <FontAwesomeIcon icon={faCirclePlus} width={32} height={32} />
          </div>

          <Input
            ref={fileInputRef}
            className="hidden"
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (!e.target.files) return;
              //   handleSelectDeviceFile(e.target.files[0])
            }}
            // accept={filesToAccept}
          />
        </>

        <TextareaAutosize
          className="ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring text-md flex w-full resize-none rounded-md border-none bg-transparent px-14 py-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={`Ask anything. Type "/" for prompts, "@" for files, and "#" for tools.`}
          onValueChange={handleInputChange}
          value={userInput}
          minRows={1}
          maxRows={18}
          //   onKeyDown={handleKeyDown}
          //   onPaste={handlePaste}
          //   onCompositionStart={() => setIsTyping(true)}
          //   onCompositionEnd={() => setIsTyping(false)}
        />

        <div className="absolute bottom-[14px] right-3 cursor-pointer hover:opacity-50 text-black">
          <div
            className={cn(
              'bg-primary text-secondary rounded p-1',
              !userInput && 'cursor-not-allowed opacity-50'
            )}
          >
            <FontAwesomeIcon icon={faPaperPlane} width={30} height={30} />
          </div>
        </div>
      </div>
    </>
  );
};
