import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrlSwitch } from "../../utils/apiUrlSwitch";
import axios from "axios";

const api_url = apiUrlSwitch();

const initialState = {
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
  authentication: {
    result: null,
    status: "idle",
    error: null,
  },
};

// REGISTER NEW USER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const url = `${api_url}/auth/register`;
      const { data } = await axios.post(url, userData, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// LOGIN USER
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const url = `${api_url}/auth/login`;
      const { data } = await axios.post(url, credentials, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// VERIFY COOKIE
export const verifyCookie = createAsyncThunk(
  "auth/verifyCookie",
  async (_, { rejectWithValue }) => {
    try {
      const url = `${api_url}/auth/verifyCookie`;
      const { data } = await axios.get(url, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
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
    resetLogin: (state) => {
      state.login = {
        result: null,
        status: "idle",
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.registration.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registration.status = "succeeded";
        state.registration.result = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registration.status = "failed";
        state.registration.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state, action) => {
        state.login.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.status = "succeeded";
        state.login.result = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.status = "failed";
        state.login.error = action.payload;
      })

      // VERIFY COOKIE
      .addCase(verifyCookie.pending, (state, action) => {
        state.authentication.status = "loading";
      })
      .addCase(verifyCookie.fulfilled, (state, action) => {
        state.authentication.status = "succeeded";
        state.authentication.result = action.payload.isValid;
      })
      .addCase(verifyCookie.rejected, (state, action) => {
        state.authentication.status = "failed";
        state.authentication.error = action.payload;
      });
  },
});

export const { setIsLoggedIn, resetRegistration, resetLogin } =
  authSlice.actions;
export default authSlice.reducer;
