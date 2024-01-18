export default async function assetFetcher(uuid: string): Promise<string> {
  try {
    return await fetch('/api/asset/' + uuid).then((res) => res.text());
  } catch (e) {
    console.error(e);
    return '';
  }
}
