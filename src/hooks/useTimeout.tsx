import { useEffect, useRef } from "react";

const useTimeout = (timerFn: () => void, delay: number, dependancy?: any[]) => {
  const callback = useRef<() => void>();

  useEffect(() => {
    callback.current = timerFn;
  }, [timerFn]);

  useEffect(
    () => {
      const timer = setTimeout(() => {
        if (callback.current) timerFn();
      }, delay ?? 0);

      return () => clearTimeout(timer);
    },
    dependancy ? [...dependancy] : [],
  );
};

export default useTimeout;
