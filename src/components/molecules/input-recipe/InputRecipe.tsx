import React from 'react';
import CopyButton from '@/components/atoms/copy-button/CopyBotton';
import { Recipe } from '@/types/recipe';

interface InputRecipeProps {
  recipe: Recipe;
  updateRecipe?: (updatedRecipe: Recipe) => void;
}

const InputRecipe = ({ recipe, updateRecipe }: InputRecipeProps) => {
  return (
    <div className="w-full flex flex-col relative">
      <h3 className="text-sm">データ整形スクリプト(python)</h3>
      <textarea
        className="border rounded px-[6px] py-[4px] placeholder-gray-500"
        value={recipe.script}
        onChange={(e) =>
          updateRecipe &&
          updateRecipe({
            ...recipe,
            script: e.target.value,
          })
        }
        rows={10}
      />
      <div className="absolute top-6 right-2">
        <CopyButton value={recipe.script || ''} />
      </div>
    </div>
  );
};

export default InputRecipe;
