import { NextPage } from "next";
import { Icon } from "@iconify/react";

import { cls } from "../../../common/util/class";
import { FilterTabProps } from "./types";

const FilterTab: NextPage<FilterTabProps> = props => {
  const { onClick, isOpen, name, tabData, addWords, wordList } = props;

  const changeWordList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    addWords(value);
  };

  return (
    <div className="transition duration-150 ease-out">
      <div
        onClick={onClick}
        className={cls(
          "peer h-[50px] select-none border-b border-common-black px-5 py-3 text-lg",
          isOpen === name ? "is-active" : "",
        )}
      >
        {name.toUpperCase()}
      </div>
      {isOpen === name && (
        <ul
          className={cls(
            "select-none overflow-hidden border-b border-common-black bg-white transition-all peer-[.is-active]:p-5 [&>li]:flex [&>li]:h-7 [&>li]:justify-between [&_svg]:-mt-[3px] [&_svg]:text-2xl",
            name !== "PRICE" ? "animate-accordion1" : "animate-accordion2",
          )}
        >
          {tabData.map((item, i) => {
            const itemKey = `${item}-${i}`;
            return (
              <li key={itemKey}>
                <label htmlFor={itemKey} className="peer">
                  {item}
                </label>
                <input
                  type={name === "PRICE" ? "radio" : "checkbox"}
                  id={itemKey}
                  value={item}
                  name={name}
                  className="peer hidden"
                  onChange={changeWordList}
                  checked={wordList.includes(item) ? true : false}
                />
                <div className="relative hidden h-6 w-6 items-start justify-center rounded-full border border-common-black peer-checked:flex">
                  <Icon
                    icon="material-symbols:check-small"
                    className="absolute top-[3px]"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FilterTab;
