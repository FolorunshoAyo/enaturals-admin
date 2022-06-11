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

import {
  getVideoStart,
  getVideoSuccess,
  getVideoFailure,
  deleteVideoStart,
  deleteVideoSuccess,
  deleteVideoFailure,
  updateVideoStart,
  updateVideoSuccess,
  updateVideoFailure,
  addVideoStart,
  addVideoSuccess,
  addVideoFailure,
} from "./videoRedux";

import {
  getPictureStart,
  getPictureSuccess,
  getPictureFailure,
  deletePictureStart,
  deletePictureSuccess,
  deletePictureFailure,
  updatePictureStart,
  updatePictureSuccess,
  updatePictureFailure,
  addPictureStart,
  addPictureSuccess,
  addPictureFailure,
} from "./pictureRedux";

import {
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
} from "./blogRedux";

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
  
export const deleteSlide = async (id, dispatch) => {
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
  
export const updateSlide = async (id, user, dispatch) => {
    dispatch(updateSlideStart());
    
    try {
      const res = await userRequest.put(`/slides/${id}`, user);
      dispatch(updateSlideSuccess({id, slide: res.data}));
    } catch (error) {
      toast.error("Unable to update slides (501)", toastSettings);
      dispatch(updateSlideFailure({ error: error.response.data }));
    }
};
  
  
export const addSlide = async (slideItem, dispatch) => {
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
  
export const deleteTestimonial = async (id, dispatch) => {
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
  
export const updateTestimonial = async (id, user, dispatch) => {
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

export const getVideos = async (dispatch) => {
  dispatch(getVideoStart());
  
  try {
    const res = await userRequest.get("/videos/");
    dispatch(getVideoSuccess(res.data));
  } catch (error) {
    toast.error("Unable to get videos (501)", toastSettings);
    dispatch(getVideoFailure({ error: error.response.data }));
  }
};
  
export const deleteVideo = async (id, dispatch) => {
  dispatch(deleteVideoStart());
  
  try {
    await userRequest.delete(`/videos/${id}`);
    dispatch(deleteVideoSuccess(id));
    toast.success("Testimonial deleted successfully.", toastSettings);
  } catch (error) {
    toast.error("Unable to delete video (501)", toastSettings);
    dispatch(deleteVideoFailure({ error: error.response.data }));
  }
};
  
export const updateVideo = async (id, user, dispatch) => {
    dispatch(updateVideoStart());
    
    try {
      const res = await userRequest.put(`/videos/${id}`, user);
      dispatch(updateVideoSuccess({id, slide: res.data}));
    } catch (error) {
      toast.error("Unable to testimonial slides (501)", toastSettings);
      dispatch(updateVideoFailure({ error: error.response.data }));
    }
};
  
  
export const addVideo = async (testimonialItem, dispatch) => {
    dispatch(addVideoStart());

    try {
      const res = await userRequest.post(`/videos/`, testimonialItem);
      dispatch(addVideoSuccess(res.data));
      toast.success("Video created successfully", toastSettings);
    } catch (error) {
      toast.error("Unable to add video (501)", toastSettings);
      dispatch(addVideoFailure({ error: error.response.data }));
    }
};

export const getPictures = async (dispatch) => {
  dispatch(getPictureStart());
  
  try {
    const res = await userRequest.get("/pictures/");
    dispatch(getPictureSuccess(res.data));
  } catch (error) {
    toast.error("Unable to get pictures (501)", toastSettings);
    dispatch(getPictureFailure({ error: error.response.data }));
  }
};
  
export const deletePicture = async (id, dispatch) => {
  dispatch(deletePictureStart());
  
  try {
    await userRequest.delete(`/pictures/${id}`);
    dispatch(deletePictureSuccess(id));
    toast.success("Testimonial deleted successfully.", toastSettings);
  } catch (error) {
    toast.error("Unable to delete picture (501)", toastSettings);
    dispatch(deletePictureFailure({ error: error.response.data }));
  }
};
  
export const updatePicture = async (id, user, dispatch) => {
    dispatch(updatePictureStart());
    
    try {
      const res = await userRequest.put(`/pictures/${id}`, user);
      dispatch(updatePictureSuccess({id, slide: res.data}));
    } catch (error) {
      toast.error("Unable to update picture (501)", toastSettings);
      dispatch(updatePictureFailure({ error: error.response.data }));
    }
};
  
  
export const addPicture = async (testimonialItem, dispatch) => {
    dispatch(addPictureStart());

    try {
      const res = await userRequest.post(`/pictures/`, testimonialItem);
      dispatch(addPictureSuccess(res.data));
      toast.success("Picture created successfully", toastSettings);
    } catch (error) {
      toast.error("Unable to add picture (501)", toastSettings);
      dispatch(addPictureFailure({ error: error.response.data }));
    }
};

export const getBlogs = async (dispatch) => {
  dispatch(getBlogStart());
  
  try {
    const res = await userRequest.get("/blogs/");
    dispatch(getBlogSuccess(res.data));
  } catch (error) {
    toast.error("Unable to get blogs (501)", toastSettings);
    dispatch(getBlogFailure({ error: error.response.data }));
  }
};
  
export const deleteBlog = async (id, dispatch) => {
  dispatch(deleteBlogStart());
  
  try {
    await userRequest.delete(`/blogs/${id}`);
    dispatch(deleteBlogSuccess(id));
    toast.success("Blog deleted successfully.", toastSettings);
  } catch (error) {
    toast.error("Unable to delete blog (501)", toastSettings);
    dispatch(deleteBlogFailure({ error: error.response.data }));
  }
};
  
export const updateBlog = async (id, blogPost, dispatch) => {
    dispatch(updateBlogStart());
    
    try {
      const res = await userRequest.put(`/blogs/${id}`, blogPost);
      dispatch(updateBlogSuccess({id, blog: res.data}));
      toast.success("Blog updated successfully.", toastSettings);
    } catch (error) {
      toast.error("Unable to update blog (501)", toastSettings);
      dispatch(updateBlogFailure({ error: error.response.data }));
    }
};
  
  
export const addBlog = async (blogPost, dispatch) => {
    dispatch(addBlogStart());

    try {
      const res = await userRequest.post(`/blogs/`, blogPost);
      dispatch(addBlogSuccess(res.data));
      toast.success("Blog created successfully", toastSettings);
    } catch (error) {
      toast.error("Unable to add blog (501)", toastSettings);
      dispatch(addBlogFailure({ error: error.response.data }));
    }
};