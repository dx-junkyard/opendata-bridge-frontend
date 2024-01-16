import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { useFileList } from './use-file-list';
import { v4 as uuidv4 } from 'uuid';
import { parse } from 'csv-parse/sync';
import { CsvFile } from '@/types/csv-file';

const postActionUseRecipe = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      file: File;
      prompt: string;
      setResult: (func: ((prev: any) => any) | string) => void;
      uuid: string;
      setCode: (func: ((prev: any) => any) | string) => void;
      setOutput: (CsvFile: CsvFile | undefined) => void;
    };
  }
) => {
  // 成果物を一度リセット
  arg.setResult('');
  arg.setCode('');
  arg.setOutput(undefined);

  const body = new FormData();
  body.append('file', arg.file);
  body.append('message', arg.prompt);
  body.append('extension', arg.file.name.split('.').at(-1) || '');
  body.append('uuid', arg.uuid);

  const response = await fetch('/api/chat', {
    method: 'POST',
    body,
  });

  const reader = response?.body
    ?.pipeThrough(new TextDecoderStream())
    .getReader();

  if (!reader) return;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const codeList: string[] = [];
    const messageList = value.split('\n').map((line) => {
      const jsonString = line.slice(6);
      if (jsonString === '') return '';

      try {
        const json = JSON.parse(jsonString);

        if (json.code) codeList.push(json.code);

        if (json.message) {
          return json.message;
        } else {
          return '';
        }
      } catch (e) {
        console.error(e);
        return '';
      }
    });
    arg.setResult((prev) => prev + messageList.join(''));
    arg.setCode((prev) => prev + codeList.join(''));
  }

  // 3秒待つ
  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (arg.setOutput) {
    try {
      const output = await fetch('/api/asset/' + arg.uuid).then((res) =>
        res.text()
      );
      const csvData = parse(output, { columns: true });
      arg.setOutput({
        name: 'output.csv',
        content: csvData,
        raw: output,
      } as CsvFile);
    } catch (e) {
      console.error(e);
    }
  }
};

export const useInputPrompt = (initialPrompt: string | undefined) => {
  const [prompt, setPrompt] = useState<string>(initialPrompt || '');
  const [result, setResult] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const { fileList, addFile, removeFile } = useFileList([]);
  const [output, setOutput] = useState<CsvFile | undefined>(undefined);
  const uuid = uuidv4();

  const updatePrompt = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  const { trigger, isMutating } = useSWRMutation('/chat', postActionUseRecipe);

  const actionUsePrompt = async () => {
    if (fileList.length > 0) {
      await trigger({
        file: fileList[0],
        prompt,
        setResult,
        uuid,
        setCode,
        setOutput,
      });
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
    output,
  };
};
