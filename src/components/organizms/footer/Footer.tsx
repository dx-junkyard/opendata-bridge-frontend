import React from 'react';

import './footer.scss';
import Link from 'next/link';

export const Footer = () => (
  <footer className="grid grid-cols-1 place-items-center content-stretch gap-y-5 xl:gap-y-0 xl:grid-cols-4 xl:px-[123px] py-[30px] footer bg-white text-black text-center">
    <div className="font-bold text-2xl leading-none xl:text-left">
      Opendata
      <br />
      Bridge
    </div>
    <div className="grid grid-cols-1 gap-10 xl:grid-cols-3 place-items-center underline text-xs gap-x-0 xl:gap-x-2 col-span-2 xl:text-left">
      <Link href="/" className="hover:bg-gray-100">
        プライバシーポリシー
      </Link>
      <Link href="/" className="hover:bg-gray-100">
        リンク・著作権について
      </Link>
      <Link href="/" className="hover:bg-gray-100">
        免責事項
      </Link>
    </div>
    <div className="xl:text-right text-xs">
      &copy; dx-junkyard
      <br />
      All rights reserved.
    </div>
  </footer>
);
