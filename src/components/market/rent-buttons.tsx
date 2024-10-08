import { Icon } from "@iconify/react";
import { useRecoilState } from "recoil";
import { isRentState } from "../../recoil/filter";

import { cls } from "../../common/util/class";

const RentButtons = () => {
  const [isRent, setIsRent] = useRecoilState(isRentState);

  const handleRent = () => setIsRent(true);

  const handleSell = () => setIsRent(false);

  const handleReset = () => setIsRent("");

  return (
    <div className="flex gap-3">
      <div className="relative w-20">
        <button
          className={cls(
            "absolute z-10 mr-2 h-full w-full rounded-full border border-common-black",
            isRent ? "bg-primary-green text-common-black" : "bg-white px-2",
          )}
          onClick={handleRent}
        >
          대여상품
        </button>
        <span className="absolute left-[2px] top-[2px] h-full w-full rounded-full bg-common-black" />
      </div>
      <div className="relative w-20">
        <button
          className={cls(
            "absolute z-10 mr-2 h-full w-full rounded-full border border-common-black",
            isRent === false
              ? "bg-primary-green text-common-black"
              : "bg-white px-2",
          )}
          onClick={handleSell}
        >
          판매상품
        </button>
        <span className="absolute left-[2px] top-[2px] h-full w-full rounded-full bg-common-black" />
      </div>
      <button aria-label="되돌리기" onClick={handleReset}>
        <Icon icon="carbon:reset" className="text-2xl" />
      </button>
    </div>
  );
};

export default RentButtons;
