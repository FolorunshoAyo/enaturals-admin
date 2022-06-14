import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    isFetching: false,
    error: "",
  },
  reducers: {
    //GET
    getCommentStart: (state) => {
      state.isFetching = true;
    },
    getCommentSuccess: (state, action) => {
      state.isFetching = false;
      state.comments = action.payload;
      state.error = "";
    },
    getCommentFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //DELETE
    deleteCommentStart: (state) => {
      state.isFetching = true;
    },
    deleteCommentSuccess: (state, action) => {
      state.isFetching = false;
      state.comments.splice(
        state.comments.findIndex((item) => item._id === action.payload),
        1
      );
      state.error = "";
    },
    deleteCommentFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //UPDATE
    updateCommentStart: (state) => {
      state.isFetching = true;
    },
    updateCommentSuccess: (state, action) => {
      state.isFetching = false;
      state.comments[state.comments.findIndex((item) => item._id === action.payload.id)] = action.payload.comment;
      state.error = "";
    },
    updateCommentFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //ADD
    addCommentStart: (state) => {
      state.isFetching = true;
    },
    addCommentSuccess: (state, action) => {
      state.isFetching = false;
      state.comments.push(action.payload);
      state.error = "";
    },
    addCommentFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  }
});

export const {
  getCommentStart,
  getCommentSuccess,
  getCommentFailure,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailure,
  updateCommentStart,
  updateCommentSuccess,
  updateCommentFailure,
  addCommentStart,
  addCommentSuccess,
  addCommentFailure,
} = commentSlice.actions;

export default commentSlice.reducer;
