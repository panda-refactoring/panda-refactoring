import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useQuery } from "react-query";

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
import { ProductData } from "../../common/types/data.types";
import { apiGet } from "../../service/request";
import Modal from "src/components/common/ui/modal";
import { modalContext } from "src/context/modal-context";

const Product: NextPage = () => {
  const router = useRouter();
  const { id: productId } = router.query;

  const goLoginPage = () => router.push("/login");

  const { userData } = useAuth();

  const { modal, isOpen } = useContext(modalContext);

  const { setLoginModal } = useModal();

  const getProduct = async () => {
    const data = await apiGet.GET_ITEM(productId as string);
    return data;
  };

  const { data: product, isLoading } = useQuery<ProductData>("getData", getProduct, {
    enabled: !!productId,
    notifyOnChangeProps: "tracked",
  });

  const { isFavoriteActive, favoriteCount, toggleFavoriteButton } = useFavorite({
    currentUserId: Number(userData?.id),
    productData: product,
  });

  const toggleFavorite = () => {
    if (!userData?.id) {
      setLoginModal({ submitFn: goLoginPage });
      return;
    }

    toggleFavoriteButton();
  };

  useEffect(() => {
    if (!product || !userData) return;
    updateViews(userData.id, Number(productId), product.view);
  }, [product]);

  const hasProduct = !isLoading && product;

  return (
    <>
      <Header goBack />
      <Modal isOpen={isOpen} {...modal} />
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
