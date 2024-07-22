import { useEffect, useState } from "react";
import { ProductData } from "../common/types/data.types";

const useSlide = ({
  list,
  classes,
  slideTime,
}: {
  list: { id: number; img: string }[] | ProductData[];
  classes: string[];
  slideTime?: number;
}) => {
  const [slideCount, setSlideCount] = useState<number>(1);
  const [translateX, setTranslateX] = useState<string>("");
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const countUp = () => {
    if (isMoving) return;
    setSlideCount(prev => (prev += 1));
    setIsMoving(true);
  };

  const countDown = () => {
    if (isMoving) return;
    setSlideCount(prev => (prev -= 1));
    setIsMoving(true);
  };

  const transitionEnd = () => {
    if (slideCount === list.length + 1) {
      setIsMoving(false);
      setSlideCount(1);
    } else if (slideCount === 0) {
      setIsMoving(false);
      setSlideCount(list.length);
    } else {
      setIsMoving(false);
    }
  };

  useEffect(() => {
    const translate = classes[slideCount];
    setTranslateX(translate);
  }, [slideCount]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (slideTime) {
      timer = setTimeout(() => countUp(), slideTime);
    }

    return () => clearTimeout(timer);
  }, [isMoving]);

  return {
    next: countUp,
    prev: countDown,
    transitionEnd,
    translateX,
    isMoving,
    slideNum: slideCount,
  };
};

export default useSlide;
