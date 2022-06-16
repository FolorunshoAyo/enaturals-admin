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
        },
        logoutSuccess: (state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = "";
        }
    }
});



export const { loginStart, loginSuccess, loginFailure, logoutSuccess } = adminUserSlice.actions;
export default adminUserSlice.reducer;