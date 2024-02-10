export default async function fetchAsset(url: string): Promise<Blob> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('ネットワークエラーが発生しました。');
  }
  return await response.blob();
}
