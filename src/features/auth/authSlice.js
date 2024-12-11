import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrlSwitch } from "../../utils/apiUrlSwitch";
import axios from "axios";

const api_url = apiUrlSwitch();

const initialState = {
  isLoggedIn: false,
  registration: {
    result: null,
    status: "idle",
    error: null,
  },
};

// REGISTER NEW USER
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const url = `${api_url}/auth/register`;
      const { data } = await axios.post(url, userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registration.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registration.status = "succeeded";
        state.registration.result = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.registration.status = "failed";
        state.registration.error = action.payload;
      });
  },
});

export const { setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
