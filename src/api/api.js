import axios from 'axios'
import fetch from '@/config/fetch'
import {
    baseUrl
}
from '@/config/env.js'

axios.defaults.baseURL = baseUrl;

// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(function (config) {
    // 处理请求之前的配置
    let token = window.localStorage.getItem("token");
    Object.assign(config.headers, {
        'Authorization': token
    });
    return config;
}, function (error) {
    // 请求失败的处理
    return Promise.reject(error);
});

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // 处理响应失败
    return Promise.reject(error);
});

// 登录
export const requestLogin = params => {
    console.log(params)
    return axios.post('/login', params).then(res => res)
}