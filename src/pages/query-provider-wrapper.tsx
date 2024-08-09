import { PropsWithChildren, useContext } from "react";
import { QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from "react-query";
import { useRouter } from "next/router";

import Modal from "src/components/common/ui/modal";
import Toast from "src/components/common/ui/toast";
import ErrorBoundary from "./error-boundary";

import { toastContext } from "src/context/toast-context";
import useModal from "src/hooks/useModal";

const QueryProvider = ({ children }: PropsWithChildren) => {
  const { setToast } = useContext(toastContext);
  const { setModal } = useModal();

  const router = useRouter();

  const { reset } = useQueryErrorResetBoundary();
  const queryErrorHandler = (error: any) => {
    console.log(error.name);

    switch (error?.name) {
      case "AxiosError":
        setModal({
          message: "게시물 정보를 가져올 수 없습니다.",
          btnText: "재시도",
          cancelFn: () =>
            router.replace("/").then(() => {
              reset();
              router.reload();
            }),
          submitFn: () => router.reload(),
        });
        return;
      default:
        setToast({ message: "알 수 없는 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.", isError: true });
        return;
    }
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: queryErrorHandler,
        retry: 0,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary errorFallback={<Toast />} modalFallback={<Modal />}>
          {children}
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
};

export default QueryProvider;
