import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrlSwitch } from "../../utils/apiUrlSwitch";

const api_url = apiUrlSwitch();

const initialState = {
  messages: [],
  messageSent: {
    status: "idle",
    result: null,
    error: null,
  },
};

// SEND MESSAGE
export const sendMessage = createAsyncThunk(
  "customerSupport/sendMessage",
  async (message, { rejectWithValue }) => {
    console.log(message);

    try {
      const url = `${api_url}/customerSupport`;

      const { data } = await axios.post(url, message, {
        withCredentials: true,
      });
      console.log(data.answer);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const customerSupportSlice = createSlice({
  name: "customerSupport",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.messageSent.status = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messageSent.status = "succeeded";
        state.messageSent.result = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.messageSent.status = "failed";
        state.messageSent.error = action.payload;
      });
  },
});

export const { addMessage } = customerSupportSlice.actions;
export default customerSupportSlice.reducer;
