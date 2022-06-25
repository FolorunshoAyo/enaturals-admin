import { createSlice } from "@reduxjs/toolkit";

const allOrderSlice = createSlice({
  name: "allOrder",
  initialState: {
    allOrders: null,
    isFetching: false,
    error: "",
  },
  reducers: {
    //GET
    getAllOrderStart: (state) => {
      state.isFetching = true;
    },
    getAllOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.allOrders = action.payload;
      state.error = "";
    },
    getAllOrderFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
    //DELETE
    deleteAllOrderStart: (state) => {
        state.isFetching = true;
    },
    deleteAllOrderSuccess: (state, action) => {
        state.isFetching = false;
        state.users.splice(
          state.allOrders.findIndex((item) => item._id === action.payload),
          1
        );
        state.error = "";
    },
    deleteAllOrderFailure: (state, action) => {
        state.isFetching = false;
        state.error = action.payload.error;
    },
  }
});

export const {
  getAllOrderStart,
  getAllOrderSuccess,
  getAllOrderFailure,
  deleteAllOrderStart,
  deleteAllOrderSuccess,
  deleteAllOrderFailure
} = allOrderSlice.actions;
export default allOrderSlice.reducer;
