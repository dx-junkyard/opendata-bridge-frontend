import { DetailProject } from '@/components/templates/detail-project/DetailProject';
import { getProject } from '@/service/get-project-service';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const DetailProjectPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  console.info(`Detail: ${params.projectId}`);

  const project = await getProject(params.projectId);

  if (!project) {
    return notFound();
  }

  const session = await getServerSession(authOptions);

  const isLogin = !!session?.user?.name;

  return <DetailProject project={project} isLogin={isLogin} />;
};

export default DetailProjectPage;
