import { client } from '../utils/fetchClient';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getPhonesDetails = () => {
  return client.get<ProductDetails[]>(`/phones.json`);
};

export const getTabletsDetails = () => {
  return client.get<ProductDetails[]>(`/tablets.json`);
};

export const getAccessoriesDetails = () => {
  return client.get<ProductDetails[]>(`/accessories.json`);
};
