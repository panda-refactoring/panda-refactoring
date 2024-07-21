import { useContext } from "react";
import { modalContext } from "../context/modal-context";
import { modalState } from "src/common/consts/modal";

const useModal = () => {
  const { setModalState } = useContext(modalContext);

  const setLoginModal = ({ submitFn, cancelFn }: { submitFn: () => void; cancelFn?: () => void }) =>
    setModalState(Object.assign(modalState.login, { submitFn, cancelFn }));

  const setSigninModal = ({ submitFn, cancelFn }: { submitFn: () => void; cancelFn?: () => void }) =>
    setModalState(Object.assign(modalState.signin, { submitFn, cancelFn }));

  const setAuthModal = ({ cancelFn }: { cancelFn: (name: string, val: any, time: number) => void }) => {
    const newModalState = Object.assign(modalState.auth, { cancelFn: () => cancelFn("panda_visitor", true, 3) });
    setModalState(newModalState);
  };

  const setCommentModal = ({ submitFn, cancelFn }: { submitFn: () => void; cancelFn?: () => void }) => {
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
