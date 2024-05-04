/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import productDetailsReducer from '../features/productDetailsSlice';
import favoritesReducer from '../features/favoritesSlice';
import cartReducer from '../features/cartSlice';
import themeReducer from '../features/themeSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    theme: themeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
