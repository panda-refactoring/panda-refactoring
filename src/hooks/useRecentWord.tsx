import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useRecentWord = () => {
  const [recentWords, setRecentWords] = useState<string[]>([]);

  const session = useSession();

  const CACHE_KEY = "recentSearches";
  const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const AUTHENTICATED = session.status === "authenticated";

  useEffect(() => {
    if (AUTHENTICATED) {
      caches.open(`my-cache-${session.data?.user?.email}`).then(cache => {
        cache.match(CACHE_KEY).then(response => {
          if (response) {
            response.json().then(data => {
              setRecentWords(data);
            });
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    if (AUTHENTICATED) {
      caches.open(`my-cache-${session.data?.user?.email}`).then(cache => {
        const expirationDate = new Date().getTime() + EXPIRATION_TIME;
        const cacheHeaders = new Headers({
          "Content-Type": "application/json",
          Expires: new Date(expirationDate).toUTCString(),
        });
        const cacheOptions = {
          headers: cacheHeaders,
        };
        const uniqueSearches = [...new Set(recentWords)];
        cache.put(new Request(CACHE_KEY), new Response(JSON.stringify(uniqueSearches), cacheOptions));
      });
    }
  }, [recentWords]);

  return { recentWords, setRecentWords };
};

export default useRecentWord;
