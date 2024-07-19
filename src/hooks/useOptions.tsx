import { FormEvent, MouseEvent, useState } from "react";
import { tabData } from "src/common/consts/market";
import { Options } from "src/common/types/create.types";

const useOptions = (initialValues?: Options) => {
  const [isTabOpen, setIsTabOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<Options>(
    initialValues ?? {
      category: { name: "카테고리", current: false, list: tabData.category },
      style: { name: "스타일", current: false, list: tabData.style },
      brand: { name: "브랜드", current: false, list: tabData.brand },
      rental: { name: "대여 가능", current: false, list: tabData.rental },
    },
  );

  const openTab = () => setIsTabOpen(true);

  const closeTab = () => setIsTabOpen(false);

  const openOptionItem = (name: string) => {
    const newTabItem: Options = {};
    for (const key in options) {
      const val = options[key].name === name ? { ...options[key], current: true } : { ...options[key], current: false };
      newTabItem[key] = val;
    }
    setOptions(newTabItem);
    openTab();
  };

  const selectOptionItem = (event: MouseEvent<HTMLLIElement>, name: string) => {
    const target = event.target as HTMLLIElement;
    const newTabItem: Options = {};
    for (const key in options) {
      const val = options[key].name === name ? { ...options[key], name: target.textContent as string } : options[key];
      newTabItem[key] = val;
    }
    setOptions(newTabItem);
    closeTab();
  };

  const submitBrand = (event: FormEvent<HTMLFormElement>, brandName: string) => {
    event.preventDefault();

    const newTabItem: Options = {};
    for (const key in options) {
      const val = key === "brand" ? { ...options[key], name: brandName as string } : options[key];
      newTabItem[key] = val;
    }
    setOptions(newTabItem);
    closeTab();
  };

  const handler = {
    openOptionItem,
    selectOptionItem,
    submitBrand,
    openTab,
    closeTab,
  };

  return {
    options,
    isTabOpen,
    handleOption: handler,
  };
};

export default useOptions;
