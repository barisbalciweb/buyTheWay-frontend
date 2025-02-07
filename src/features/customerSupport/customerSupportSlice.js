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

// HELPER FUNCTION
const addMessage = (state, message) => {
  // UPDATE STATE FOR IMMEDIATE RENDERING
  state.messagesFromSS.push(message);

  const messagesBefore = sessionStorage.getItem("messages");
  const parsedMessages = messagesBefore ? JSON.parse(messagesBefore) : [];

  sessionStorage.setItem(
    "messages",
    JSON.stringify(
      [
        ...parsedMessages,
        !messagesBefore ? state.messagesFromSS[0] : null,
        message,
      ].filter(Boolean)
    )
  );
};

// SEND MESSAGE
export const sendMessage = createAsyncThunk(
  "customerSupport/sendMessage",
  async (message, { rejectWithValue }) => {
    try {
      const url = `${api_url}/customerSupport`;
      const { data } = await axios.post(url, message, {
        withCredentials: true,
      });
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
      addMessage(state, action.payload);
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
        // ADD ANSWER TO SESSION STORAGE FOR PERSISTENCE
        addMessage(state, action.payload);
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
