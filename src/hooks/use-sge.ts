import { useContext, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { QueryContext } from '@/components/atoms/context-provider/QueryContextProvider';

export const postQuery = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      query: string;
      updateAnswer: (delta: string) => void;
    };
  }
) => {
  const body = new FormData();
  body.append('query', arg.query);

  let response = await fetch('/api/chat/sge', {
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
        } else {
          return '';
        }
      } catch (e) {
        console.error(e);
        return '';
      }
    });
    arg.updateAnswer(messageList.join(''));
  }

  arg.updateAnswer('\n回答は以上になります。');
};

export const useSGE = () => {
  const query = useContext(QueryContext);
  const [answer, setAnswer] = useState<string>('');

  const updateAnswer = (delta: string) => {
    setAnswer((prev) => prev + delta);
  };

  const { trigger, isMutating } = useSWRMutation('/chat/sge', postQuery);

  const actionSGE = async () => {
    try {
      await trigger({
        query: query.value,
        updateAnswer,
      });
    } catch (err) {
      console.error(err);
      alert('エラーが発生しました。再度送信してください。');
      return;
    }
  };

  return {
    answer,
    actionSGE,
    enable: isMutating || answer.length > 0,
  };
};
