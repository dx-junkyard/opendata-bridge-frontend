import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/auth-options';

export async function POST(req: Request) {
  const formData = await req.formData();

  const session = await getServerSession(authOptions);

  const isGuest = !session?.user?.name;

  if (isGuest) {
    return new Response(
      JSON.stringify({
        status: 403,
      }),
      {
        status: 403,
      }
    );
  }

  formData.append('user_id', session?.user?.name || '');

  // リクエストをchat-apiに転送
  let apiUrl: string;

  if (formData.get('file')) {
    apiUrl = `${process.env.CHAT_API || ''}/api/chat/file`;
  } else {
    apiUrl = `${process.env.CHAT_API || ''}/api/chat`;
  }

  if (formData.get('is_first') === 'true') {
    const resetForm = new FormData();
    resetForm.append('user_id', formData.get('user_id') as string);
    resetForm.append('history', new Blob(['[]'], { type: 'text/plain' }));

    await fetch(`${process.env.CHAT_API}/api/chat/reset`, {
      method: 'POST',
      body: resetForm,
    });
  }

  const newFormData = new FormData();
  newFormData.append('user_id', formData.get('user_id') as string);
  newFormData.append('message', formData.get('message') as string);
  newFormData.append('file', formData.get('file') as Blob);

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: newFormData,
  });

  const reader = response?.body
    ?.pipeThrough(new TextDecoderStream())
    .getReader();

  if (!reader || response.status !== 200) {
    return new Response(
      `data: {"message": "AIとの接続に失敗しました。時間をおいて試してください。ステータス: ${response.status}"}\n\n`,
      {
        status: 200,
      }
    );
  }

  // レスポンス用のストリームを作成
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();

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
