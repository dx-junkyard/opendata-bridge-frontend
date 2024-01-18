import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { useFileList } from './use-file-list';
import { v4 as uuidv4 } from 'uuid';
import { CsvFile } from '@/types/csv-file';
import assetFetcher from '@/lib/fetch/asset-fetcher';
import { parse } from 'csv-parse/sync';
import { postPrompt } from '@/service/post-prompt-service';

export const useInputRecipe = (initialRecipe: string | undefined) => {
  const [recipe, setRecipe] = useState<string>(initialRecipe || '');
  const [result, setResult] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const { fileList, addFile, removeFile } = useFileList([]);
  const [output, setOutput] = useState<string>('');

  const updateRecipe = (newRecipe: string) => {
    setRecipe(newRecipe);
  };

  const { trigger, isMutating } = useSWRMutation('/chat', postPrompt);

  const actionUsePrompt = async () => {
    if (fileList.length > 0) {
      const uuid = uuidv4();
      await trigger({
        file: fileList[0],
        prompt: buildPrompt(recipe),
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
    recipe,
    updateRecipe,
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

const buildPrompt = (recipe: string) => {
  return `以下のpythonコードを実行してください。日本語で回答してください。パッケージの確認は不要です。\n===\n${recipe}`;
};
