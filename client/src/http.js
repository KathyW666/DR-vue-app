import axios from "axios";
import { Loading, Message } from "element-ui";

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
    Message.error(error.response.data);
    return Promise.reject(error);
  }
);

export default axios;
