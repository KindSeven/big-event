import axios from 'axios'

import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'
const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    //发送请求之前做什么
    //携带token
    const UserStore = useUserStore()
    if (UserStore.token) {
      config.headers.Authorization = UserStore.token
    }

    return config
  },
  (error) => {
    //发送请求失败做什么
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    // 2xx范围内的状态码都会触发该函数
    //对响应数据做什么

    if (response.data.code === 0) {
      return response
    }
    // console.log(response)
    ElMessage.error(response.data.message || '服务异常')
    return Promise.reject(response.data)
  },
  (error) => {
    //超出2xx范围的状态码都会触发该函数
    //对响应错误做什么
    // 处理401错误

    if (error.response?.status === 401) {
      router.push('/login')
    }
    ElMessage.error(error.response.message || '服务异常')
    return Promise.reject(error)
  }
)
export default instance
export { baseURL }
