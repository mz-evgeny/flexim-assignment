import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Supplier } from "src/types";

export const dictionariesApi = createApi({
  reducerPath: "dictionariesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builder) => ({
    getListSuppliers: builder.query<Supplier, object>({
      query: () => "suppliers",
    }),
  }),
});

export const { useGetListSuppliersQuery } = dictionariesApi;
