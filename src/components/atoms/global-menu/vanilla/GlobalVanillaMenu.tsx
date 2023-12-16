import React from 'react';
import Link from 'next/link';

interface GlobalVanillaMenuProps {
  title: string;
  href: string;
}

export const GlobalVanillaMenu = ({ title, href }: GlobalVanillaMenuProps) => {
  return (
    <Link href={href}>
      <div className="min-w-[110px] min-h-[80px] bg-white flex justify-center items-center">
        <h2 className="text-black font-bold text-center">{title}</h2>
      </div>
    </Link>
  );
};
