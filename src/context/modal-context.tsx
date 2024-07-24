import { createContext, useEffect, useState } from "react";
import { ModalProps } from "src/components/common/ui/types";

interface ModalContext {
  isOpen: boolean;
  modal: ModalProps;
  cancel: () => void;
  submit: () => void;
  setModalState: (props: ModalProps) => void;
  openModal: (status: boolean) => void;
}

export const modalContext = createContext<ModalContext>({
  isOpen: false,
  modal: {
    message: "",
    btnText: "",
    cancelText: "",
    cancelFn: null,
    submitFn: null,
  },
  cancel: () => {},
  submit: () => {},
  setModalState: () => {},
  openModal: () => {},
});

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalProps>({
    message: "",
    btnText: "",
    cancelText: "",
    cancelFn: null,
    submitFn: null,
  });

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const setModalState = ({ message, btnText, cancelText, cancelFn, submitFn }: ModalProps) => {
    setModal({ message, btnText, cancelText: cancelText || "취소", cancelFn, submitFn });
  };

  const cancel = () => {
    if (modal.cancelFn) modal.cancelFn();
    closeModal();
  };

  const submit = () => {
    if (modal.submitFn) modal.submitFn();
    closeModal();
  };

  useEffect(() => {
    if (modal.message !== "") openModal();
  }, [modal]);

  const value = {
    isOpen,
    modal,
    cancel,
    submit,
    setModalState,
    openModal,
  };

  return <modalContext.Provider value={value}>{children}</modalContext.Provider>;
};

export default ModalContextProvider;
