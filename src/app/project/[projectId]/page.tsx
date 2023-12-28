import { DetailProject } from '@/components/templates/detail-project/DetailProject';
import { Project } from '@/types/project';

const project: Project = {
  id: 'dummy1',
  title: 'dummy1',
  description: 'dummy1',
  tags: ['tag1', 'tag2'],
  thumbnails: ['/dummy.png', '/dummy.png'],
  resources: [],
  recipe: '',
};

const DetailProjectPage = ({ params }: { params: { projectId: string } }) => {
  console.info(`Detail: ${params.projectId}`);

  return <DetailProject project={project} />;
};

export default DetailProjectPage;
