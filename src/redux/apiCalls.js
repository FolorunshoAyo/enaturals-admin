import { publicRequest, userRequest } from "../requestMethod";
import { loginFailure, loginStart, loginSuccess } from "./adminUserRedux";
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

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure({ error: error.response.data }));
  }
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
      dispatch(updateProductSuccess({id, product}));
    } catch (error) {
      dispatch(updateProductFailure({ error: error.response.data }));
    }
};


export const addProducts = async (product, dispatch) => {
    dispatch(addProductStart());
  
    try {
      const res = await userRequest.post(`/products/`, product);
      dispatch(addProductSuccess(product));
    } catch (error) {
      dispatch(addProductFailure({ error: error.response.data }));
    }
  };