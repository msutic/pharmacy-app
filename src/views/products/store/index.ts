import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

export interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    editProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      state.products[index] = action.payload;
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { setProducts, addProduct, editProduct, deleteProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
