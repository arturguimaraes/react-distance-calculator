import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "./addressSlice";

export const store = configureStore({
  reducer: { address: addressReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
