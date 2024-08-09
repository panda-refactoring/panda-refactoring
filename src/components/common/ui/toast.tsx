import { useContext, useState } from "react";

import { Icon } from "@iconify/react";

import useTimeout from "src/hooks/useTimeout";
import { cls } from "src/common/util/class";
import { toastContext } from "src/context/toast-context";

const Toast = () => {
  const [isHide, setIsHide] = useState<boolean>(false);

  const { showToast, closeToast, isError, toastMessage } = useContext(toastContext);

  useTimeout(() => setIsHide(true), 4500);
  useTimeout(() => closeToast(), 5000);

  return (
    <>
      {showToast && (
        <div
          className={cls(
            "fixed top-28 z-50 w-[330px] space-y-3 rounded-md bg-common-black py-5 text-center text-white shadow-lg transition",
            isHide ? "animate-hide" : "animate-popup",
          )}
        >
          <div className="flex items-center justify-center gap-2">
            {!isError && (
              <div
                className="relative h-4 w-4 rounded-full bg-primary-green 
          after:absolute after:left-1 after:top-1 after:block after:h-[5px] after:w-2 after:-rotate-45 after:border-2
          after:border-r-0 after:border-t-0 after:border-common-black"
              />
            )}
            {isError && (
              <div className="relative h-4 w-4 rounded-full bg-error">
                <Icon icon="mdi:exclamation-thick" className="absolute left-[1px] top-[1px] text-black" />
              </div>
            )}
            <div>
              <p className="whitespace-pre-wrap">{toastMessage}</p>
            </div>
          </div>
          <button className="absolute right-3 top-0 cursor-pointer" onClick={closeToast}>
            <Icon icon="ic:baseline-clear" />
          </button>
        </div>
      )}
    </>
  );
};

export default Toast;
