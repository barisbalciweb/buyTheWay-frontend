import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";
import { apiUrlSwitch } from "../../utils/apiUrlSwitch";
import axios from "axios";

const api_url = apiUrlSwitch();

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
  order: {
    status: "idle",
    data: null,
    error: null,
  },
};

// POST ORDER DATA
export const postOrder = createAsyncThunk(
  "checkout/postOrder",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const url = `${api_url}/orders`;
      const { data } = await axios.post(url, checkoutData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    resetAllStates: (state) => {
      state.isProgressStepDisabled.payment = true;
      state.isProgressStepDisabled.overview = true;
      state.addressFormValues = {
        title: "",
        firstName: "",
        lastName: "",
        street: "",
        houseNumber: "",
        zipCode: "",
        city: "",
        country: "",
      };
      state.selectedPaymentMethod = "";
      state.order = {
        status: "idle",
        data: null,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    // POST ORDER
    builder.addCase(postOrder.pending, (state, action) => {
      state.order.status = "loading";
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.order.status = "succeeded";
      state.order.data = action.payload;
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.order.status = "failed";
      state.order.error = action.payload;
    });
  },
});

export const {
  setIsProgressStepDisabled,
  setAddressFormValues,
  setSelectedPaymentMethod,
  resetAllStates,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
