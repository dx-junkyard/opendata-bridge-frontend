import { Project } from '@/types/project';
import { DevelopRecipe } from '@/components/templates/develop-recipe/DevelopRecipe';

const project: Project = {
  id: 'dummy1',
  name: 'dummy1',
  description: 'dummy1',
  tags: ['tag1', 'tag2'],
  thumbnails: ['/dummy.png', '/dummy.png'],
  recipe: '',
};

const DevelopRecipePage = ({ params }: { params: { projectId: string } }) => {
  console.info(`Detail: ${params.projectId}`);

  return <DevelopRecipe project={project} />;
};

export default DevelopRecipePage;
