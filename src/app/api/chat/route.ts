import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/auth-options';

export async function POST(req: Request) {
  const formData = await req.formData();

  console.info(`POST:${req.url} extension:${formData.get('extension')} `);

  const session = await getServerSession(authOptions);

  const isGuest = !session?.user?.name;

  if (isGuest) {
    return new Response(
      JSON.stringify({
        status: 401,
      }),
      {
        status: 401,
      }
    );
  }

  // レスポンス用のストリームを作成
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();

  // リクエストをchat-apiに転送

  let apiUrl: string;

  if (formData.get('file') && formData.get('extension')) {
    apiUrl = `${process.env.CHAT_API || ''}/chat/file`;
  } else {
    apiUrl = `${process.env.CHAT_API || ''}/chat`;
  }

  const response = await fetch(apiUrl, {
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
  reader: ReadableStreamDefaultReader,
  writer: WritableStreamDefaultWriter
) => {
  while (1) {
    const { value, done } = await reader.read();

    if (done) {
      await writer.close();
      break;
    } else {
      try {
        await writer.write(value);
      } catch (err) {
        await reader.cancel();
        console.error(err);
        break;
      }
    }
  }
};
