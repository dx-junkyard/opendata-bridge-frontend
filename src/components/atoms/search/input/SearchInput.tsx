import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';

interface SearchInputProps {
  query: string;
  updateQuery: (query: { query: string }) => void;
}

export const SearchInput = ({ query, updateQuery }: SearchInputProps) => {
  return (
    <div className="w-full h-[56px] bg-white flex justify-center items-center text-black border-black border rounded-lg">
      <FontAwesomeIcon className="px-4" icon={faMagnifyingGlass} />
      <input
        className="w-full h-full text-xl text-left"
        type="text"
        value={query}
        placeholder={'公園'}
        onChange={(e) => updateQuery({ query: e.target.value })}
      />
    </div>
  );
};
