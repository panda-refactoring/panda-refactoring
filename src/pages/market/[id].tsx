import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Header from "../../components/common/header";
import LoadingSpinner from "../../components/common/ui/loading-spinner";
import ImageSlide from "../../components/market/detail/image-slide";
import TitleArea from "src/components/market/detail/title-box";
import CategoryArea from "src/components/market/detail/category-box";
import Seller from "src/components/market/detail/seller";
import Description from "src/components/market/detail/description";
import PriceBox from "src/components/market/detail/price-box";

import useAuth from "src/hooks/useAuth";
import useFavorite from "../../hooks/useFavorite";
import useModal from "../../hooks/useModal";
import { updateViews } from "../../common/util/market-view";
import { useUpdateProductFavorite } from "src/service/query/favorite";
import { useGetProduct } from "src/service/query/product";

const Product: NextPage = () => {
  const router = useRouter();
  const { id: productId } = router.query;

  const goLoginPage = () => router.push("/login");

  const { userData } = useAuth();

  const { setLoginModal } = useModal();

  const { data: product, isLoading } = useGetProduct({ productId: productId as string });

  const { isFavoriteActive, favoriteCount, updateFavorite } = useFavorite({
    currentUserId: Number(userData?.id),
    favorite: product?.favorite ?? [],
  });

  const { mutate, isSuccess } = useUpdateProductFavorite();

  const toggleFavorite = () => {
    if (!userData || !userData?.id) {
      setLoginModal({ submitFn: goLoginPage });
      return;
    }

    mutate({
      currentUserId: Number(userData?.id),
      productId: product?.id,
    });
  };

  useEffect(() => {
    if (isSuccess) updateFavorite();
  }, [isSuccess]);

  useEffect(() => {
    if (!product || !userData) return;
    updateViews(userData.id, Number(productId), product.view);
  }, [product]);

  const hasProduct = !isLoading && product;

  return (
    <>
      <Header goBack />
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      {hasProduct ? (
        <>
          <ImageSlide images={product.imgurl} isLoading={isLoading} />
          <div className="p-5">
            <TitleArea product={product} isFavoriteActive={isFavoriteActive} toggleFavorite={toggleFavorite} />
            <CategoryArea product={product} favoriteCount={favoriteCount} />
            <Description product={product} />
            <Seller product={product} />
          </div>
          <PriceBox product={product} />
        </>
      ) : (
        <div>상품정보를 찾을 수 없습니다.</div>
      )}
    </>
  );
};

export default Product;
