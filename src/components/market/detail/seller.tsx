import { ProductData } from "src/common/types/data.types";

const Seller = ({ product }: { product: ProductData }) => {
  return (
    <div className="py-5 pb-20">
      <h3 className="mb-4 text-lg font-bold">Seller</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-[50px] w-[50px] overflow-hidden rounded-full border border-common-black">
            <img
              src={product?.user?.profileImg}
              alt="유저프로필이미지"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="ml-4 text-base font-bold">
            {product?.user?.nickname}
          </span>
        </div>
        <button className="h-8 bg-black px-4 py-1 text-white">메시지</button>
      </div>
    </div>
  );
};

export default Seller;
