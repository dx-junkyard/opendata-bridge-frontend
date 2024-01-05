export type GenericDataType = Record<string, any>;

export type CsvFile = {
  name: string;
  content: GenericDataType[];
};
