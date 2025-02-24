import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, QueryString } from "src/types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builder) => ({
    getPaginatedListProducts: builder.query<Product, QueryString>({
      query: (queryString) => {
        const queryParams = new URLSearchParams(queryString).toString();
        return `products?${queryParams}`;
      },
    }),
  }),
});

export const { useLazyGetPaginatedListProductsQuery } = productsApi;
