import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { useFileList } from './use-file-list';
import { Message } from '@/types/message';

export const postPrompt = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      file?: File;
      script: string;
      setMessages: (func: ((prev: Message[]) => Message[]) | Message[]) => void;
      updateLastMessage: (newMessage: string) => void;
      updateLastMessageWithFile: (fileId: string) => void;
    };
  }
) => {
  const body = new FormData();
  body.append('script', arg.script);

  if (arg.file) {
    body.append('file', arg.file);
  }

  arg.setMessages((prev) => [
    ...prev,
    {
      role: 'assistant',
      content: '',
      datetime: new Date().toLocaleString(),
    },
  ]);

  const response = await fetch('/api/assistant/opendata-bridge-runner', {
    method: 'POST',
    body,
  });

  if (response.status !== 200) {
    arg.updateLastMessage(
      'AIとの接続に失敗しました。時間をおいて試してください。'
    );
  }

  const reader = response?.body
    ?.pipeThrough(new TextDecoderStream())
    .getReader();

  if (!reader) return;

  let fileId: string | undefined;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const messageList = value.split('\n').map((line) => {
      const jsonString = line.slice(6);
      if (jsonString === '') return '';

      try {
        const json = JSON.parse(jsonString);

        if (json.message) {
          return json.message;
        } else if (json['file_id']) {
          fileId = json['file_id'];
          return '';
        }
      } catch (e) {
        console.error(e);
        return '';
      }
    });
    arg.updateLastMessage(messageList.join(''));
  }

  if (fileId) {
    arg.updateLastMessageWithFile(fileId);
  }
};

export const useRunFile = (initialScript: string | undefined) => {
  const [script, setScript] = useState<string>(initialScript || '');
  const { fileList, addFile, removeFile, resetFileList } = useFileList([]);
  const [isChatting, setIsChatting] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const updateScript = (script: string) => {
    setScript(script);
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
            datetime: lastMessage.datetime,
          },
        ];
      } else {
        return [...prev];
      }
    });
  };

  const updateLastMessageWithFile = (fileId: string) => {
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage.role === 'assistant') {
        return [
          ...prev.slice(0, prev.length - 1),
          {
            role: 'assistant',
            content: lastMessage.content,
            fileId: fileId,
            datetime: lastMessage.datetime,
          },
        ];
      } else {
        return [...prev];
      }
    });
  };

  const { trigger, isMutating } = useSWRMutation(
    '/api/assistant/opendata-bridge-runner',
    postPrompt
  );

  const actionRunScript = async () => {
    setIsChatting(true);

    try {
      await trigger({
        file: fileList[0],
        script,
        setMessages,
        updateLastMessage,
        updateLastMessageWithFile,
      });
    } catch (err) {
      console.error(err);
      updateLastMessage('エラーが発生しました。再度送信してください。');
      setIsChatting(false);
      return;
    }

    setIsChatting(false);
  };

  return {
    script,
    updateScript,
    actionRunScript,
    isLoading: isMutating,
    fileList,
    addFile,
    removeFile,
    messages,
    isChatting,
  };
};
