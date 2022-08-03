// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTokenTime } from './auth'
import router from '@/router'
function isTimedOut() {
  const previousTime = getTokenTime
  const currentTime = Date.now()
  const timeout = 2 * 60 * 60 * 1000
  return currentTime - previousTime > timeout
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 3000
}) // 创建一个axios的实例
service.interceptors.request.use(async (config) => {
  // 当期啊请求的配置
  if (store.state.user.token) {
    if (isTimedOut()) {
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
  }
  return config
}) // 请求拦截器
service.interceptors.response.use(
  (res) => {
    // console.log(res)
    // 请求成功的函数
    // if (res.config.url === 'api/sys/login') {
    //   return res
    // }
    const { success, data, message } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  async function (error) {
    // 对响应错误做点什么
    // ES11
    if (error?.response?.status === 401) {
      Message.error('登录过期')
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
) // 响应拦截器
export default service // 导出axios实例
