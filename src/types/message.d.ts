import { CsvFile } from '@/types/csv-file';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
  file?: CsvFile;
  datetime: string;
};
