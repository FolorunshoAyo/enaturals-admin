import { publicRequest, userRequest } from "../requestMethod";
import { loginFailure, loginStart, loginSuccess, logoutStart } from "./adminUserRedux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess
} from "./productRedux";

import {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure
} from "./userRedux"

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const res = await publicRequest.post("/auth/login", user);
    // localStorage.setItem("accesstoken", res.data.accessToken);
    toast.success("logged in successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(
      () => {
        dispatch(loginSuccess(res.data));
      }
    , 2000);
  } catch (error) {
    toast.error(error.response.data, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(loginFailure({ error: error.response.data }));
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutStart());
  toast.error("Session has timed out, please login in again", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());

  try {
    const res = await publicRequest.get("/products/");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure({ error: error.response.data }));
  }
};

export const deleteProducts = async (id, dispatch) => {
  dispatch(deleteProductStart());

  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure({ error: error.response.data }));
  }
};

export const updateProducts = async (id, product, dispatch) => {
    dispatch(updateProductStart());
  
    try {
      const res = await userRequest.put(`/products/${id}`, product);
      dispatch(updateProductSuccess({id, product: res.data}));
    } catch (error) {
      dispatch(updateProductFailure({ error: error.response.data }));
    }
};


export const addProducts = async (product, dispatch) => {
    dispatch(addProductStart());
  
    try {
      const res = await userRequest.post(`/products/`, product);
      dispatch(addProductSuccess(res.data));
      alert("product created successfully");
    } catch (error) {
      alert(error.response.data);
      dispatch(addProductFailure({ error: error.response.data }));
    }
};

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());

  try {
    const res = await userRequest.get("/users/");
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailure({ error: error.response.data }));
  }
};

export const deleteUsers = async (id, dispatch) => {
  dispatch(deleteUserStart());

  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserFailure({ error: error.response.data }));
  }
};

export const updateUsers = async (id, user, dispatch) => {
    dispatch(updateUserStart());
  
    try {
      const res = await userRequest.put(`/users/${id}`, user);
      dispatch(updateUserSuccess({id, user: res.data}));
    } catch (error) {
      dispatch(updateUserFailure({ error: error.response.data }));
    }
};


export const addUsers = async (user, dispatch) => {
    dispatch(addUserStart());
  
    try {
      const res = await userRequest.post(`/users/`, user);
      dispatch(addUserSuccess(res.data));
      alert("user created successfully");
    } catch (error) {
      alert(error.response.data);
      dispatch(addUserFailure({ error: error.response.data }));
    }
  };