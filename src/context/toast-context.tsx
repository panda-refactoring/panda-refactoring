import { createContext, useEffect, useState } from "react";

interface ToastProps {
  message: string;
  isError?: boolean;
}

interface ToastContext {
  showToast: boolean;
  isError: boolean;
  toastMessage: string;
  setToast: (props: ToastProps) => void;
  closeToast: () => void;
}

export const toastContext = createContext<ToastContext>({
  showToast: false,
  isError: false,
  toastMessage: "",
  setToast: () => {},
  closeToast: () => {},
});

const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const setToast = ({ message, isError }: { message: string; isError?: boolean }) => {
    setToastMessage(message);
    !isError ? setIsError(false) : setIsError(true);
  };

  const closeToast = () => {
    setToastMessage("");
  };

  useEffect(() => {
    if (toastMessage !== "") {
      setShowToast(true);
      return;
    }

    setShowToast(false);
  }, [toastMessage]);

  const value = {
    showToast,
    isError,
    toastMessage,
    setToast,
    closeToast,
  };

  return <toastContext.Provider value={value}>{children}</toastContext.Provider>;
};

export default ToastContextProvider;
