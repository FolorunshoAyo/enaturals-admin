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
} from "./userRedux";

import {
  getSlideStart,
  getSlideSuccess,
  getSlideFailure,
  deleteSlideStart,
  deleteSlideSuccess,
  deleteSlideFailure,
  updateSlideStart,
  updateSlideSuccess,
  updateSlideFailure,
  addSlideStart,
  addSlideSuccess,
  addSlideFailure
} from "./slideRedux";

import {
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
} from "./testimonialRedux";

const toastSettings = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}
export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const res = await publicRequest.post("/auth/login", user);
    // localStorage.setItem("accesstoken", res.data.accessToken);
    toast.success("logged in successfully", toastSettings);
    setTimeout(
      () => {
        dispatch(loginSuccess(res.data));
      }
    , 2000);
  } catch (error) {
    toast.error(error.response.data, toastSettings);
    dispatch(loginFailure({ error: error.response.data }));
  }
};

export const tokenInvalidLogout = (dispatch) => {
  dispatch(logoutStart());
  toast.error("session has timed out", toastSettings);
};

export const logout = (dispatch) => {
  dispatch(logoutStart());
  toast.error("logged out successfully", toastSettings);
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
      toast.success("product created successfully", toastSettings);
    } catch (error) {
      toast.error(error.response.data, toastSettings);
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
    await userRequest.delete(`/products/${id}`);
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
      toast.success("User created successfully", toastSettings);
    } catch (error) {
      toast.error("Unable to add user (501)", toastSettings);
      dispatch(addUserFailure({ error: error.response.data }));
    }
};

export const getSlides = async (dispatch) => {
  dispatch(getSlideStart());
  
  try {
    const res = await userRequest.get("/slides/");
    dispatch(getSlideSuccess(res.data));
  } catch (error) {
    toast.error("Unable to get slides (501)", toastSettings);
    dispatch(getSlideFailure({ error: error.response.data }));
  }
};
  
export const deleteSlides = async (id, dispatch) => {
  dispatch(deleteSlideStart());
  
  try {
    await userRequest.delete(`/slides/${id}`);
    dispatch(deleteSlideSuccess(id));
    toast.success("Slide deleted successfully.", toastSettings);
  } catch (error) {
    toast.error("Unable to delete slides (501)", toastSettings);
    dispatch(deleteSlideFailure({ error: error.response.data }));
  }
};
  
export const updateSlides = async (id, user, dispatch) => {
    dispatch(updateSlideStart());
    
    try {
      const res = await userRequest.put(`/slides/${id}`, user);
      dispatch(updateSlideSuccess({id, slide: res.data}));
    } catch (error) {
      toast.error("Unable to update slides (501)", toastSettings);
      dispatch(updateSlideFailure({ error: error.response.data }));
    }
};
  
  
export const addSlides = async (slideItem, dispatch) => {
    dispatch(addSlideStart());

    try {
      const res = await userRequest.post(`/slides/`, slideItem);
      dispatch(addSlideSuccess(res.data));
      toast.success("Slide created successfully", toastSettings);
    } catch (error) {
      toast.error("Unable to add slide (501)", toastSettings);
      dispatch(addSlideFailure({ error: error.response.data }));
    }
};

export const getTestimonials = async (dispatch) => {
  dispatch(getTestimonialStart());
  
  try {
    const res = await userRequest.get("/testimonials/");
    dispatch(getTestimonialSuccess(res.data));
  } catch (error) {
    toast.error("Unable to get testimonial (501)", toastSettings);
    dispatch(getTestimonialFailure({ error: error.response.data }));
  }
};
  
export const deleteTestimonials = async (id, dispatch) => {
  dispatch(deleteTestimonialStart());
  
  try {
    await userRequest.delete(`/testimonials/${id}`);
    dispatch(deleteTestimonialSuccess(id));
    toast.success("Testimonial deleted successfully.", toastSettings);
  } catch (error) {
    toast.error("Unable to delete testimonial (501)", toastSettings);
    dispatch(deleteTestimonialFailure({ error: error.response.data }));
  }
};
  
export const updateTestimonials = async (id, user, dispatch) => {
    dispatch(updateTestimonialStart());
    
    try {
      const res = await userRequest.put(`/testimonials/${id}`, user);
      dispatch(updateTestimonialSuccess({id, slide: res.data}));
    } catch (error) {
      toast.error("Unable to testimonial slides (501)", toastSettings);
      dispatch(updateTestimonialFailure({ error: error.response.data }));
    }
};
  
  
export const addTestimonial = async (testimonialItem, dispatch) => {
    dispatch(addTestimonialStart());

    try {
      const res = await userRequest.post(`/testimonials/`, testimonialItem);
      dispatch(addTestimonialSuccess(res.data));
      toast.success("Testimonial created successfully", toastSettings);
    } catch (error) {
      toast.error("Unable to add testimonial (501)", toastSettings);
      dispatch(addTestimonialFailure({ error: error.response.data }));
    }
};