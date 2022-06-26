// 导入axios
import axios from "axios";
// 导入进度条
import nprogress from "nprogress";
// start: 进度条开始  done: 进度条结束
// 引入进度条的样式
import "nprogress/nprogress.css";

// 利用axios对象的方法create,去创建一个axios实例
const requests = axios.create({
  // 配置对象
  // 基础路径，发送请求的时候，路径当中会出现http://localhost:3000
  baseURL: "http://localhost:3000",
  // 代表请求超时时间,时间设置5s
  timeout: 5000,
});

// 请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发送出去之前做一些事情
requests.interceptors.request.use((config) => {
  // config：配置对象，对象里面有一个属性很重要，header请求头
  // 咱们把它的请求头原封不动返回即可

  // 进度条开始动
  nprogress.start();
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 成功的回调函数，服务器响应数据回来以后，响应拦截器可以监测到，可以做一些事情

    // 进度条结束
    nprogress.done();
    return res.data;
  },
  (error) => {
    // 服务器响应失败的回调函数
    // 可以打印一些错误信息、终止咱们这个Promise链
    // Promise.reject()终结这个Promise链条
    return Promise.reject(new Error("faile"));
  }
);

// 对外暴露
export default requests;
