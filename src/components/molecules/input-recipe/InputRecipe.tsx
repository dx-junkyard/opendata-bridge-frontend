import React from 'react';
import CopyButton from '@/components/atoms/copy-button/CopyBotton';
import { Recipe } from '@/types/recipe';
import CodeEditor from '@/components/atoms/code-editor/CodeEditor';

interface InputRecipeProps {
  recipe: Recipe;
  updateRecipe?: (updatedRecipe: Recipe) => void;
}

const InputRecipe = ({ recipe, updateRecipe }: InputRecipeProps) => {
  return (
    <div className="w-full flex flex-col relative">
      <h3 className="text-sm">データ整形スクリプト(python)</h3>
      <CodeEditor
        code={recipe.script || ''}
        updateCode={(code) => {
          if (updateRecipe) {
            updateRecipe({ ...recipe, script: code });
          }
        }}
        language="python"
      />
    </div>
  );
};

export default InputRecipe;
