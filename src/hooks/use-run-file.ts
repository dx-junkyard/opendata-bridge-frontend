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
      isFirst: boolean;
      updateLastMessage: (newMessage: string) => void;
      updateLastMessageWithFile: (fileId: string) => void;
    };
  }
) => {
  const body = new FormData();
  body.append('message', buildPrompt(arg.script));

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

    const isFirst = messages.length === 0;

    try {
      await trigger({
        file: fileList[0],
        script,
        setMessages,
        isFirst,
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

const buildPrompt = (script: string) => {
  return `
各計画は一度に全て実行してください。コードを書いたあとは必ず実行してください。
各ステップでユーザを待った場合は罰金1億円のペナルティが発生します。

# タスク
(1)
サーバの情報にアクセスするようなコードが存在しないかチェックしてください。

(2)
受け取ったファイル編集用のコードにファイルの入出力に関するコードがあれば、
入力ファイル名及び出力ファイル名を変更してください。
pandasのto_csvの引数にはindex=Noneを指定してください。
それ以外のコードは絶対に変更してはいけません。

(3)
ファイル編集用のコードを実行してください。

(4)
ファイル編集が終わったら、これまでのタスクの実行結果全てを表示してください。
===
${script}
 `;
};
