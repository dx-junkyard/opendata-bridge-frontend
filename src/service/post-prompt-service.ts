export const postPrompt = async (
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
    };
  }
) => {
  // 成果物を一度リセット
  arg.setResult('');
  arg.setCode('');

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
};
