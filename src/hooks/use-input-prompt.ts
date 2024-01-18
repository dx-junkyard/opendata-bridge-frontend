import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { useFileList } from './use-file-list';
import { v4 as uuidv4 } from 'uuid';
import { CsvFile } from '@/types/csv-file';
import assetFetcher from '@/lib/fetch/asset-fetcher';
import { parse } from 'csv-parse/sync';
import { postPrompt } from '@/service/post-prompt-service';

export const useInputPrompt = (initialPrompt: string | undefined) => {
  const [prompt, setPrompt] = useState<string>(initialPrompt || '');
  const [result, setResult] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const { fileList, addFile, removeFile } = useFileList([]);
  const [output, setOutput] = useState<string>('');

  const updatePrompt = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  const { trigger, isMutating } = useSWRMutation('/chat', postPrompt);

  const actionUsePrompt = async () => {
    if (fileList.length > 0) {
      const uuid = uuidv4();
      await trigger({
        file: fileList[0],
        prompt,
        setResult,
        uuid,
        setCode,
      });

      // 10秒待つ
      await new Promise((resolve) => setTimeout(resolve, 10000));

      try {
        const data = await assetFetcher(uuid);
        setOutput(data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return {
    prompt,
    updatePrompt,
    actionUsePrompt,
    isLoading: isMutating,
    result,
    fileList,
    addFile,
    removeFile,
    code,
    output: {
      name: 'output.csv',
      content: parseCsv(output),
      raw: output || '',
    } as CsvFile,
  };
};

const parseCsv = (csv: string) => {
  try {
    return parse(csv, { columns: true });
  } catch (e) {
    return [];
  }
};
