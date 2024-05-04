import { Category, Product } from '../types/Product';

export const getSuggestedProducts = (
  allProducts: Product[],
  currentProductId: string,
  numberOfSuggestions: number,
  category: Category,
) => {
  const productsCopy = allProducts.filter(
    product =>
      product.itemId !== currentProductId && product.category === category,
  );

  const randomProducts = [];

  for (let i = 0; i < numberOfSuggestions; i += 1) {
    const randomIndex = Math.floor(Math.random() * productsCopy.length);
    const selectedProduct = productsCopy.splice(randomIndex, 1)[0];

    randomProducts.push(selectedProduct);
  }

  return randomProducts;
};
