import { Project } from '@/types/project';
import { TagMap } from '@/hooks/use-filter-tag';

export const searchProjectPath = '/api/project/search';

export default async function projectSearchFetcher(q: string, tags: string) {
  const params: { [key: string]: string } = {};

  if (q !== '') {
    params['q'] = q;
  }
  if (tags !== '') {
    params['tag'] = tags;
  }

  const urlSearchParam = new URLSearchParams(params).toString();

  const res = await fetch(`${searchProjectPath}?${urlSearchParam}`);
  return ((await res.json()) || []) as Project[];
}
