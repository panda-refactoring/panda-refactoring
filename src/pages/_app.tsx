import "../styles/globals.css";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { RecoilRoot } from "recoil";

import MainLayout from "../layout/main-layout";
import ModalContextProvider from "../context/modal-context";
import ToastContextProvider from "src/context/toast-context";
import MSWProvider from "../mocks/msw-provider";
import QueryProvider from "./query-provider-wrapper";
import Toast from "src/components/common/ui/toast";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ModalContextProvider>
      <ToastContextProvider>
        <SessionProvider session={session}>
          <RecoilRoot>
            <MSWProvider>
              <MainLayout>
                <QueryProvider>
                  <Component {...pageProps} />
                </QueryProvider>
              </MainLayout>
            </MSWProvider>
          </RecoilRoot>
        </SessionProvider>
      </ToastContextProvider>
    </ModalContextProvider>
  );
}

export default MyApp;
