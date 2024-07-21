import { NextPage } from "next";
import Overlay from "../overlay";
import { IModal } from "./types";

const Modal: NextPage<IModal> = ({ message, btnText, cancelText, submitFn, cancelFn, isOpen }) => {
  const handleCancel = () => {
    if (cancelFn) cancelFn();
  };

  const handleSubmit = () => {
    if (submitFn) submitFn();
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed bottom-1/2 left-1/2 z-50 w-80 -translate-x-1/2 translate-y-1/2 rounded-lg bg-black py-5 text-center text-white shadow-md">
            <div className="mb-4 px-5">
              {message.split(",").map((text, i) => (
                <p key={`${text}-${i}`} className="whitespace-nowrap">
                  {text}
                </p>
              ))}
            </div>
            <div className="flex w-full gap-2 px-5">
              <button
                onClick={handleCancel}
                className="w-1/2 cursor-pointer rounded-md bg-common-black py-3 transition hover:bg-textColor-gray-100"
              >
                {cancelText ? cancelText : "취소"}
              </button>
              <button
                onClick={handleSubmit}
                className="w-1/2 cursor-pointer rounded-md bg-white py-3 text-black transition hover:bg-primary-violet"
              >
                {btnText}
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
