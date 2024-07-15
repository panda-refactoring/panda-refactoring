import { PropsWithChildren, useEffect, useState } from 'react';
import { initMSW } from '.';

const MSWProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    const enableMocking = async () => {
      if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled') return;
    
      await initMSW();
      setIsReady(true);
    }

    if (!isReady) enableMocking();
  }, [isReady]);

  if (!isReady) return null;
  return <>{children}</>;
};

export default MSWProvider;
