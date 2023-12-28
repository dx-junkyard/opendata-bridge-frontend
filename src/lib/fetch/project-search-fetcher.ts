import { Project } from '@/types/project';
import { TagMap } from '@/hooks/use-filter-tag';

export const searchProjectPath = '/api/project/search';

export default function projectSearchFeatcher(q: string, tags: string) {
  const params: { [key: string]: string } = {};

  if (q !== '') {
    params['q'] = q;
  }
  if (tags !== '') {
    params['tag'] = tags;
  }

  const urlSearchParam = new URLSearchParams(params).toString();

  return fetch(`${searchProjectPath}?${urlSearchParam}`)
    .then((res) => {
      return res.json() || [];
    })
    .then((res: Project[]) => {
      return res;
    });
}
