import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { result, set } from "lodash";
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
    postalCode: "",
    city: "",
    country: "",
  },
  selectedPaymentMethod: "",
  order: {
    status: "idle",
    data: null,
    error: null,
  },
  orderSummary: {
    status: "idle",
    result: null,
    data: null,
  },
  orderDetail: {
    status: "idle",
    result: null,
    data: null,
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

// GET ORDER SUMMARY
export const getOrder = createAsyncThunk(
  "checkout/getOrder",
  async (userId, { rejectWithValue }) => {
    try {
      const url = `${api_url}/orders/${userId}`;
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// GET ORDER DETAILLED DATA
export const getOrderDetail = createAsyncThunk(
  "checkout/getOrderDetail",
  async (_, { rejectWithValue }) => {
    try {
      const url = `${api_url}/orders/${userId}`;
      const { data } = await axios.get(url);
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
        postalCode: "",
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
    builder
      .addCase(postOrder.pending, (state, action) => {
        state.order.status = "loading";
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.order.status = "succeeded";
        state.order.data = action.payload;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.order.status = "failed";
        state.order.error = action.payload;
      })

      // GET ORDER SUMMARY
      .addCase(getOrder.pending, (state, action) => {
        state.orderSummary.status = "loading";
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orderSummary.status = "succeeded";
        state.orderSummary.data = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.orderSummary.status = "failed";
        state.orderSummary.error = action.payload;
      })

      // GET ORDER DETAILLED DATA
      .addCase(getOrderDetail.pending, (state, action) => {
        state.orderDetail.status = "loading";
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.orderDetail.status = "succeeded";
        state.orderDetail.data = action.payload;
      })
      .addCase(getOrderDetail.rejected, (state, action) => {
        state.orderDetail.status = "failed";
        state.orderDetail.error = action.payload;
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
