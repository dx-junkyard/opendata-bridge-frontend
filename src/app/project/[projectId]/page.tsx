import { DetailProject } from '@/components/templates/detail-project/DetailProject';
import { getProject } from '@/service/get-project-service';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/auth-options';
import fetchAsset from '@/service/fetch-asset';

import { parse } from 'csv-parse/sync';
import { FormattedFile } from '@/types/formatted-file';
import { CsvFile } from '@/types/csv-file';

const DetailProjectPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  console.info(`Detail: ${params.projectId}`);

  const session = await getServerSession(authOptions);

  const isGuest =
    (process.env.PRIVATE_MODE === 'true' && !session?.user?.name) || false;

  if (isGuest) {
    return notFound();
  }

  const project = await getProject(params.projectId);

  if (!project) {
    return notFound();
  }

  const isLogin = !!session?.user?.name;

  const formattedFile = project.formattedFiles[0]
    ? await fetchCsvFile(project.formattedFiles[0])
    : undefined;

  return (
    <DetailProject
      project={project}
      isLogin={isLogin}
      formattedFile={formattedFile}
    />
  );
};

const fetchCsvFile = async (formattedFile: FormattedFile): Promise<CsvFile> => {
  const csvString = await fetchAsset(formattedFile.url);
  const csvData = parse(csvString, { columns: true });
  return {
    name: formattedFile.name,
    content: csvData,
    raw: csvString,
  };
};

export default DetailProjectPage;
