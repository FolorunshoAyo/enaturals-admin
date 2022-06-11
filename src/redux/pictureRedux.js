import { createSlice } from "@reduxjs/toolkit";

const pictureSlice = createSlice({
  name: "picture",
  initialState: {
    pictures: [],
    isFetching: false,
    error: "",
  },
  reducers: {
    //GET
    getPictureStart: (state) => {
      state.isFetching = true;
    },
    getPictureSuccess: (state, action) => {
      state.isFetching = false;
      state.pictures = action.payload;
      state.error = "";
    },
    getPictureFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //DELETE
    deletePictureStart: (state) => {
      state.isFetching = true;
    },
    deletePictureSuccess: (state, action) => {
      state.isFetching = false;
      state.pictures.splice(
        state.pictures.findIndex((item) => item._id === action.payload),
        1
      );
      state.error = "";
    },
    deletePictureFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //UPDATE
    updatePictureStart: (state) => {
      state.isFetching = true;
    },
    updatePictureSuccess: (state, action) => {
      state.isFetching = false;
      state.pictures[state.pictures.findIndex((item) => item._id === action.payload.id)] = action.payload.picture;
      state.error = "";
    },
    updatePictureFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //ADD
    addPictureStart: (state) => {
      state.isFetching = true;
    },
    addPictureSuccess: (state, action) => {
      state.isFetching = false;
      state.pictures.push(action.payload);
      state.error = "";
    },
    addPictureFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  }
});

export const {
  getPictureStart,
  getPictureSuccess,
  getPictureFailure,
  deletePictureStart,
  deletePictureSuccess,
  deletePictureFailure,
  updatePictureStart,
  updatePictureSuccess,
  updatePictureFailure,
  addPictureStart,
  addPictureSuccess,
  addPictureFailure,
} = pictureSlice.actions;

export default pictureSlice.reducer;
