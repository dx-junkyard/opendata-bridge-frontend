import { SearchInput } from '@/components/atoms/search/input/SearchInput';
import { Button } from '@/components/atoms/button/Button';
import { SearchFilter } from '@/components/atoms/search/filter/SearchFilter';
import { ProjectTag } from '@/types/project-tag';
import { TagMap } from '@/hooks/use-filter-tag';

interface SearchWindowProps {
  query: string;
  updateQuery: (query: string) => void;
  updateIsTyping: (isTyping: boolean) => void;
  tags: TagMap;
  updateTagState: (tag: ProjectTag, selected: boolean) => void;
}

export const SearchWindow = ({
  query,
  updateQuery,
  updateIsTyping,
  tags,
  updateTagState,
}: SearchWindowProps) => {
  return (
    <div className="bg-white text-black px-[220px] py-[20px] flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-sm">オープンデータを検索する</h1>
        <div className="flex space-x-4">
          <SearchInput
            query={query}
            updateQuery={(q) => updateQuery(q)}
            updateIsTyping={updateIsTyping}
          />
          <Button
            color={'primary'}
            size={'xl'}
            label={'検索'}
            onClick={() => updateIsTyping(false)}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <h1 className="text-sm">人気のタグ</h1>
        <div className="grid grid-cols-5 gap-2 place-items-center">
          {Array.from(tags.entries()).map(([tag, selected]) => (
            <SearchFilter
              key={tag.id}
              label={tag.title}
              isSelected={selected}
              onClick={() => updateTagState(tag, !selected)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
