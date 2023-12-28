import { DetailProject } from '@/components/templates/detail-project/DetailProject';
import { getProject } from '@/service/get-project-service';
import { notFound } from 'next/navigation';

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

  return <DetailProject project={project} />;
};

export default DetailProjectPage;
