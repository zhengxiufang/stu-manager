import axios from 'axios';
import {getToken} from './auth';
import {serverUrl} from './config';


const instance = axios.create({
    //baseURL:'http://localhost:3009',
    baseURL:serverUrl,
    timeout:5000
})

//axios发请求时都要在请求头里传入token值，此时需要对axios做一个全局请求和响应的拦截
// 添加请求拦截器  全局请求拦截，发送请求之前拦截
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么  设置请求头
    config.headers['authorization'] = 'Bearer ' + getToken();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器 请求返回之后执行
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


/**
 * get请求
 * @param {*} url 请求地址
 * @param {*} params url参数
 */

//查询
export function get(url,params){
    return instance.get(url,{//configer为第二个参数
        params//查询条件
    })
}

/**
 * post请求
 * @param {*} url 请求地址
 * @param {*} data 数据
 */
//增加
export function post(url,data){
    return instance.post(url,data)
}

/**
 * put请求
 * @param {*} url 请求地址
 * @param {*} data 数据
 */
//修改
export function put(url,data){
    return instance.put(url,data)
}

/**
 * delete请求
 * @param {*} url 请求地址
 */
//删除
export function del(url){
    return instance.delete(url)
}