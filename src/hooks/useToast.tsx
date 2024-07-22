import { useEffect, useState } from "react";

const useToast = () => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const setToast = ({ message, isError }: { message: string | string[]; isError?: boolean }) => {
    const text = Array.isArray(message) ? message : [message];
    setToastMessage(text);
    !isError ? setIsError(false) : setIsError(true);
  };

  const closeToast = () => {
    setToastMessage([]);
  };

  useEffect(() => {
    if (toastMessage.length > 0) {
      setShowToast(true);
      return;
    }

    setShowToast(false);
  }, [toastMessage]);

  return { showToast, setToast, toastController: { closeToast, toastMessage, isError } };
};

export default useToast;
