import axios from 'axios'
import {message} from 'antd';

axios.defaults.withCredentials = true

axios.interceptors.request.use(
  function (config)  {
    return config
  },
  function(error) {
    // console.log('error')
    // // 当请求异常时做一些处理
    // console.log(error)
    // return Promise.reject(error)
  },
)
// 请求完成后的拦截器
axios.interceptors.response.use(
  response => {
    console.log('response')
    // 返回响应时做一些处理
    // 这里的return response返回的是一个对象, 内容如下:
    // {
    //      data: { },        // 服务器提供的响应
    //      status: 200,      // 服务器响应的HTTP状态代码
    //      statusText: 'OK', // 服务器响应的HTTP状态消息
    //      headers: {},      // 服务器响应头
    //      config: {}        // axios 的配置
    // }
    return response
  },
  error => {
    console.log('err' + error)// for debug
    // 当响应异常时做一些处理
    // 这里我们把错误信息扶正, 后面就不需要写 catch 了
    message.error(error.response)
    return Promise.resolve(error.response)
  },
)
//
const service = axios.create({
  timeout: 10000,
  validateStatus: function () {
    console.log('validateStatus')
    // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    return true
  }
})

export default service;
