export default async function assetFetcher(uuid: string): Promise<string> {
  return await fetch('/api/asset/' + uuid).then((res) => {
    if (res.status === 200) {
      return res.text();
    } else if (res.status === 404) {
      return '';
    } else {
      throw new Error();
    }
  });
}
