import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/auth-options';

export async function POST(req: Request) {
  const formData = await req.formData();

  console.info(`POST:${req.url} extension:${formData.get('extension')} `);

  const session = await getServerSession(authOptions);

  const isGuest = !session?.user?.name;

  if (isGuest) {
    return new Response(
      'data: {"message": "ゲストユーザーはAIとの会話ができません。ログインしてください。"}',
      {
        status: 200,
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

  let response;

  try {
    response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });
  } catch (err) {
    return new Response(
      'data: {"message": "AIとの接続に失敗しました。時間をおいて試してください。"}',
      {
        status: 200,
      }
    );
  }

  const reader = response?.body
    ?.pipeThrough(new TextDecoderStream())
    .getReader();

  if (!reader) {
    return new Response(
      'data: {"message": "AIとの接続に失敗しました。時間をおいて試してください。"}',
      {
        status: 200,
      }
    );
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
