import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";

const initialState = {
  isProgressStepDisabled: {
    payment: true,
    overview: true,
  },
  addressFormValues: {
    title: "",
    firstName: "",
    lastName: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    city: "",
    country: "",
  },
  selectedPaymentMethod: "",
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setIsProgressStepDisabled: (state, action) => {
      const { component, value } = action.payload;
      state.isProgressStepDisabled = set(
        state.isProgressStepDisabled,
        component,
        value
      );
    },
    setAddressFormValues: (state, action) => {
      const { id, value } = action.payload;
      state.addressFormValues = set(state.addressFormValues, id, value);
    },
    setSelectedPaymentMethod: (state, action) => {
      state.selectedPaymentMethod = action.payload;
    },
  },
});

export const {
  setIsProgressStepDisabled,
  setAddressFormValues,
  setSelectedPaymentMethod,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
