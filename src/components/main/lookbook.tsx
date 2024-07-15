import { NextPage } from "next";
import { useEffect, useState } from "react";

import { useQuery } from "react-query";

import MainLookBookItem from "./lookbook-item";

import { apiGet } from "../../utils/request";
import { LookbookData, LookbookDataMin } from "../../types/data-type";
import useLookbook from "../../hooks/useLookbook";

const MainLookbook: NextPage = () => {
  const { data: lookbooks } = useQuery<LookbookData[]>({
    queryKey: ["lookbooks"],
    queryFn: apiGet.GET_LOOKS,
  });

  const { lookbookList } = useLookbook({ lookbooks: lookbooks ?? [] });

  return (
    <div>
      <div className="mb-5">
        <h2 className="px-5 text-xl">Look Book</h2>
        <p className="px-5 text-textColor-gray-100">회원 스타일 피드</p>
      </div>
      <div className="border border-t-common-black border-b-common-black">
        <ul className="flex overflow-x-scroll">
          {lookbookList.map((look: LookbookDataMin) => (
            <MainLookBookItem key={look.id} {...look} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainLookbook;
