import { Dataset } from '@/types/dataset';
import { Recipe } from '@/types/recipe';
import { FormattedFile } from '@/types/formatted-file';

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnails: string[];
  resources: Dataset[];
  recipes: Recipe[];
  formattedFiles: FormattedFile[];
};
