import { createSlice } from "@reduxjs/toolkit";

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: {
    testimonials: [],
    isFetching: false,
    error: "",
  },
  reducers: {
    //GET
    getTestimonialStart: (state) => {
      state.isFetching = true;
    },
    getTestimonialSuccess: (state, action) => {
      state.isFetching = false;
      state.testimonials = action.payload;
      state.error = "";
    },
    getTestimonialFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //DELETE
    deleteTestimonialStart: (state) => {
      state.isFetching = true;
    },
    deleteTestimonialSuccess: (state, action) => {
      state.isFetching = false;
      state.testimonials.splice(
        state.testimonials.findIndex((item) => item._id === action.payload),
        1
      );
      state.error = "";
    },
    deleteTestimonialFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //UPDATE
    updateTestimonialStart: (state) => {
      state.isFetching = true;
    },
    updateTestimonialSuccess: (state, action) => {
      state.isFetching = false;
      state.testimonials[state.testimonials.findIndex((item) => item._id === action.payload.id)] = action.payload.testimonial;
      state.error = "";
    },
    updateTestimonialFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //ADD
    addTestimonialStart: (state) => {
      state.isFetching = true;
    },
    addTestimonialSuccess: (state, action) => {
      state.isFetching = false;
      state.testimonials.push(action.payload);
      state.error = "";
    },
    addTestimonialFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  getTestimonialStart,
  getTestimonialSuccess,
  getTestimonialFailure,
  deleteTestimonialStart,
  deleteTestimonialSuccess,
  deleteTestimonialFailure,
  updateTestimonialStart,
  updateTestimonialSuccess,
  updateTestimonialFailure,
  addTestimonialStart,
  addTestimonialSuccess,
  addTestimonialFailure,
} = testimonialSlice.actions;

export default testimonialSlice.reducer;
