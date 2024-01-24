import { fetchAllTagsService } from '@/service/fetch-all-tags-service';
import SearchProjectPageCsr from '@/app/(with-footer)/SearchProjectPageCsr';
import { searchProject } from '@/service/search-project-service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/auth-options';
import { GuestHome } from '@/components/templates/guest-home/GuestHome';
import React from 'react';

export const dynamic = 'force-dynamic';

const SearchProjectPage = async () => {
  const session = await getServerSession(authOptions);
  const isGuest =
    (process.env.PRIVATE_MODE === 'true' && !session?.user?.name) || false;

  if (isGuest) {
    return <GuestHome />;
  }

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
