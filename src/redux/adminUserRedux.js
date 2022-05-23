import { createSlice } from "@reduxjs/toolkit";

const adminUserSlice = createSlice({
    name: "adminUser",
    initialState:{
        currentUser: null,
        isFetching: false,
        error: ""
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload.error;
        }
    }
});



export const { loginStart, loginSuccess, loginFailure } = adminUserSlice.actions;
export default adminUserSlice.reducer;