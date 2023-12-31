import { UseRecipe } from '@/components/templates/use-recipe/UseRecipe';
import { getProject } from '@/service/get-project-service';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/auth-options';

const UseRecipePage = async ({ params }: { params: { projectId: string } }) => {
  console.info(`UseRecipe: ${params.projectId}`);

  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return notFound();
  }

  const project = await getProject(params.projectId);

  if (!project) {
    return notFound();
  }

  return <UseRecipe project={project} />;
};

export default UseRecipePage;
