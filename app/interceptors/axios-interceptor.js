import React from "react";
const axios = require('axios');
export const axiosApiInstance = axios.create();
import routes from '../constants/routes.json';

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async config => {
        config.headers = {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('su-token'))}`,
        };
        config.url = routes.API_ENDPOINT + config.url;
        return config;
    },
    error => {
        Promise.reject(error)
    });

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    if (error.response.status === 401) {
        localStorage.removeItem('su-token');
        setTimeout(() => {
            window.location.href = window.location.origin + window.location.pathname + '?#/login'
        });
    }
    return Promise.reject(error);
});
