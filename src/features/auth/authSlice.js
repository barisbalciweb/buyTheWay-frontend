import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrlSwitch } from "../../utils/apiUrlSwitch";
import axios from "axios";

const api_url = apiUrlSwitch();

const initialState = {
  isLoggedIn: false,
  login: {
    result: null,
    status: "idle",
    error: null,
  },
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
      return rejectWithValue(error.response.data.message);
    }
  }
);

// LOGIN USER
export const login = createAsyncThunk(
  "login",
  async (credentials, { rejectWithValue }) => {
    try {
      const url = `${api_url}/auth/login`;
      const { data } = await axios.post(url, credentials);
      return data;
    } catch (error) {
      return rejectWithValue(error.message.data.message);
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
    resetRegistration: (state) => {
      state.registration = {
        result: null,
        status: "idle",
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
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
      })

      // LOGIN
      .addCase(login.pending, (state, action) => {
        state.login.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.status = "succeeded";
        state.login.result = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.login.status = "failed";
        state.login.error = action.error.message;
      });
  },
});

export const { setIsLoggedIn, resetRegistration } = authSlice.actions;
export default authSlice.reducer;
