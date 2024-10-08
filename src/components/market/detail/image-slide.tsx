import { NextPage } from "next";
import { Icon } from "@iconify/react";
import Image from "next/image";

import LoadingSpinner from "../../common/ui/loading-spinner";

import useSlide from "../../../hooks/useSlide";
import { translateClasses } from "../../../common/consts/translate-class";
import { cls } from "../../../common/util/class";
import { ImageSlideProps } from "./types";

const ImageSlide: NextPage<ImageSlideProps> = ({ images, isLoading, imgH, propH, slideTime }) => {
  const { next, prev, transitionEnd, translateX, isMoving, slideNum } = useSlide({
    list: images,
    classes: translateClasses.detailSlide,
    slideTime: slideTime,
  });

  const lastImageClone = images[images.length - 1]?.img as string;
  const firstImageClone = images[0]?.img as string;

  return (
    <div className="relative">
      <div className={`${imgH ? imgH : "min-h-[370px]"} w-full overflow-hidden bg-slate-200`}>
        {isLoading && <LoadingSpinner />}
        <ul
          className={cls(
            `flex [&>li]:flex-shrink-0 ${translateX}`,
            isMoving ? `transition duration-700 ease-in-out` : "",
          )}
          onTransitionEnd={transitionEnd}
        >
          <li>
            <Image
              src={lastImageClone}
              alt="상품이미지00"
              width={390}
              height={propH ? propH : 370}
              className={`${imgH ? imgH : "h-[370px]"} w-[390px] object-cover`}
              priority
            />
          </li>
          {images.map(item => (
            <li key={item.id}>
              <Image
                src={item.img}
                alt={`상품이미지${item.id}`}
                width={390}
                height={propH ? propH : 370}
                className={`${imgH ? imgH : "h-[370px]"} w-[390px] object-cover`}
              />
            </li>
          ))}
          <li>
            <Image
              src={firstImageClone}
              alt="상품이미지"
              width={390}
              height={propH ? propH : 370}
              className={`${imgH ? imgH : "h-[370px]"} w-[390px] object-cover`}
            />
          </li>
        </ul>
      </div>
      {images.length > 1 && (
        <div className="absolute top-1/2 flex w-[390px] items-center justify-between px-5 text-2xl text-common-black">
          <Icon icon="material-symbols:chevron-left" className="absolute left-2" onClick={prev} />
          <Icon icon="material-symbols:chevron-right" className="absolute right-2" onClick={next} />
        </div>
      )}
      <div className="absolute bottom-2 flex h-[3px] w-[390px] justify-center space-x-0.5">
        {images.length > 1 &&
          images.map((item, i) => (
            <span
              key={item.id}
              className={`block h-[2px] w-6 ${slideNum - 1 === i ? "bg-black" : "bg-white opacity-50"}`}
            />
          ))}
      </div>
    </div>
  );
};

export default ImageSlide;
