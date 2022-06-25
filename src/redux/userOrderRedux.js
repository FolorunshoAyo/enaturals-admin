import { createSlice } from "@reduxjs/toolkit";

const userOrderSlice = createSlice({
  name: "userOrder",
  initialState: {
    userOrders: null,
    isFetching: false,
    error: "",
  },
  reducers: {
    //GET
    getUserOrderStart: (state) => {
      state.isFetching = true;
    },
    getUserOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.userOrders = action.payload;
      state.error = "";
    },
    getUserOrderFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //DELETE
    deleteUserOrderStart: (state) => {
      state.isFetching = true;
    },
    deleteUserOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.userOrders.splice(
        state.userOrders.findIndex((item) => item._id === action.payload),
        1
      );
      state.error = "";
    },
    deleteUserOrderFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //UPDATE
    updateUserOrderStart: (state) => {
      state.isFetching = true;
    },
    updateUserOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.userOrders[state.userOrders.findIndex((item) => item._id === action.payload.id)] = action.payload.userOrder;
      state.error = "";
    },
    updateUserOrderFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  getUserOrderStart,
  getUserOrderSuccess,
  getUserOrderFailure,
  deleteUserOrderStart,
  deleteUserOrderSuccess,
  deleteUserOrderFailure,
  updateUserOrderStart,
  updateUserOrderSuccess,
  updateUserOrderFailure,
} = userOrderSlice.actions;
export default userOrderSlice.reducer;
