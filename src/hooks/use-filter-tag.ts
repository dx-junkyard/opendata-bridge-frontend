import { getAllProjectTagName, ProjectTag } from '@/types/tag';
import { useState } from 'react';

// Tagをキー、選択状態を値とするMapの型を定義
export type TagMap = Map<ProjectTag, boolean>;

// タグは全て未選択状態で初期化
const initialTags: TagMap = new Map(
  getAllProjectTagName().map((tag) => [tag, false])
);

export const useFilterTag = () => {
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
