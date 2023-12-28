import { useState } from 'react';
import { ProjectTag } from '@/types/project-tag';

// Tagをキー、選択状態を値とするMapの型を定義
export type TagMap = Map<ProjectTag, boolean>;

export const useFilterTag = (projectTags: ProjectTag[]) => {
  // タグは全て未選択状態で初期化
  const initialTags: TagMap = new Map(projectTags.map((tag) => [tag, false]));

  const [tags, setTags] = useState<TagMap>(initialTags);

  const updateTagState = (tag: ProjectTag, selected: boolean) => {
    const newTags = new Map(tags);
    newTags.set(tag, selected);
    setTags(newTags);
  };

  const resetTagState = () => {
    setTags(initialTags);
  };

  return {
    tags,
    updateTagState,
    resetTagState,
  };
};
