export type Project = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  thumbnails: string[];
  recipe?: string;
  prompt?: string;
};
