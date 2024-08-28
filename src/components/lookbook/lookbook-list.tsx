import { useQuery } from "react-query";
import { useRecoilValueLoadable } from "recoil";
import { currentUserInfoQuery } from "src/recoil/user";

import LookItem from "./look-item";

import { LookbookData } from "src/common/types/data.types";
import { apiGet } from "src/service/request";

const LookbookList = () => {
  const userInfo = useRecoilValueLoadable(currentUserInfoQuery);
  const { contents: userContents } = userInfo;
  const userId = userContents?.id ?? 1;

  const { data: allLookbookData } = useQuery({
    queryKey: ["lookbooks"],
    queryFn: apiGet.GET_LOOKS,
    suspense: true,
  });

  const lookbookList = allLookbookData?.slice().reverse();

  return (
    <ul className="grid grid-cols-2 pb-10">
      {lookbookList.map((data: LookbookData) => (
        <LookItem key={data.id} {...data} userId={userId || 1} />
      ))}
    </ul>
  );
};

export default LookbookList;
