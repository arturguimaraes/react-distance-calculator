import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import IAddress from "../types/IAddress";

interface AddressState {
  addresses: IAddress[];
  selected: number;
  count: number;
}

const loadFromLocalStorage = () => {
  try {
    const serializedStore = window.localStorage.getItem("address");
    if (serializedStore === null) return [];
    const data = JSON.parse(serializedStore);
    return data;
  } catch (e) {
    console.log("Error loading from local storage:", e);
    return [];
  }
};

const getLocalStorageLength = () => {
  const addresses = loadFromLocalStorage();
  return addresses.length;
};

const initialState: AddressState = {
  addresses: loadFromLocalStorage(),
  selected: 0,
  count: getLocalStorageLength(),
};

export const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {
    //Add address
    addAddress: (state, action: PayloadAction<IAddress>) => {
      //Function to check if is in array
      const sameAddress = (address1: IAddress, address2: IAddress) => {
        if (address1.address === address2.address) return true;
        if (address1.lat === address2.lat) return true;
        if (address1.lng === address2.lng) return true;
        return false;
      };
      //Check if is already added
      const notInArray =
        state.addresses.find((address) =>
          sameAddress(action.payload, address)
        ) === undefined;
      //If not in array
      if (notInArray) {
        //Updates count
        state.count += 1;
        //Adds to array
        state.addresses = state.addresses.concat(action.payload);
        //Updates selected
        state.selected = state.addresses.length - 1;
        //Updates local storage
        window.localStorage.setItem("address", JSON.stringify(state.addresses));
      }
    },
    //Remove address
    removeAddress: (state, action: PayloadAction<string>) => {
      //If only one element
      if (state.count === 1) {
        //Updates count
        state.count = 0;
        //Empty array
        state.addresses = [];
        //Updates selected
        state.selected = 0;
        //Updates local storage
        window.localStorage.setItem("address", JSON.stringify(state.addresses));
      }
      //More than 1
      else {
        //Updates count
        state.count -= 1;
        //Removes from array
        state.addresses = state.addresses.filter(
          (address) => address.id !== action.payload
        );
        //Updates selected
        state.selected = state.addresses.length - 1;
        //Updates local storage
        window.localStorage.setItem("address", JSON.stringify(state.addresses));
      }
    },
    //Empty addresses
    emptyAddresses: (state) => {
      //Updates count
      state.count = 0;
      //Empty array
      state.addresses = [];
      //Updates selected
      state.selected = 0;
      //Updates local storage
      window.localStorage.setItem("address", JSON.stringify(state.addresses));
    },
    //Set selected
    setSelectedAddress: (state, action: PayloadAction<number>) => {
      //Updates selected
      state.selected = action.payload;
    },
  },
});

export const { addAddress, removeAddress, emptyAddresses, setSelectedAddress } =
  addressSlice.actions;
export const selectAddress = (state: RootState) =>
  state.address.addresses.values;
export default addressSlice.reducer;
