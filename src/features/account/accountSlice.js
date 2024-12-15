import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrlSwitch } from "../../utils/apiUrlSwitch";
import axios from "axios";

const api_url = apiUrlSwitch();

const initialState = {
  userData: {
    result: null,
    status: "idle",
    error: null,
  },
};

// FETCH USER DATA
export const getUserData = createAsyncThunk(
  "account/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const url = `${api_url}/user`;
      const { data } = await axios.get(url, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET USER DATA
      .addCase(getUserData.pending, (state) => {
        state.userData.status = "loading";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData.status = "succeeded";
        state.userData.result = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.userData.status = "failed";
        state.userData.error = action.payload;
      });
  },
});

export const {} = accountSlice.actions;
export default accountSlice.reducer;
