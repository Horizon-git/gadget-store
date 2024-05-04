import { Product } from '../types/Product';

export const getHotPriceProducts = (items: Product[]) => {
  const hotPriceProducts = [...items]
    .filter(item => item.price !== item.fullPrice)
    .sort((a, b) => b.price - a.price)
    .slice(0, 12);

  return hotPriceProducts;
};
