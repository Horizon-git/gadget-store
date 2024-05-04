/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductDetails } from '../types/ProductDetails';
import { Category } from '../types/Product';
import {
  getAccessoriesDetails,
  getPhonesDetails,
  getTabletsDetails,
} from '../api/products';

export interface ProductDetailsState {
  productDetails: ProductDetails | null;
  loadingDetails: boolean;
  hasError: boolean;
}

const initialState: ProductDetailsState = {
  productDetails: null,
  loadingDetails: false,
  hasError: false,
};

export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async ({
    productId,
    category,
  }: {
    productId: string;
    category: Category;
  }) => {
    let product: ProductDetails | undefined;

    switch (category) {
      case 'phones':
        product = (await getPhonesDetails()).find(p => p.id === productId);
        break;
      case 'tablets':
        product = (await getTabletsDetails()).find(p => p.id === productId);
        break;
      case 'accessories':
        product = (await getAccessoriesDetails()).find(p => p.id === productId);
        break;
      default:
        throw new Error('Invalid product category');
    }

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  },
);

export const productsDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductDetails.pending, state => {
        state.loadingDetails = true;
        state.hasError = false;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, state => {
        state.hasError = true;
        state.loadingDetails = false;
      });
  },
});

export default productsDetailsSlice.reducer;
