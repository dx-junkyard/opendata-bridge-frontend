import { useRef, useState } from 'react';
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
      prompt: string;
      setMessages: (func: ((prev: Message[]) => Message[]) | Message[]) => void;
      isFirst: boolean;
      updateLastMessage: (newMessage: string) => void;
      updateLastMessageWithFile: (fileId: string) => void;
      checkCancel: () => boolean;
    };
  }
) => {
  const body = new FormData();
  body.append('message', arg.prompt);

  if (arg.file) {
    body.append('file', arg.file);
  }

  body.append('is_first', arg.isFirst ? 'true' : 'false');

  arg.setMessages((prev) => [
    ...prev,
    {
      role: 'assistant',
      content: '',
      datetime: new Date().toLocaleString(),
    },
  ]);

  const response = await fetch('/api/chat', {
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
    if (arg.checkCancel()) {
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
        } else if (json['file_id']) {
          fileId = json['file_id'];
          return '';
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

  if (fileId) {
    arg.updateLastMessageWithFile(fileId);
  }
};

export const useInputPrompt = (
  initialPrompt: string | undefined,
  instruction: string,
  resetOnComplete: boolean = true
) => {
  const [prompt, setPrompt] = useState<string>(initialPrompt || '');
  const { fileList, addFile, removeFile, resetFileList } = useFileList([]);
  const [isChatting, setIsChatting] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

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

  const { trigger, isMutating } = useSWRMutation('/chat', postPrompt);

  const cancelChat = () => {
    isCancelRef.current = true;
    setIsChatting(false);
  };

  const actionUsePrompt = async () => {
    setIsChatting(true);

    const isFirst = messages.length === 0;

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content:
          prompt +
          (fileList.length > 0
            ? `\n\n添付ファイル名 : ${fileList[0].name}`
            : ''),
        datetime: new Date().toLocaleString(),
      },
    ]);

    const extensionPrompt =
      fileList.length > 0
        ? `ファイルの拡張子:${fileList[0].name.split('.').pop()}\n\n`
        : '';

    try {
      await trigger({
        file: fileList[0],
        prompt:
          (instruction.length > 0 ? instruction + '\n---\n' + prompt : prompt) +
          extensionPrompt,
        setMessages,
        isFirst,
        updateLastMessage,
        updateLastMessageWithFile,
        checkCancel,
      });
    } catch (err) {
      console.error(err);
      updateLastMessage('エラーが発生しました。再度送信してください。');
      setIsChatting(false);
      return;
    }

    setIsChatting(false);

    if (resetOnComplete) {
      setPrompt('');
      resetFileList();
    }
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
