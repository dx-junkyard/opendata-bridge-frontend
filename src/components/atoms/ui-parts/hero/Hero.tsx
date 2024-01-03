import React from 'react';

export const Hero = () => {
  return (
    <div className="w-full h-[200px] xl:h-[323px] text-black bg-blue-100 text-center flex flex-col justify-center space-y-5">
      <h1 className="text-bold text-3xl xl:text-6xl">Opendata Bridge</h1>
      <h2 className="xl:text-2xl">
        利用目的で探せる
        <br />
        オープンデータ検索サービス
      </h2>
    </div>
  );
};
