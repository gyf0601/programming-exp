import axios from "axios";
import cookieManager from "./cookie.ts";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 30000,
    headers: { "X-Custom-Header": "foobar" }
});

function getAccessToken() {
    return cookieManager.getCookie("access-token");
}

instance.interceptors.request.use(
    function (config) {
        // TODO: add access-token
        const accessToken = getAccessToken();

        if (accessToken) {
            config.headers["Access-Token"] = accessToken;
        }
        // else {
        //     // 如果访问令牌不存在，你可以根据需求执行其他操作，比如跳转到登录页或显示未登录提示
        //     console.log("用户未登录");
        //
        //     return Promise.reject("用户未登录");
        // }

        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么

        return response;
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default instance;
