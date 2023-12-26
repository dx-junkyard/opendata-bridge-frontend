import { Project } from '@/types/project';

export const fetchUsecasePath = '/api/project/search';

export default function projectSearchFeatcher(q: string) {
  return fetch(`${fetchUsecasePath}?q=${q}`)
    .then((res) => {
      return res.json() || [];
    })
    .then((res: Project[]) => {
      return res;
    });
}
