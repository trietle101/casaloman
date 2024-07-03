import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const res = await fetch("https://casaloman-api.vercel.app/products");
    const productsData = await res.json();
    return productsData;
  }
);
