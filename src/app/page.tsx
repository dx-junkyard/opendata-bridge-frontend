import { fetchAllTagsService } from '@/service/fetch-all-tags-service';
import SearchProjectPageCsr from '@/app/SearchProjectPageCsr';
import { searchProject } from '@/service/search-project-service';

export const dynamic = 'force-dynamic';

const SearchProjectPage = async () => {
  const projectTags = await fetchAllTagsService();
  const projectList = await searchProject();

  return (
    <SearchProjectPageCsr
      projectTags={projectTags}
      initialProjectList={projectList}
    />
  );
};

export default SearchProjectPage;
