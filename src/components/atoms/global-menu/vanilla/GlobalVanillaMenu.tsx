import React from 'react';

interface GlobalVanillaMenuProps {
  title: string;
}

export const GlobalVanillaMenu = ({ title }: GlobalVanillaMenuProps) => {
  return (
    <div className="w-full md:min-w-[110px] min-h-[80px] bg-white flex justify-center items-center border-b">
      <h2 className="text-black font-bold text-center">{title}</h2>
    </div>
  );
};
