export type Project = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  thumbnails: string[];
  resources: Resource[];
  recipe?: string;
  prompt?: string;
};
