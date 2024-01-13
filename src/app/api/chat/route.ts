const chatUrl = `${process.env.CHAT_API || ''}/chat`;

export async function POST(req: Request) {
  console.info('POST ' + req.url);

  // レスポンス用のストリームを作成
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();

  // リクエストをchat-apiに転送
  const formData = await req.formData();
  const response = await fetch(chatUrl, {
    method: 'POST',
    body: formData,
  });

  const reader = response?.body
    ?.pipeThrough(new TextDecoderStream())
    .getReader();

  if (!reader) {
    return new Response('Internal Server Error', {
      status: 500,
    });
  }

  // 非同期で実行する
  readStream(reader, writer);

  // @ts-ignore
  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform',
    },
  });
}

const readStream = async (
  reader: ReadableStreamDefaultReader<string | undefined>,
  writer: WritableStreamDefaultWriter
) => {
  while (1) {
    const { value, done } = await reader.read();
    if (done) {
      await writer.close();
      break;
    } else {
      await writer.write(value);
    }
  }
};
