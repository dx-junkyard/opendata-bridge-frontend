import { DetailProject } from '@/components/templates/detail-project/DetailProject';
import { Project } from '@/types/project';

const project: Project = {
  id: 'dummy1',
  name: 'dummy1',
  description: 'dummy1',
  tags: ['tag1', 'tag2'],
  url: '/dummy1',
  thumbnails: ['/dummy.png', '/dummy.png'],
};

const Detail = ({ params }: { params: { projectId: string } }) => {
  console.info(`Detail: ${params.projectId}`);

  return <DetailProject project={project} />;
};

export default Detail;
