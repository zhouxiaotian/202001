import axios from 'axios';
import { Message } from 'element-ui';

let http = axios.create({
  // baseURL: 'http://localhost:8000', //本地开发的时候 不用配置这个，若配置了 那么我们的proxy代理就不起作用了

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    // console.log(data)
    let str = '';
    data = data || {};
    Object.keys(data).forEach(item=>{
      str += `${item}=${data[item]}&`
    })
    str = str.replace(/&$/,'')
    return str;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  // transformResponse: [function (data) {
  //   // 对 data 进行任意转换处理
  //   console.log(data)
  //   return data;
  // }],

})
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器 
// 在拦截器处 统一做一个 失败的提示
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.data.code !=0){
    // 只要后端返回的 code不是0 证明后端处理失败
    // 失败的话 我们就把后端的失败信息提示给用户
    // alert(response.data.codeText)
    // Message.error(response.data.codeText)
    Message.error({
      message:response.data.codeText,
      duration:1000
    })
  }
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  // 后端给的响应时 4xx或5xx 这时我们给用户提示 系统繁忙即可
  // alert('系统繁忙 请稍后重试')
  Message.error('系统繁忙 请稍后重试')
  return Promise.reject(error);
});
export default http;