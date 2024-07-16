import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { LookbookDataMin } from "../../common/types/data.types";

const LookBookItem: NextPage<LookbookDataMin> = ({ id, imgurl, user }) => {
  return (
    <li className="border-r border-common-black px-4 py-4 first:pl-0">
      <Link
        href={`/lookbook/${id}`}
        className="relative block h-56 w-48 overflow-hidden bg-borderColor-gray"
      >
        <div className="absolute left-0 top-0 h-full w-full bg-black opacity-20 transition duration-300 hover:opacity-0" />
        <Image
          src={imgurl[0].img}
          alt={`${user.nickname}님의 룩북 바로가기`}
          width={192}
          height={224}
          className="h-56 w-48 object-cover"
        />
        <p className="absolute bottom-4 left-4 z-10 text-white">
          @{user.nickname}
        </p>
      </Link>
    </li>
  );
};

export default LookBookItem;
