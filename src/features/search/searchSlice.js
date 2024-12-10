import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrlSwitch } from "../../utils/apiUrlSwitch";
import axios from "axios";

const api_url = apiUrlSwitch();

const initialState = {
  searchList: [],
  searchResults: [],
  searchListStatus: "idle",
  searchResultsStatus: "idle",
  searchListError: null,
  searhResultsError: null,
};

// FETCH SEARCH LIST
export const fetchSearchList = createAsyncThunk(
  "search/fetchSearchList",
  async (inputValue, { rejectWithValue }) => {
    try {
      const url = `${api_url}/products/searchList?inputValue=${inputValue}`;
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// FETCH SEARCH RESULTS
export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (inputValue, { rejectWithValue }) => {
    try {
      const url = `${api_url}/products/searchResults?inputValue=${inputValue}`;
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchResults: (state, action) => {
      state.searchList = [];
    },
  },
  extraReducers: (builder) => {
    // SEARCH LIST
    builder
      .addCase(fetchSearchList.pending, (state, action) => {
        state.searchListStatus = "loading";
      })
      .addCase(fetchSearchList.fulfilled, (state, action) => {
        state.searchListStatus = "succeeded";
        state.searchList = action.payload;
      })
      .addCase(fetchSearchList.rejected, (state, action) => {
        state.searchListError = "failed";
      });

    // SEARCH RESULTS
    builder
      .addCase(fetchSearchResults.pending, (state, action) => {
        state.searchResultsStatus = "loading";
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.searchResultsStatus = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.searhResultsError = "failed";
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
