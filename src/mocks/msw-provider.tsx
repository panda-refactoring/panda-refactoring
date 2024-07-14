import { PropsWithChildren, useEffect, useState } from 'react';
import { initMSW } from '.';

const isAPIMockingMode = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';

const MSWProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (isAPIMockingMode) {
        await initMSW();
        setIsReady(true);
      }
    };

    if (!isReady) init();
  }, [isReady]);

  if (!isReady) return null;
  return <>{children}</>;
};

export default MSWProvider;
