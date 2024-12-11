import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrlSwitch } from "../../utils/apiUrlSwitch";
import axios from "axios";

const api_url = apiUrlSwitch();

const initialState = {
  isLoggedIn: false,
  loginStatus: "idle",
  loginError: null,
};

export const login = createAsyncThunk(
  "login",
  async (credentials, { rejectWithValue }) => {
    try {
      const url = `${api_url}/auth/login`;

      const { data } = await axios.post(url, credentials);

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
      .addCase(login.pending, (state, action) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError = action.error.message;
      });
  },
});

export const { setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
