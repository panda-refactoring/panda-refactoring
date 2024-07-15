const initMSW = async () => {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    return server.listen();
  } else {
    const { worker } = await import('./browser');
    return worker.start({
      onUnhandledRequest: (req) => {
        if (req.url.startsWith('/_next/static/')) {
          return;
        }
      },
    });
  }
};

export { initMSW };
