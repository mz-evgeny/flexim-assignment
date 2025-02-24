import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { dictionariesApi } from "src/services/dictionaries";
import { productsApi } from "src/services/products";

export const store = configureStore({
  reducer: {
    [dictionariesApi.reducerPath]: dictionariesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dictionariesApi.middleware,
      productsApi.middleware
    ),
});

setupListeners(store.dispatch);
