import { DevelopRecipe } from '@/components/templates/develop-recipe/DevelopRecipe';
import { getProject } from '@/service/get-project-service';
import { notFound } from 'next/navigation';

const DevelopRecipePage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  console.info(`DevelopRecipe: ${params.projectId}`);

  const project = await getProject(params.projectId);

  if (!project) {
    return notFound();
  }

  return <DevelopRecipe project={project} />;
};

export default DevelopRecipePage;
