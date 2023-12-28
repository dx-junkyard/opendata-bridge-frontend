import React from 'react';
import CopyButton from '@/components/atoms/copy-button/CopyBotton';

interface InputRecipeProps {
  recipe: string;
  updateRecipe: (recipe: string) => void;
}

const InputRecipe = ({ recipe, updateRecipe }: InputRecipeProps) => {
  return (
    <div className="w-full flex flex-col relative">
      <h3 className="text-sm">データ整形レシピ(JSON)</h3>
      <textarea
        className="border rounded px-[6px] py-[4px] placeholder-gray-500"
        value={recipe}
        onChange={(e) => updateRecipe(e.target.value)}
        rows={10}
      />
      <div className="absolute top-6 right-2">
        <CopyButton value={recipe} />
      </div>
    </div>
  );
};

export default InputRecipe;
