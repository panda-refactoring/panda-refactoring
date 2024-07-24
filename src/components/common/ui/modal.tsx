import { useContext } from "react";
import { modalContext } from "src/context/modal-context";
import Overlay from "../overlay";

const Modal = () => {
  const { isOpen, modal, cancel, submit } = useContext(modalContext);

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed bottom-1/2 left-1/2 z-50 w-80 -translate-x-1/2 translate-y-1/2 rounded-lg bg-black py-5 text-center text-white shadow-md">
            <div className="mb-4 px-5">
              <p className="whitespace-pre-wrap">{modal.message}</p>
            </div>
            <div className="flex w-full gap-2 px-5">
              <button
                onClick={cancel}
                className="w-1/2 cursor-pointer rounded-md bg-common-black py-3 transition hover:bg-textColor-gray-100"
              >
                {modal.cancelText || "취소"}
              </button>
              <button
                onClick={submit}
                className="w-1/2 cursor-pointer rounded-md bg-white py-3 text-black transition hover:bg-primary-violet"
              >
                {modal.btnText}
              </button>
            </div>
          </div>
          <Overlay />
        </>
      )}
    </>
  );
};

export default Modal;
