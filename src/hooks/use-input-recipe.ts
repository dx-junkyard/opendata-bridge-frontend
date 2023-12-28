import { useState } from 'react';

export const useInputRecipe = (initialRecipe: string | undefined) => {
  const formattedInitialRecipe = initialRecipe
    ? JSON.stringify(JSON.parse(initialRecipe), null, '\t')
    : '';

  const [recipe, setRecipe] = useState(formattedInitialRecipe);

  const updateRecipe = (recipe: string) => setRecipe(recipe);

  return {
    recipe,
    updateRecipe,
  };
};
