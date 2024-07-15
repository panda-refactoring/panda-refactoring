import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

import ModalContextProvider from "../context/modal-context";
import MSWProvider from "../mocks/msw-provider";
import MainLayout from "../layout/main-layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <RecoilRoot>
          <ModalContextProvider>
            <MainLayout>
              <MSWProvider>
                <Component {...pageProps} />
              </MSWProvider>
            </MainLayout>
          </ModalContextProvider>
        </RecoilRoot>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
