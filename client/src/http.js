import axios from "axios";
import { Loading, Message } from "element-ui";
import router from "./router";

let loading;
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "拼命加载中...",
    background: "rgba(0, 0, 0, 0.7)"
  });
}

function endLoading() {
  // 以服务的方式调用的 Loading 需要异步关闭
  loading.close();
}

// 请求拦截
axios.interceptors.request.use(
  config => {
    // 开始加载动画
    startLoading();
    if (localStorage.eleToken) {
      // 设置统一的header
      config.headers.Authorization = localStorage.eleToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  response => {
    // 结束加载动画
    endLoading();
    return response;
  },
  error => {
    endLoading();

    // 获取错误状态码
    const { status } = error.response;
    if (status == 401) {
      Message.error("token已失效, 请重新登录");
      // 清除token
      localStorage.removeItem("eleToken");
      // 跳转到登录页面
      router.push("/login");
    }
    Message.error(error.response.data);
    return Promise.reject(error);
  }
);

export default axios;
