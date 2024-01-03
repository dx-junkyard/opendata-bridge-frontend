export const LoadingProjectCard = () => {
  return (
    <div className="grid border-gray-300 border-b w-full grid-cols-2 place-content-center bg-white py-[30px]">
      <div className="flex justify-center items-center space-y-8 w-full">
        <div className="text-sm w-[70%] xl:w-[80%] font-bold animate-pulse bg-slate-300 h-[20px] mx-[40px] rounded" />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 place-content-center gap-3">
        <div className="h-[120px] w-[90%] xl:h-[144px] animate-pulse bg-slate-300 rounded-sm" />
        <div className="h-[120px] w-[90%] xl:h-[144px] animate-pulse bg-slate-300 rounded-sm" />
      </div>
    </div>
  );
};
