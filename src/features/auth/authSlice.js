import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrlSwitch } from "../../utils/apiUrlSwitch";
import axios from "axios";

const api_url = apiUrlSwitch();

const initialState = {
  isAuthenticated: false,
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
    userId: null,
    status: "idle",
    error: null,
  },
  logout: {
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

// AUTHENTICATE USER
export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async (_, { rejectWithValue }) => {
    try {
      const url = `${api_url}/auth/authentication`;
      const { data } = await axios.get(url, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// LOGOUT USER
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const url = `${api_url}/auth/logout`;
      const { data } = await axios.post(url, credentials, {
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
    setIsLoggedIn: (state) => {
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
    resetAuthentication: (state) => {
      state.isAuthenticated = false;
      state.authentication = {
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
        state.registration.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registration.status = "failed";
        state.registration.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.login.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.status = "succeeded";
        state.login.result = action.payload;
        state.login.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.status = "failed";
        state.login.error = action.payload;
      })

      // AUTHENTICATE USER
      .addCase(authenticateUser.pending, (state) => {
        state.authentication.status = "loading";
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.authentication.status = "succeeded";
        state.authentication.userId = action.payload.userId;
        state.authentication.error = null;

        state.isAuthenticated = true;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.authentication.status = "failed";
        state.authentication.error = action.payload;
        state.authentication.result = false;

        state.isAuthenticated = false;
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.logout.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.logout.status = "succeeded";
        state.logout.result = action.payload.message;
        state.error = null;

        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logout.status = "failed";
        state.logout.error = action.payload;
      });
  },
});

export const {
  setIsLoggedIn,
  resetRegistration,
  resetLogin,
  resetAuthentication,
} = authSlice.actions;
export default authSlice.reducer;
