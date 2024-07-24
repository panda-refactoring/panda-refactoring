import { cls } from "src/common/util/class";

interface CategoryButtonsProps {
  category: string;
  onClickCategory: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CategoryButtons = ({ category, onClickCategory }: CategoryButtonsProps) => {
  return (
    <div className="grid h-[45px] grid-cols-2 border-y border-common-black bg-white text-base text-textColor-gray-100">
      <button
        onClick={onClickCategory}
        className={cls(
          " border-r  border-r-common-black",
          category === "items" ? "border-b-2 border-common-black font-bold text-common-black" : "",
        )}
        name="items"
      >
        Items
      </button>
      <button
        onClick={onClickCategory}
        className={cls(category === "looks" ? "border-b-2 border-common-black font-bold text-common-black" : "")}
        name="looks"
      >
        Looks
      </button>
    </div>
  );
};

export default CategoryButtons;
