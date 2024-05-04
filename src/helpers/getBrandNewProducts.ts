import { Product } from '../types/Product';

export const getBrandNewProducts = (products: Product[]) => {
  const newProducts = [...products].sort((a, b) => b.id - a.id).slice(0, 12);

  return newProducts;
};
