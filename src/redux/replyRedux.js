import { createSlice } from "@reduxjs/toolkit";

const replySlice = createSlice({
  name: "reply",
  initialState: {
    replies: [],
    isFetching: false,
    error: "",
  },
  reducers: {
    //GET
    getReplyStart: (state) => {
      state.isFetching = true;
    },
    getReplySuccess: (state, action) => {
      state.isFetching = false;
      state.replies[action.payload.commentNo] = action.payload.reply;
      state.error = "";
    },
    getReplyFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //DELETE
    deleteReplyStart: (state) => {
      state.isFetching = true;
    },
    deleteReplySuccess: (state, action) => {
      state.isFetching = false;
      state.replies[action.payload.commentNo].splice(
        state.replies.findIndex((item) => item._id === action.payload.id),
        1
      );
      state.error = "";
    },
    deleteReplyFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //UPDATE
    updateReplyStart: (state) => {
      state.isFetching = true;
    },
    updateReplySuccess: (state, action) => {
      state.isFetching = false;
      state.replies[action.payload.commentNo][state.replies[action.payload.commentNo].findIndex((item) => item._id === action.payload.id)] = action.payload.reply;
      state.error = "";
    },
    updateReplyFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //ADD
    addReplyStart: (state) => {
      state.isFetching = true;
    },
    addReplySuccess: (state, action) => {
      state.isFetching = false;
      state.replies.push(action.payload);
      state.error = "";
    },
    addReplyFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  }
});

export const {
  getReplyStart,
  getReplySuccess,
  getReplyFailure,
  deleteReplyStart,
  deleteReplySuccess,
  deleteReplyFailure,
  updateReplyStart,
  updateReplySuccess,
  updateReplyFailure,
  addReplyStart,
  addReplySuccess,
  addReplyFailure,
} = replySlice.actions;

export default replySlice.reducer;
