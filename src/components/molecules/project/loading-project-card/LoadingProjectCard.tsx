export const LoadingProjectCard = () => {
  return (
    <div className="grid border-gray-300 border-b w-full md:h-[187px] grid-cols-2 place-content-center bg-white py-[30px]">
      <div className="flex justify-center items-center space-y-8 w-full h-full">
        <div className="text-sm w-[70%] md:w-[80%] font-bold animate-pulse bg-slate-300 h-[20px] mx-[40px] rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 place-content-center gap-3">
        <div className="w-[180px] h-[120px] md:w-[216px] md:h-[144px] animate-pulse bg-slate-300 rounded-sm" />
        <div className="w-[180px] h-[120px] md:w-[216px] md:h-[144px] animate-pulse bg-slate-300 rounded-sm" />
      </div>
    </div>
  );
};
