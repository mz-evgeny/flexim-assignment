import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Params } from "shared";
import { BASE_URL } from "src/constants";
import { Product } from "src/types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      { data: Product[]; total: number; page: number; totalPages: number },
      Params
    >({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return `products?${queryParams}`;
      },
    }),
  }),
});

export const { useLazyGetProductsQuery } = productsApi;
