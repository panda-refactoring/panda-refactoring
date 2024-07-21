import { NextPage } from "next";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

import { useRecoilValueLoadable } from "recoil";
import { currentUserInfoQuery } from "../../recoil/user";

import Header from "../../components/common/header";
import Navigation from "../../components/common/navigation";
import LookItem from "../../components/lookbook/look-item";
import FloatingButton from "../../components/common/ui/floating-button";
import LoadingSpinner from "../../components/common/ui/loading-spinner";

import useModal from "../../hooks/useModal";
import { apiGet } from "../../service/request";
import { LookbookData } from "../../common/types/data.types";

const Lookbook: NextPage = () => {
  const userInfo = useRecoilValueLoadable(currentUserInfoQuery);
  const { contents: userContents } = userInfo;
  const userId = userContents?.id ?? 1;

  const { ModalUI, setLoginModalState } = useModal();

  const { data: allLookbookData, isLoading } = useQuery("lookbooks", apiGet.GET_LOOKS);

  return (
    <>
      <Header />
      <ModalUI />
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      <div>
        <ul className="grid grid-cols-2 pb-10">
          {allLookbookData
            ?.slice()
            .reverse()
            .map((data: LookbookData) => (
              <LookItem key={data.id} {...data} userId={userId || 1} setModal={setLoginModalState} />
            ))}
        </ul>
      </div>
      <FloatingButton path="/create/style-feed" />
      <Navigation />
    </>
  );
};

export default Lookbook;
