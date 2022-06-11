import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: [],
    isFetching: false,
    error: "",
  },
  reducers: {
    //GET
    getVideoStart: (state) => {
      state.isFetching = true;
    },
    getVideoSuccess: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload;
      state.error = "";
    },
    getVideoFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //DELETE
    deleteVideoStart: (state) => {
      state.isFetching = true;
    },
    deleteVideoSuccess: (state, action) => {
      state.isFetching = false;
      state.videos.splice(
        state.videos.findIndex((item) => item._id === action.payload),
        1
      );
      state.error = "";
    },
    deleteVideoFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //UPDATE
    updateVideoStart: (state) => {
      state.isFetching = true;
    },
    updateVideoSuccess: (state, action) => {
      state.isFetching = false;
      state.videos[state.videos.findIndex((item) => item._id === action.payload.id)] = action.payload.video;
      state.error = "";
    },
    updateVideoFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //ADD
    addVideoStart: (state) => {
      state.isFetching = true;
    },
    addVideoSuccess: (state, action) => {
      state.isFetching = false;
      state.videos.push(action.payload);
      state.error = "";
    },
    addVideoFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  getVideoStart,
  getVideoSuccess,
  getVideoFailure,
  deleteVideoStart,
  deleteVideoSuccess,
  deleteVideoFailure,
  updateVideoStart,
  updateVideoSuccess,
  updateVideoFailure,
  addVideoStart,
  addVideoSuccess,
  addVideoFailure,
} = videoSlice.actions;

export default videoSlice.reducer;
