import { useFetchCsvFile } from '@/hooks/use-fetch-csv-file';
import DownloadButton from '@/components/atoms/ui-parts/download-button/DownloadButton';
import { TableView } from '@/components/atoms/ui-parts/table/TableView';
import LoadingPulse from '@/components/atoms/ui-parts/lodaing-pulse/LoadingPulse';
import React from 'react';

const CsvFileTable = ({ fileId }: { fileId: string }) => {
  const { csvFile } = useFetchCsvFile(fileId);
  return (
    <div className="w-full flex flex-col text-black">
      <h3 className="text-left">整形されたデータ</h3>
      <div className="grid grid-cols-10">
        <span className="text-left col-span-8">
          ※最大5行までプレビュー表示されます
        </span>
        <div className="flex items-center justify-end col-span-2">
          <DownloadButton filename={csvFile.name} value={csvFile.raw} />
        </div>
      </div>
      {csvFile.content.length ? (
        <div className="w-full overflow-scroll">
          <TableView defaultData={csvFile.content.slice(0, 5)} />
        </div>
      ) : (
        <div className="w-full text-black p-3">
          <LoadingPulse />
        </div>
      )}
    </div>
  );
};

export default CsvFileTable;
