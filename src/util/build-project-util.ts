import {
  ComponentProjectRecipe,
  DatasetEntity,
  Maybe,
  ProjectEntity,
  TagEntity,
  UploadFileEntity,
} from '@/lib/generated/client';
import { Dataset } from '@/types/dataset';
import { Project } from '@/types/project';
import { Recipe } from '@/types/recipe';

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

const buildRecipe = (recipe: Maybe<ComponentProjectRecipe>): Recipe => {
  return {
    prompt: recipe?.prompt || '',
    script: recipe?.script || '',
  };
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

  const thumbnails: string[] = (projectAttribute?.thumbnails?.data || [])
    .map((uploadFile) => buildThumbnailUrl(uploadFile))
    .filter((url) => url !== '');

  const recipes: Recipe[] = (projectAttribute?.recipes || []).map((recipe) =>
    buildRecipe(recipe)
  );

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
    recipes: recipes,
  };
};
