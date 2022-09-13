import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import IAddress from "../types/IAddress";

interface AddressState {
  addresses: IAddress[];
  count: number;
}

function loadFromLocalStorage(): IAddress[] {
  try {
    const serializedStore = window.localStorage.getItem("address");
    if (serializedStore === null) return [];
    const data = JSON.parse(serializedStore);
    return data;
  } catch (e) {
    console.log("Error", e);
    return [];
  }
}

const initialState: AddressState = {
  addresses: loadFromLocalStorage(),
  count: loadFromLocalStorage().length,
};

export const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {
    //Add address
    addAddress: (state, action: PayloadAction<IAddress>) => {
      //Updates count
      state.count += 1;
      //Adds to array
      state.addresses = state.addresses.concat(action.payload);
      //Updates local storage
      window.localStorage.setItem("address", JSON.stringify(state.addresses));
    },
    //Remove address
    removeAddress: (state, action: PayloadAction<string>) => {
      //Updates count
      state.count -= 1;
      //Removes from array
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
      //Updates local storage
      window.localStorage.setItem("address", JSON.stringify(state.addresses));
    },
    //Empty addresses
    empty: (state) => {
      //Updates count
      state.count = 0;
      //Empty array
      state.addresses = [];
      //Updates local storage
      window.localStorage.setItem("address", JSON.stringify(state.addresses));
    },
  },
});

export const { addAddress, removeAddress, empty } = addressSlice.actions;
export const selectAddress = (state: RootState) =>
  state.address.addresses.values;
export default addressSlice.reducer;
