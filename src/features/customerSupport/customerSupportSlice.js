import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrlSwitch } from "../../utils/apiUrlSwitch";

const api_url = apiUrlSwitch();

const initialState = {
  messagesFromSS: [
    { content: "Hallo, wie kann ich Ihnen helfen?", role: "AI" },
  ],
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
    try {
      console.log("test");

      const url = `${api_url}/customerSupport`;
      const { data } = await axios.post(url, message, {
        withCredentials: true,
      });
      console.log(data);

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
    addMessageToSS: (state, action) => {
      // ADD MESSAGE TO STATE
      state.messagesFromSS.push(action.payload);

      // UPDATE SESSION STORAGE
      const messagesBefore = sessionStorage.getItem("messages");
      const parsedMessages = messagesBefore ? JSON.parse(messagesBefore) : [];

      sessionStorage.setItem(
        "messages",
        JSON.stringify([...parsedMessages, action.payload])
      );
    },

    // GET MESSAGES FROM LOCAL STORAGE
    getMessagesFromSS: (state) => {
      const messages = sessionStorage.getItem("messages");

      if (messages) {
        try {
          const parsedMessages = JSON.parse(messages);
          state.messagesFromSS = parsedMessages;
        } catch (error) {
          console.error("Error parsing messages from sessionStorage:", error);
          state.messagesFromSS = [];
        }
      }
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
        state.messagesFromSS.push({
          content: action.payload.answer,
          role: "AI",
        });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.messageSent.status = "failed";
        state.messageSent.error = action.payload;
      });
  },
});

export const { addMessageToSS, getMessagesFromSS } =
  customerSupportSlice.actions;
export default customerSupportSlice.reducer;
