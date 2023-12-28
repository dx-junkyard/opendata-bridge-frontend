import { UseRecipe } from '@/components/templates/use-recipe/UseRecipe';
import { getProject } from '@/service/get-project-service';
import { notFound } from 'next/navigation';

const UseRecipePage = async ({ params }: { params: { projectId: string } }) => {
  console.info(`UseRecipe: ${params.projectId}`);

  const project = await getProject(params.projectId);

  if (!project) {
    return notFound();
  }

  return <UseRecipe project={project} />;
};

export default UseRecipePage;
