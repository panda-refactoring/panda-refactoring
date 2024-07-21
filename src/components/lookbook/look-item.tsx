import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { Icon } from "@iconify/react";

import useFavorite from "../../hooks/useFavorite";
import { LookbookData } from "../../common/types/data.types";
import useModal from "src/hooks/useModal";

interface LookItemProps extends LookbookData {
  userId: number;
}

const LookItem: NextPage<LookItemProps> = ({ user, imgurl, id, userId }) => {
  const { isFavoriteActive, toggleFavoriteButton } = useFavorite({ currentUserId: userId || 1 });

  const { setLoginModal } = useModal();

  const router = useRouter();

  const goLoginPage = () => router.push("/login");

  const clickFavoriteButton = async () => {
    if (!userId && userId !== 0) {
      setLoginModal({ submitFn: goLoginPage });
      return;
    }

    toggleFavoriteButton();
  };

  return (
    <li className="flex h-[220px] justify-center border-b border-r border-common-black pt-4">
      <div className="relative h-[175px] w-36">
        <Link href={`lookbook/${id}`}>
          <div className="h-[175px] w-36 bg-slate-200">
            <Image
              src={imgurl[0]?.img}
              width={160}
              height={190}
              alt={`룩북 썸네일 이미지${id}`}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </Link>
        <p className="text-common-black">@{user.nickname}</p>
        <div className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-common-black">
          {isFavoriteActive ? (
            <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-common-black bg-common-black">
              <Icon
                icon="icon-park-solid:like"
                color="#ff5252"
                className="border border-common-black text-lg"
                onClick={clickFavoriteButton}
              />
            </div>
          ) : (
            <Icon
              icon="icon-park-outline:like"
              className="cursor-pointer text-lg transition hover:scale-110"
              onClick={clickFavoriteButton}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default LookItem;
