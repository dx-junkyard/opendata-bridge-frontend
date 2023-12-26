export const LoadingProjectCard = () => {
  return (
    <div className="grid border-gray-300 border-b w-full h-[187px] grid-cols-2 bg-white">
      <div className="grid items-center">
        <div className="text-sm font-bold animate-pulse w-[80%] bg-slate-300 h-[20px] mx-[40px] rounded" />
        <div className="text-xs animate-pulse w-[80%] bg-slate-300 h-[20px] mx-[40px] rounded" />
      </div>
      <div className="grid grid-cols-2 content-center gap-3">
        <div className="w-[216px] h-[144px] animate-pulse bg-slate-300 rounded-sm" />
        <div className="w-[216px] h-[144px] animate-pulse bg-slate-300 rounded-sm" />
      </div>
    </div>
  );
};
