import { useState } from 'react';
import { Recipe } from '@/types/recipe';

export const useInputRecipe = (initialRecipe: Recipe[]) => {
  const [recipes, setRecipes] = useState(initialRecipe);

  const updateRecipe = (index: number, recipe: Recipe) =>
    setRecipes((prevState) => {
      prevState[index] = recipe;
      return prevState;
    });

  return {
    recipes,
    updateRecipe,
  };
};
