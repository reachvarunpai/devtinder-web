import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [], // ✅ Start with empty array
  reducers: {
    addFeed: (state, action) => action.payload, // Replace feed with API response
    removeFeed: () => [], // Reset feed to empty
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
