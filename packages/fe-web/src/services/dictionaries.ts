import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "src/constants";
import { Supplier } from "src/types";

export const dictionariesApi = createApi({
  reducerPath: "dictionariesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getListSuppliers: builder.query<Supplier[], object>({
      query: () => "suppliers",
    }),
  }),
});

export const { useGetListSuppliersQuery } = dictionariesApi;
