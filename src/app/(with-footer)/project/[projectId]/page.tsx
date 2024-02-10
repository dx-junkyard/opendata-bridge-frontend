import { DetailProject } from '@/components/templates/detail-project/DetailProject';
import { getProject } from '@/service/get-project-service';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/auth-options';

const DetailProjectPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  console.info(`Detail: ${params.projectId}`);

  const session = await getServerSession(authOptions);

  const isGuest =
    (process.env.PRIVATE_MODE === 'true' && !session?.user?.name) || false;

  if (isGuest) {
    return notFound();
  }

  const project = await getProject(params.projectId);

  if (!project) {
    return notFound();
  }

  const isLogin = !!session?.user?.name;

  return <DetailProject project={project} isLogin={isLogin} />;
};

export default DetailProjectPage;
