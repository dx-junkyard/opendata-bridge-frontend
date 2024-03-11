import { useEffect, useState } from 'react';
import { parse } from 'csv-parse/sync';
import { CsvFile } from '@/types/csv-file';
import fileFetcher from '@/lib/fetch/file-fetcher';
import useSWRImmutable from 'swr/immutable';

export const useFetchCsvFile = (fileId: string) => {
  const [csvFile, setCsvFile] = useState<CsvFile>({
    name: '',
    content: [],
    raw: new Blob(),
  });

  const { data, isLoading, error } = useSWRImmutable(
    [`/api/file/${fileId}`, fileId],
    ([_, fileId]) => fileFetcher(fileId)
  );

  useEffect(() => {
    if (data) {
      (async () => {
        try {
          setCsvFile({
            name: 'output.csv',
            content: parseCsv(await data.text()),
            raw: data,
          });
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [data]);

  return { csvFile };
};

const parseCsv = (csv: string) => {
  try {
    return parse(csv, { columns: true });
  } catch (e) {
    alert('CSV変換に失敗しました。');
    return [];
  }
};
