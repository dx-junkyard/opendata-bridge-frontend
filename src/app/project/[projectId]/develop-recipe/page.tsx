import { DevelopRecipe } from '@/components/templates/develop-recipe/DevelopRecipe';
import { getProject } from '@/service/get-project-service';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const DevelopRecipePage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  console.info(`DevelopRecipe: ${params.projectId}`);

  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return redirect(`/`);
  }

  const project = await getProject(params.projectId);

  if (!project) {
    return notFound();
  }

  return <DevelopRecipe project={project} />;
};

export default DevelopRecipePage;
