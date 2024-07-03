import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../actions/productsActionThunk";

const initialState = {
  products: [],
  error: null
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.products = [];
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.products = [];
        state.error = action.error?.message ?? "Error in getting products";
      });
  }
});
export default productsSlice.reducer;
