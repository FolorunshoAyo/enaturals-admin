import { configureStore, combineReducers } from "@reduxjs/toolkit";
import adminUserReducer from "./adminUserRedux";
import productReducer from "./productRedux";
import userReducer from "./userRedux";
import slideReducer from "./slideRedux";
import testimonialReducer from "./testimonialRedux";
import pictureReducer from "./pictureRedux";
import videoReducer from "./videoRedux";
import blogReducer from "./blogRedux";
import commentReducer from "./commentRedux";
import replyReducer from "./replyRedux";
import userOrderReducer from "./userOrderRedux";
import allOrderReducer from "./allOrdersRedux";

import storage from "redux-persist/lib/storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers(
  {
    adminUser: adminUserReducer, 
    products: productReducer,
    users: userReducer,
    slides: slideReducer,
    testimonials: testimonialReducer,
    videos: videoReducer,
    pictures: pictureReducer,
    blogs: blogReducer,
    comments: commentReducer,
    replies: replyReducer,
    allOrders: allOrderReducer,
    userOrders: userOrderReducer
  }
);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);
