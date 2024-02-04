import { useRef, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { useFileList } from './use-file-list';
import { v4 as uuidv4 } from 'uuid';
import assetFetcher from '@/lib/fetch/asset-fetcher';
import { parse } from 'csv-parse/sync';
import { Message } from '@/types/message';

export const postPrompt = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      file?: File;
      prompt: string;
      uuid: string;
      setMessages: (func: ((prev: Message[]) => Message[]) | Message[]) => void;
      updateLastMessage: (newMessage: string) => void;
      checkCancel: () => boolean;
    };
  }
) => {
  const body = new FormData();
  body.append('message', arg.prompt);

  if (arg.file) {
    body.append('file', arg.file);
    body.append('extension', arg.file.name.split('.').at(-1) || '');
  }
  body.append('uuid', arg.uuid);

  let response = await fetch('/api/chat', {
    method: 'POST',
    body,
  });

  if (response.status !== 200) {
    alert('メッセージの受信に失敗しました。再度実行してください。');
    return;
  }

  const reader = response?.body
    ?.pipeThrough(new TextDecoderStream())
    .getReader();

  if (!reader) return;

  arg.setMessages((prev) => [
    ...prev,
    {
      role: 'assistant',
      content: 'Thinking now...\n',
    },
  ]);

  while (true) {
    if (arg.checkCancel()) {
      console.info();
      await reader.cancel();
      break;
    }

    const { value, done } = await reader.read();
    if (done) break;

    const messageList = value.split('\n').map((line) => {
      const jsonString = line.slice(6);
      if (jsonString === '') return '';

      try {
        const json = JSON.parse(jsonString);

        if (json.message || json.code) {
          return json.message || json.code;
        } else if (json['end_of_code']) {
          return '\n```\n';
        } else if (json['start_of_code']) {
          return '\n```python\n';
        } else {
          return '';
        }
      } catch (e) {
        console.error(e);
        return '';
      }
    });
    arg.updateLastMessage(messageList.join(''));
  }
};

export const useInputPrompt = (initialPrompt: string | undefined) => {
  const [prompt, setPrompt] = useState<string>(initialPrompt || '');
  const { fileList, addFile, removeFile, resetFileList } = useFileList([]);
  const [isChatting, setIsChatting] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [uuid, setUUid] = useState<string>(uuidv4());

  const isCancelRef = useRef(false);

  const updatePrompt = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  const checkCancel = () => {
    return isCancelRef.current;
  };

  const updateLastMessage = (newMessage: string) => {
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage.role === 'assistant') {
        return [
          ...prev.slice(0, prev.length - 1),
          {
            role: 'assistant',
            content: lastMessage.content + newMessage,
          },
        ];
      } else {
        return [...prev];
      }
    });
  };

  const updateLastMessageWithFile = (file: string) => {
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage.role === 'assistant') {
        return [
          ...prev.slice(0, prev.length - 1),
          {
            role: 'assistant',
            content: lastMessage.content,
            file: file
              ? {
                  name: 'output.csv',
                  content: parseCsv(file),
                  raw: file,
                }
              : undefined,
          },
        ];
      } else {
        return [...prev];
      }
    });
  };

  const { trigger, isMutating } = useSWRMutation('/chat', postPrompt);

  const cancelChat = () => {
    isCancelRef.current = true;
  };

  const actionUsePrompt = async () => {
    setIsChatting(true);

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: prompt,
      },
    ]);

    try {
      await trigger({
        file: fileList[0],
        prompt,
        uuid,
        setMessages,
        updateLastMessage,
        checkCancel,
      });
    } catch (err) {
      console.error(err);
      alert('エラーが発生しました。再度送信してください。');
      setIsChatting(false);
      isCancelRef.current = false;
      return;
    }

    if (isCancelRef.current) {
      setIsChatting(false);
      isCancelRef.current = false;
      return;
    }

    // 一定時間待つ
    await new Promise((resolve) => setTimeout(resolve, 5000));

    try {
      const data = await assetFetcher(uuid);
      data.length > 0 && updateLastMessageWithFile(data);
    } catch (e) {
      alert('ファイルの取得に失敗しました。');
      console.error(e);
    }

    setPrompt('');
    resetFileList();
    setIsChatting(false);
    isCancelRef.current = false;
  };

  return {
    prompt,
    updatePrompt,
    actionUsePrompt,
    isLoading: isMutating,
    fileList,
    addFile,
    removeFile,
    messages,
    isChatting,
    cancelChat,
  };
};

const parseCsv = (csv: string) => {
  try {
    return parse(csv, { columns: true });
  } catch (e) {
    alert('CSV変換に失敗しました。');
    return [];
  }
};
