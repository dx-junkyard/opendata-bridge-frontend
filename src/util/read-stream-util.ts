export const readStream = async (
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
