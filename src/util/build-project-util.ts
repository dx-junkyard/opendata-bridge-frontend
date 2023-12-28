import {
  DatasetEntity,
  ProjectEntity,
  TagEntity,
  UploadFileEntity,
} from '@/lib/generated/client';
import { Dataset } from '@/types/dataset';
import { Project } from '@/types/project';

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

export const buildProject = (project: ProjectEntity): Project | undefined => {
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
