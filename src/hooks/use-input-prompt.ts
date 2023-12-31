import { useState } from 'react';
import useSWR from 'swr';
import { GenericDataType } from '@/components/molecules/table/TableView';
import useSWRMutation from 'swr/mutation';
import { Recipe } from '@/types/recipe';

const table: GenericDataType[] = [
  {
    id: '1',
    name: 'name-1',
    creator: 'creator-1',
    createdAt: '2021-01-01',
    description: 'description-1',
  },
  {
    id: '2',
    name: 'name-2',
    creator: 'creator-2',
    createdAt: '2021-01-01',
    description: 'description-2',
  },
];

const script: string = 'import pandas as pd';

type Result = {
  table: GenericDataType[];
  script: string;
};

const postActionUseRecipe = (
  url: string,
  { arg }: { arg: { prompt: string } }
) => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => {
    return { table, script };
  });
};

export const useInputPrompt = (initialPrompt: string | undefined) => {
  const [prompt, setPrompt] = useState<string>(initialPrompt || '');
  const [result, setResult] = useState<Result | undefined>(undefined);

  const updatePrompt = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  const { trigger, isMutating } = useSWRMutation(
    '/action/use/prompt',
    postActionUseRecipe
  );

  const actionUsePrompt = async () => {
    setResult(await trigger({ prompt }));
  };

  return {
    prompt,
    updatePrompt,
    actionUsePrompt,
    isLoading: isMutating,
    result,
  };
};
