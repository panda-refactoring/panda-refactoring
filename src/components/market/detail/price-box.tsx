import { ProductData } from "src/common/types/data.types";
import { priceAddComma } from "src/common/util/markets";
import Button from "src/components/common/ui/button";

const PriceBox = ({ product }: { product: ProductData }) => {
  return (
    <div className="fixed bottom-0 flex w-[390px] items-center justify-between border border-t-common-black bg-white p-5">
      <p className="text-2xl font-bold">
        {priceAddComma(product.price)}
        <span className="text-lg">원</span>
      </p>
      <div className="relative">
        <Button
          type="button"
          text="구매하기"
          classes="bg-black"
          width="w-[215px]"
          fontColor="text-white"
        />
      </div>
    </div>
  );
};

export default PriceBox;
