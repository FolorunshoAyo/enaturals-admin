import { createSlice } from "@reduxjs/toolkit";

const slideSlice = createSlice({
  name: "slide",
  initialState: {
    slides: [],
    isFetching: false,
    error: "",
  },
  reducers: {
    //GET
    getSlideStart: (state) => {
      state.isFetching = true;
    },
    getSlideSuccess: (state, action) => {
      state.isFetching = false;
      state.slides = action.payload;
      state.error = "";
    },
    getSlideFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //DELETE
    deleteSlideStart: (state) => {
      state.isFetching = true;
    },
    deleteSlideSuccess: (state, action) => {
      state.isFetching = false;
      state.slides.splice(
        state.slides.findIndex((item) => item._id === action.payload),
        1
      );
      state.error = "";
    },
    deleteSlideFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //UPDATE
    updateSlideStart: (state) => {
      state.isFetching = true;
    },
    updateSlideSuccess: (state, action) => {
      state.isFetching = false;
      state.slides[state.slides.findIndex((item) => item._id === action.payload.id)] = action.payload.slide;
      state.error = "";
    },
    updateSlideFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //ADD
    addSlideStart: (state) => {
      state.isFetching = true;
    },
    addSlideSuccess: (state, action) => {
      state.isFetching = false;
      state.slides.push(action.payload);
      state.error = "";
    },
    addSlideFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  getSlideStart,
  getSlideSuccess,
  getSlideFailure,
  deleteSlideStart,
  deleteSlideSuccess,
  deleteSlideFailure,
  updateSlideStart,
  updateSlideSuccess,
  updateSlideFailure,
  addSlideStart,
  addSlideSuccess,
  addSlideFailure,
} = slideSlice.actions;
export default slideSlice.reducer;
