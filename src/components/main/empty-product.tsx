import { NextPage } from "next";
import Image from "next/image";
import emptybox from "public/asset/image/emptybox.svg";

const EmptyProduct: NextPage = () => {
  return (
    <div>
      <div className="mx-auto mb-4 h-20 w-20">
        <Image src={emptybox} alt="" width={80} height={80} />
      </div>
      <p>해당 키워드에 준비된 상품이 없습니다.</p>
    </div>
  );
};

export default EmptyProduct;
