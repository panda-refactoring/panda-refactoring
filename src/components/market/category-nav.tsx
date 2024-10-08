import { NextPage } from "next";

import { useRecoilState } from "recoil";
import { categoryNameState } from "../../recoil/filter";

import { cls } from "../../common/util/class";
import { categoryList } from "src/common/consts/market";

const CategoryNavigation: NextPage = () => {
  const [category, setCategory] = useRecoilState(categoryNameState);

  const changeCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.target as HTMLButtonElement;
    setCategory(name);
  };

  return (
    <div
      className="flex h-10 overflow-x-scroll border-b border-common-black 
    bg-white text-base text-textColor-gray-100 scrollbar-hide [&>button]:flex-shrink-0"
    >
      {categoryList.map((item, i) => (
        <button
          key={i}
          className={cls(
            "w-[65px]",
            `${
              category === item
                ? "border-b-2 border-common-black font-bold text-common-black"
                : ""
            }`,
          )}
          name={item}
          onClick={changeCategory}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default CategoryNavigation;
