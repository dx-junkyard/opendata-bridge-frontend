export default async function fileFetcher(fileId: string): Promise<Blob> {
  return await fetch('/api/file/').then(async (res) => {
    if (res.status === 200) {
      return await res.blob();
    } else {
      throw new Error();
    }
  });
}
