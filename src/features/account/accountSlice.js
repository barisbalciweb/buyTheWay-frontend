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
  userAccountInfo: {
    result: null,
    status: "idle",
    error: null,
  },
  userUpdate: {
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

// FETCH USER ACCOUNT INFO
export const getUserAccountInfo = createAsyncThunk(
  "account/getUserAccountInfo",
  async ({ userId, requestedFields }, { rejectWithValue }) => {
    let requestedFieldsQuery = "";
    if (requestedFields) {
      requestedFieldsQuery = requestedFields
        .map((field) => `requestedFields=${field}`)
        .join("&");
    }

    try {
      const url = `${api_url}/user/accountInfo?userId=${userId}&${requestedFieldsQuery}`;
      const { data } = await axios.get(url, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// UPDATE USER ACCOUNT INFO
export const updateUserData = createAsyncThunk(
  "account/updateUserData",
  async (userData, { rejectWithValue }) => {
    try {
      const url = `${api_url}/user`;
      const { data } = await axios.patch(url, userData, {
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
  reducers: {
    resetUserUpdate: (state) => {
      state.userUpdate.status = "idle";
      state.userUpdate.result = null;
      state.userUpdate.error = null;
    },
  },
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
      })

      // GET USER ACCOUNT INFO
      .addCase(getUserAccountInfo.pending, (state) => {
        state.userAccountInfo.status = "loading";
      })
      .addCase(getUserAccountInfo.fulfilled, (state, action) => {
        state.userAccountInfo.status = "succeeded";
        state.userAccountInfo.result = action.payload;
      })
      .addCase(getUserAccountInfo.rejected, (state, action) => {
        state.userAccountInfo.status = "failed";
        state.userAccountInfo.error = action.payload;
      })

      // UPDATE USER DATA
      .addCase(updateUserData.pending, (state) => {
        state.userUpdate.status = "loading";
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.userUpdate.status = "succeeded";
        state.userUpdate.result = action.payload;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.userUpdate.status = "failed";
        state.userUpdate.error = action.payload;
      });
  },
});

export const { resetUserUpdate } = accountSlice.actions;
export default accountSlice.reducer;
