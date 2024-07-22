import { useEffect, useRef } from "react";

const useTimeout = (
  timerFn: () => void,
  delay: number = 0,
  dependancy?: any[],
) => {
  const callback = useRef<() => void>();

  useEffect(() => {
    callback.current = timerFn;
  }, [timerFn]);

  useEffect(
    () => {
      const timer = setTimeout(() => {
        if (callback.current) timerFn();
      }, delay);

      return () => clearTimeout(timer);
    },
    dependancy ? [...dependancy] : [],
  );
};

export default useTimeout;
