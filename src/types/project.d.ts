export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnails: string[];
  resources: Resource[];
  recipes: Recipe[];
};
