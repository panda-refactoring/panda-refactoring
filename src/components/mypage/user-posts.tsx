import Image from "next/image";
import Link from "next/link";

import ProductItem from "../main/product-item";
import EmptyPost from "./empty-post";
import { LookbookDataMin, ProductDataMin, UserData } from "src/common/types/data.types";

interface UserPostsProps {
  userData: UserData;
  category: string;
}

const UserPosts = ({ userData, category }: UserPostsProps) => {
  return (
    <>
      {category === "items" &&
        (userData?.product?.length > 0 ? (
          <div className="mx-4 grid grid-cols-2 gap-4 pb-20 pt-5">
            {userData?.product?.map((item: ProductDataMin) => (
              <ProductItem {...item} key={item.id} imgh="h-[190px]" />
            ))}
          </div>
        ) : (
          <EmptyPost>
            <p>등록한 상품이 없어요!</p>
          </EmptyPost>
        ))}
      {category === "looks" &&
        (userData?.look?.length > 0 ? (
          <div className="mx-4 grid grid-cols-2 gap-4 pb-20 pt-5">
            {userData?.look?.map((item: LookbookDataMin) => (
              <Link href={`lookbook/${item.id}`} key={item.id}>
                <div className="h-[200px] w-[172px] border border-common-black bg-slate-200">
                  <Image
                    src={item.imgurl[0]?.img}
                    width={160}
                    height={190}
                    alt={`룩북 썸네일 이미지${item.id}`}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyPost>
            <p>업로드한 포스트가 없어요!</p>
          </EmptyPost>
        ))}
    </>
  );
};

export default UserPosts;
