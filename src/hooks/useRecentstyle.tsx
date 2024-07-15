import { useEffect, useState } from "react";

import { ProductData } from "../common/types";

const useRecentstyle = ({ products }: { products: any }) => {
  const [recentItems, setRecentItems] = useState<ProductData[]>([]);

  useEffect(() => {
    if (!products) return;
    setRecentItems(products.slice(-10).reverse());
  }, [products]);

  return { recentItems };
};

export default useRecentstyle;
