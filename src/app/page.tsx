import { ProjectTag } from '@/types/project-tag';
import { fetchAllTagsService } from '@/service/fetch-all-tags-service';
import SearchProjectPageCsr from '@/app/SearchProjectPageCsr';

const SearchProjectPage = async () => {
  const projectTags: ProjectTag[] =
    (await fetchAllTagsService())
      .map((tagEntity) => {
        return {
          id: tagEntity.id || '',
          title: tagEntity.attributes?.title || '',
        };
      })
      .filter((tag) => tag.id && tag.title) || [];

  return <SearchProjectPageCsr projectTags={projectTags} />;
};

export default SearchProjectPage;
