import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL
});

userRequest.interceptors.request.use(config => {
    const token = localStorage.getItem('accesstoken');
    config.headers.token =  token ? `Bearer ${token}` : '';
    return config;
});