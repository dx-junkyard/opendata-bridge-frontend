import React, { FC } from 'react';
import { cn } from '@/util/cn';
import MarkdownArea from '@/components/atoms/ui-parts/markdown-area/MarkdownArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { Message } from '@/types/message';
import DownloadButton from '@/components/atoms/ui-parts/download-button/DownloadButton';
import { TableView } from '@/components/atoms/ui-parts/table/TableView';
import LoadingPulse from '@/components/atoms/ui-parts/lodaing-pulse/LoadingPulse';

const ICON_SIZE = 28;

interface MessageProps {
  message: Message;
  isLoading: boolean;
}

export const ChatMessage: FC<MessageProps> = ({ message, isLoading }) => {
  return (
    <div
      className={cn(
        'flex w-[99vw] justify-center',
        message.role === 'user' ? '' : 'bg-gray-50'
      )}
    >
      <div className="relative flex flex-col py-6 w-full md:w-[768px]">
        <div className="space-y-3 mx-3">
          <div className="flex items-center space-x-3">
            {message.role === 'assistant' ? (
              <div
                className={cn(
                  'bg-primary text-secondary border-primary rounded border-[1px] p-1 text-black',
                  `w-[${ICON_SIZE}px] h-[${ICON_SIZE}px]`
                )}
              >
                <FontAwesomeIcon
                  icon={faRobot}
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                />
              </div>
            ) : (
              <div
                className={cn(
                  'bg-primary text-secondary border-primary rounded border-[1px] p-1 text-black',
                  `w-[${ICON_SIZE}px] h-[${ICON_SIZE}px]`
                )}
              >
                <FontAwesomeIcon
                  icon={faFaceSmile}
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                />
              </div>
            )}

            <div className="font-semibold text-black">
              {message.role === 'assistant' ? 'AI Assistant' : 'You'}
            </div>
          </div>
          {isLoading ? (
            <div className="w-full text-black p-3">
              <LoadingPulse />
            </div>
          ) : (
            <MarkdownArea value={message.content} />
          )}

          {message.file?.content.length && (
            <div className="w-full flex flex-col text-black">
              <h3 className="text-sm">整形されたデータ</h3>
              <div className="grid grid-cols-10">
                <span className="text-left col-span-8">
                  ※最大5行までプレビュー表示されます
                </span>
                <div className="flex items-center justify-end col-span-2">
                  <DownloadButton
                    filename={message.file.name}
                    value={message.file.raw}
                  />
                </div>
              </div>
              <div className="w-full overflow-scroll">
                <TableView defaultData={message.file.content.slice(0, 5)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
