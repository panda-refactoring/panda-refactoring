import { NextPage } from "next";
import { Suspense } from "react";

import Header from "../../components/common/header";
import Navigation from "../../components/common/navigation";
import Modal from "src/components/common/ui/modal";
import FloatingButton from "../../components/common/ui/floating-button";

import LookbookList from "src/components/lookbook/lookbook-list";
import Loading from "src/components/common/ui/loading";

const Lookbook: NextPage = () => {
  return (
    <>
      <Header />
      <Modal />
      <Suspense fallback={<Loading />}>
        <LookbookList />
      </Suspense>
      <FloatingButton path="/create/style-feed" />
      <Navigation />
    </>
  );
};

export default Lookbook;
