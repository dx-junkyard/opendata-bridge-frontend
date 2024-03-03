import { readStream } from '@/util/read-stream-util';

const apiUrl = `${process.env.CHAT_API || ''}/api/sge`;

export async function POST(req: Request) {
  const query = (await req.formData()).get('query') as string;

  const formData = new FormData();
  formData.append('query', query);

  console.info(`POST:${req.url}`);

  // レスポンス用のストリームを作成
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();

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
