import { useContext } from "react";
import { modalContext } from "../context/modal-context";
import { modalState } from "src/common/consts/modal";

interface SetModalProps {
  submitFn: () => void;
  cancelFn?: () => void;
}

interface AuthConfigProps extends Omit<SetModalProps, "cancelFn"> {
  cancelFn: (name: string, val: any, time: number) => void;
}

const useModal = () => {
  const { setModalState } = useContext(modalContext);

  const setLoginModal = ({ submitFn, cancelFn }: SetModalProps) => {
    setModalState(Object.assign(modalState.login, { submitFn, cancelFn }));
  };

  const setSigninModal = ({ submitFn, cancelFn }: SetModalProps) => {
    setModalState(Object.assign(modalState.signin, { submitFn, cancelFn }));
  };

  const setAuthModal = ({ submitFn, cancelFn }: AuthConfigProps) => {
    const newModalState = Object.assign(modalState.auth, {
      submitFn,
      cancelFn: () => cancelFn("panda_visitor", true, 3),
    });
    setModalState(newModalState);
  };

  const setCommentModal = ({ submitFn, cancelFn }: SetModalProps) => {
    const newModalState = Object.assign(modalState.comment, { submitFn, cancelFn });
    setModalState(newModalState);
  };

  return {
    setModal: setModalState,
    setAuthModal,
    setLoginModal,
    setSigninModal,
    setCommentModal,
  };
};

export default useModal;
