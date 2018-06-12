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
        if (error.response.status == 403) {
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


//博客标签分页查询
export const getTagPage = params => {
    return getPage(params, "/tag/page");
}
//博标签客添加
export const addTag = param => {
    return axios.post("/tag", param);
}
//博客标签主键查询
export const getTagById = param => {
    return axios.get("/tag/id/" + param).then(res => res.data);
}
//博客标签更新
export const updateTag = param => {
    return axios.put("/tag", param).then(res => res.data);
}
//博客标签删除
export const deleteTag = param => {
    return axios.delete("/tag/id/" + param).then(res => res.data);
}


//博文分页查询
export const getArticlePage = params => {
    return getPage(params, "/article/page");
}
//博文添加
export const addArticle = param => {
    return axios.post("/article", param);
}
//博文主键查询
export const getArticleById = param => {
    return axios.get("/article/id/" + param).then(res => res.data);
}
//博文更新
export const updateArticle = param => {
    return axios.put("/article", param).then(res => res.data);
}
//博文删除
export const deleteArticle = param => {
    return axios.delete("/article/id/" + param).then(res => res.data);
}

export const findAllCategory = () => {
    return axios.get("/index/archive/category/").then(res => res.data);
}

export const findCategoryByName = param => {
    return axios.get("/index/archive/category/" + param).then(res => res.data);
}

export const findAllTag = () => {
    return axios.get("/index/archive/tag").then(res => res.data);
}


export const findNotice = () => {
    return axios.get("/index/notice").then(res => res.data);
}
export const findAllMonth = () => {
    return axios.get("/index/archive/month").then(res => res.data);
}

export const findArticleGroupByYear = () => {
    return axios.get("/index/article/year").then(res => res.data);
}

export const findArticleGroupByCategory = param => {
    return axios.get("/index/article/category" + param).then(res => res.data);
}

export const getFrontArticlePage = params => {
    return getPage(params, "/index/article/page");
}

export const getFrontArticleById = param => {
    return axios.get("/index/article/id/" + param).then(res => res.data);
}


export const getArchiveByYearAndMonth = param => {
    return axios.get("/index/archive/" + param.year + "/" + param.month).then(res => res.data);
}
//公告分页查询
export const getNoticePage = params => {
    return getPage(params, "/notice/page");
}
//添加公告
export const addNotice = param => {
    return axios.post("/notice", param);
}
//公告主键查询
export const getNoticeById = param => {
    return axios.get("/notice/id/" + param).then(res => res.data);
}
//公告更新
export const updateNotice = param => {
    return axios.put("/notice", param).then(res => res.data);
}
//公告删除
export const deleteNotice = param => {
    return axios.delete("/notice/id/" + param).then(res => res.data);
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