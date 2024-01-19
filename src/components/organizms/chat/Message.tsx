import { FC } from 'react';
import { cn } from '@/util/cn';
import MarkdownArea from '@/components/atoms/ui-parts/markdown-area/MarkdownArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

const ICON_SIZE = 28;

interface MessageProps {
  message: { role: string; content: string };
}

export const Message: FC<MessageProps> = ({ message }) => {
  return (
    <div
      className={cn(
        'flex w-full justify-center',
        message.role === 'user' ? '' : 'bg-gray-50'
      )}
    >
      <div className="relative flex w-[300px] flex-col py-6 sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] ">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            {message.role === 'assistant' ? (
              <div className="bg-primary text-secondary border-primary rounded border-[1px] p-1 text-black">
                <FontAwesomeIcon
                  icon={faRobot}
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                />
              </div>
            ) : (
              <div className="bg-primary text-secondary border-primary rounded border-[1px] p-1 text-black">
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
          <MarkdownArea value={message.content} />
        </div>
      </div>
    </div>
  );
};
