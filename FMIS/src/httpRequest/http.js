import axios from "axios";
import Vue from "vue";
import qs from "qs";
import router from "../router/index";


axios.defaults.timeout = 20000;
axios.defaults.baseURL = "http://47.106.130.46:8018/";
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'; //设置post请求是的header信息


// http request 拦截器
var that = this;
axios.interceptors.request.use(
    config => {
        // config.data = qs.stringify(config.data);
        // if (Vue.prototype.$getStr("data")) {
        //     config.headers = {
        //         "Content-Type": "application/json",
        //         "data": Vue.prototype.$getStr("token")
        //     };
        // }

        // if (Vue.prototype.$getStr("data")) {
        //     //token字段是要和后端协商好的
        //     config.headers.common["token"] = Vue.prototype.$getStr("data");
        //     // debugger
        // }
        if (Vue.prototype.$getStr("data")) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = 'Bearer ' + Vue.prototype.$getStr("data"); //$cookies.get("access_token");
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
);

//http response 拦截器

axios.interceptors.response.use(
    response => {
        if (response.data.errCode == 1) {
            router.push({
                path: "/login",
                querry: { redirect: router.currentRoute.fullPath }
            });
        } else if (response.data.code == 10001) {
            router.replace("/login");
        }
        return response;
    },
    error => {
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
            this.$message({ message: '连接超时...', type: warning })
        }
        return Promise.reject(error);
    }
);

/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params: params, headers: {} })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装post请求
 * @param url
 * @param params
 * @returns {Promise}
 */

export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        // if (this.$getStr("token")) {
        //     params.token = this.$getStr("token");
        // }
        axios.post(url, JSON.stringify(params)).then(
            response => {
                resolve(response.data);
            },
            err => {
                reject(err);
            }
        );
    });
}