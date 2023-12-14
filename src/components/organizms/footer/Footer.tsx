import React from 'react';

import './footer.scss';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => (
  <footer className="flex items-center footer bg-white text-black">
    <h1 className="font-bold text-2xl leading-none">
      Opendata
      <br />
      Bridge
    </h1>
    <div className="flex items-center underline text-xs space-x-4">
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
    <h1 className="text-right text-xs">
      &copy; dx-junkyard
      <br />
      All rights reserved.
    </h1>
  </footer>
);
