interface SelectIndexProps {
  totalCount: number;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const range = (start: number, end: number) =>
  Array.from(Array(end - start + 1).keys()).map((x) => x + start);

const MAX_ITEM_COUNT = 10;

const SelectIndex = ({
  totalCount,
  currentIndex,
  setCurrentIndex,
}: SelectIndexProps) => {
  return (
    <main className="grid w-full place-items-center">
      <div className="grid w-[40rem] grid-cols-10 gap-2 rounded-xl bg-gray-200 p-2">
        {range(Math.max(totalCount - MAX_ITEM_COUNT + 1, 1), totalCount).map(
          (i) => (
            <div key={i}>
              <input
                type="radio"
                name="option"
                id={i.toString()}
                value={i.toString()}
                className="peer hidden"
                checked={i === currentIndex}
                onChange={() => setCurrentIndex(i)}
              />
              <label
                htmlFor={i.toString()}
                className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
              >
                {i}
              </label>
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default SelectIndex;
