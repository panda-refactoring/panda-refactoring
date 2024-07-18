import { NextPage } from "next";

import { useRecoilState } from "recoil";
import { categoryNameState } from "../../recoil/filter";

import { categoryList } from "src/common/consts/price";
import { cls } from "../../common/util/class";

const CategoryNavigation: NextPage = () => {
  const [category, setCategory] = useRecoilState(categoryNameState);

  const changeCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement;
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
