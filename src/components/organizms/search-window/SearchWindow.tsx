import { SearchInput } from '@/components/atoms/search/input/SearchInput';
import { Button } from '@/components/atoms/button/Button';
import { SearchFilter } from '@/components/atoms/search/filter/SearchFilter';

interface SearchWindowProps {
  query: string;
  updateQuery: (query: string) => void;
}

export const SearchWindow = ({ query, updateQuery }: SearchWindowProps) => {
  return (
    <div className="bg-white text-black px-[220px] py-[50px] flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-sm">オープンデータを検索する</h1>
        <div className="flex space-x-4">
          <SearchInput query={query} updateQuery={(q) => updateQuery(q)} />
          <Button
            color={'primary'}
            size={'xl'}
            label={'検索'}
            onClick={() => {}}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <h1 className="text-sm">人気のタグ</h1>
        <div className="flex space-x-4">
          <SearchFilter
            label={'ラベルA'}
            isSelected={false}
            onClick={() => {}}
          />
          <SearchFilter
            label={'ラベルB'}
            isSelected={false}
            onClick={() => {}}
          />
          <SearchFilter
            label={'ラベルC'}
            isSelected={true}
            onClick={() => {}}
          />
          <SearchFilter
            label={'ラベルD'}
            isSelected={false}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
