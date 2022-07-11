// 基于 axios 封装的请求模块
import ajax from 'axios'
import router from '@/router'
import { getToken, removeToken } from '@/utils/token'
// 新建一个新的axios实例
const axios = ajax.create({
  baseURL: 'http://geek.itheima.net' // 基地址
})
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 在发送请求之前做些什么, 如果vuex里有token携带在请求头中
  if (getToken() !== null && config.headers.Authorization === undefined) {
    // 发起请求之前, 把token携带在请求头上(表明自己身份)
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么

  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response.status === 401) { // 身份过期
    // token续签方式1:  去登录页重新登录, token无用, 清掉-确保路由守卫if进不去
    removeToken()
    router.replace('/login')
  }
  return Promise.reject(error)
})
// 导出自定义函数, 参数对象解构赋值
export default ({ url, method = 'GET', params = {}, data = {} }) => {
  return axios({
    url: url,
    method: method,
    params: params,
    data: data
  })

  // 以后换库, 只需要改这里, 逻辑页面不用动, 保证代码的复用性和独立性(高内聚低耦合)
  //   return $.ajax({
  //     url: url,
  //     type: method,
  //     data: data,
  //     header: headers
  //   })
}
