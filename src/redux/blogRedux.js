import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    isFetching: false,
    error: "",
  },
  reducers: {
    //GET
    getBlogStart: (state) => {
      state.isFetching = true;
    },
    getBlogSuccess: (state, action) => {
      state.isFetching = false;
      state.blogs = action.payload;
      state.error = "";
    },
    getBlogFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //DELETE
    deleteBlogStart: (state) => {
      state.isFetching = true;
    },
    deleteBlogSuccess: (state, action) => {
      state.isFetching = false;
      state.blogs.splice(
        state.blogs.findIndex((item) => item._id === action.payload),
        1
      );
      state.error = "";
    },
    deleteBlogFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //UPDATE
    updateBlogStart: (state) => {
      state.isFetching = true;
    },
    updateBlogSuccess: (state, action) => {
      state.isFetching = false;
      state.blogs[state.blogs.findIndex((item) => item._id === action.payload.id)] = action.payload.blog;
      state.error = "";
    },
    updateBlogFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //ADD
    addBlogStart: (state) => {
      state.isFetching = true;
    },
    addBlogSuccess: (state, action) => {
      state.isFetching = false;
      state.blogs.push(action.payload);
      state.error = "";
    },
    addBlogFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  }
});

export const {
  getBlogStart,
  getBlogSuccess,
  getBlogFailure,
  deleteBlogStart,
  deleteBlogSuccess,
  deleteBlogFailure,
  updateBlogStart,
  updateBlogSuccess,
  updateBlogFailure,
  addBlogStart,
  addBlogSuccess,
  addBlogFailure,
} = blogSlice.actions;

export default blogSlice.reducer;
