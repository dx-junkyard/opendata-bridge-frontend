import { UseRecipe } from '@/components/templates/use-recipe/UseRecipe';
import { getProject } from '@/service/get-project-service';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const UseRecipePage = async ({ params }: { params: { projectId: string } }) => {
  console.info(`UseRecipe: ${params.projectId}`);

  const project = await getProject(params.projectId);

  if (!project) {
    return notFound();
  }

  return <UseRecipe project={project} />;
};

export default UseRecipePage;
