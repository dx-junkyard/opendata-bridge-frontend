import { useSGE } from '@/hooks/use-sge';
import { Button } from '@/components/atoms/ui-parts/button/Button';
import MarkdownArea from '@/components/atoms/ui-parts/markdown-area/MarkdownArea';
import React from 'react';
import LoadingPulse from '@/components/atoms/ui-parts/lodaing-pulse/LoadingPulse';

interface SgeProps {
  query: string;
}

const Sge = () => {
  const { answer, actionSGE, enable } = useSGE();

  return (
    <div className="w-full flex items-center justify-center">
      {!enable ? (
        <Button
          color={'primary'}
          size={'2xl'}
          label={'AIによる概要を生成する'}
          onClick={actionSGE}
        />
      ) : answer.length > 0 ? (
        <div className="border rounded w-full ">
          <MarkdownArea value={answer} />
        </div>
      ) : (
        <div className="border rounded w-full">
          <div className="w-full text-black p-3">
            <LoadingPulse />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sge;
