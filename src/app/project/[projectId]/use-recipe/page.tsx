import { Project } from '@/types/project';
import { UseRecipe } from '@/components/templates/use-recipe/UseRecipe';

const project: Project = {
  id: 'dummy1',
  name: 'dummy1',
  description: 'dummy1',
  tags: ['tag1', 'tag2'],
  thumbnails: ['/dummy.png', '/dummy.png'],
  recipe: '',
};

const UseRecipePage = ({ params }: { params: { projectId: string } }) => {
  console.info(`Detail: ${params.projectId}`);

  return <UseRecipe project={project} />;
};

export default UseRecipePage;
