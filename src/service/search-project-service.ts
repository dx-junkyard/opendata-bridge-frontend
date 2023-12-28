import {
  DatasetEntity,
  getSdk,
  ProjectEntity,
  ProjectFiltersInput,
  TagEntity,
  UploadFileEntity,
} from '@/lib/generated/client';
import { gqlClient } from '@/lib/gql-client/gql-client';
import { Project } from '@/types/project';
import { Dataset } from '@/types/dataset';

export const searchProject = async (
  query: string = '',
  tagIds: string[] = [],
  page: number = 1
): Promise<Project[]> => {
  const filterVariables: ProjectFiltersInput = {};

  if (tagIds.length > 0) {
    filterVariables.tags = { id: { in: tagIds } };
  }

  let projectEntities: ProjectEntity[];

  if (query) {
    // @ts-ignore
    projectEntities =
      (
        await getSdk(gqlClient).searchProject({
          query,
          filterVariables,
          page,
        })
      ).search?.projects?.data || [];
  } else {
    // @ts-ignore
    projectEntities =
      (
        await getSdk(gqlClient).filterProject({
          filterVariables,
          page,
        })
      ).projects?.data || [];
  }

  return projectEntities
    .map((project) => buildProject(project))
    .filter((project) => project !== undefined) as Project[];
};

const buildDataset = (datasetEntity: DatasetEntity): Dataset => {
  const datasetAttribute = datasetEntity?.attributes;

  return {
    title: datasetAttribute?.title || '',
    url: datasetAttribute?.url || '',
    organization: datasetAttribute?.organization || '',
  };
};

const buildTag = (tagEntity: TagEntity): string => {
  return tagEntity?.attributes?.title || '';
};

const buildThumbnailUrl = (uploadFileEntity: UploadFileEntity): string => {
  return uploadFileEntity?.attributes?.url || '';
};

const buildProject = (project: ProjectEntity): Project | undefined => {
  const projectAttribute = project?.attributes;

  const resources: Dataset[] = (projectAttribute?.resources?.data || [])
    .map((dataset) => buildDataset(dataset))
    .filter(
      (dataset) =>
        dataset.url !== '' ||
        dataset.title !== '' ||
        dataset.organization !== ''
    );

  const tags: string[] = (projectAttribute?.tags?.data || [])
    .map((tag) => buildTag(tag))
    .filter((tag) => tag !== '');

  const thumbnails: string[] = (projectAttribute?.thumbnail?.data || [])
    .map((uploadFile) => buildThumbnailUrl(uploadFile))
    .filter((url) => url !== '');

  // 必須の項目がない場合はundefinedを返す
  if (
    !project.id ||
    !projectAttribute?.title ||
    !projectAttribute?.description
  ) {
    return undefined;
  }

  return {
    id: project.id,
    title: projectAttribute?.title,
    description: projectAttribute?.description,
    tags,
    thumbnails,
    resources,
    // Optionalな項目は空文字を返す
    recipe: projectAttribute?.recipe || '',
    prompt: projectAttribute?.prompt || '',
  };
};
