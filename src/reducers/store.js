// store.js
import {  persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // sử dụng localStorage
import { allReducers } from "./index"; // file bạn đã khai báo combineReducers

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login", "user"], // chỉ lưu login và user
};

export const persistedReducer = persistReducer(persistConfig, allReducers);

