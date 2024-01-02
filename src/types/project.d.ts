import { Dataset } from '@/types/dataset';
import { Recipe } from '@/types/recipe';

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnails: string[];
  resources: Dataset[];
  recipes: Recipe[];
};
