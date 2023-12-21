import { Button } from '@/components/atoms/button/Button';
import React from 'react';

interface ProjectTagsProps {
  tags: string[];
}

export const ProjectTags = ({ tags }: ProjectTagsProps) => {
  return (
    <div className="flex space-x-8">
      {tags.map((tag, index) => (
        <Button
          key={index}
          color={'primary'}
          size={'large'}
          label={tag}
          onClick={() => {}}
        />
      ))}
    </div>
  );
};
