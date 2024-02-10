import React, { useContext } from "react";
import axios from "axios";
import { LanguageContext } from "./../Context/Language";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      api_key: "1e8cfdde8d627e45358cc8ee3259c637",
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
