import axios from 'axios'
import Cookies from 'js-cookie';
import fetch from '@/config/fetch'
import {
    baseUrl
}
from '@/config/env.js'

axios.defaults.baseURL = baseUrl;

// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(function (config) {
    // 处理请求之前的配置
    let token = Cookies.get("token");
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
    if (error) {
        if (error.response.status) {
            Cookies.remove('token');
            Cookies.remove('user');
            Cookies.remove('password');
        }
    }

    return Promise.reject(error);
});

// 登录
export const requestLogin = params => {
    console.log(params)
    return axios.post('/login', params).then(res => res)
}
//博客类目分页查询
export const getCategoryPage = params => {
    return getPage(params, "/category/page");
}
//博客添加类目
export const addCategory = param => {
    return axios.post("/category", param);
}
//博客类目主键查询
export const getCategoryById = param => {
    return axios.get("/category/id/" + param).then(res => res.data);
}
//博客类目更新
export const updateCategory = param => {
    return axios.put("/category", param).then(res => res.data);
}
//博客类删除
export const deleteCategory = param => {
    return axios.delete("/category/id/" + param).then(res => res.data);
}


/**
 * 
 * @param { 分页条件} data
 */
export const getPage = (data, url) => {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
    }
    //  url = url + '&t=' + Date.now();
    return axios.get(url).then(res => res.data);
}