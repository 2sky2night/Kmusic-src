import axios from 'axios'
import nProgress from 'nprogress'
import { useUserStoreWithout } from '@/store/user'
import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import message from '../message'

const userStore = useUserStoreWithout()

const request = axios.create({
    baseURL: 'http://127.0.0.1:3000'
})

// 配置跨域请求携带cookie
request.defaults.withCredentials = true

// 请求拦截器
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // 若是url白名单上的请求,就不开启进度条
    if (!config.url?.includes("login")) {
        // 开启进度条
        nProgress.start()
    }
    // 若当前仓库有cookie值就带上cookie
    if (userStore.cookie && userStore.isLogin) {
        document.cookie = userStore.cookie
    } else {
        document.cookie = ''
    }

    return config
}, (error: AxiosError) => {
    // 停止进度条
    nProgress.done()
    message('网络错误 😩', "error")
    return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((response: AxiosResponse) => {
    // 停止进度条
    nProgress.done()
    console.log('状态码:' + response.status);

    if (response.status !== 200) {
        message('加载数据错误 😅', "error")
    }
    if (response.data.code === 302) {
        message("请登录后再进行操作 😂", "warning")
    }
    //  返回服务器响应的真实内容
    return response.data
}, (error: AxiosError) => {
    // 停止进度条
    nProgress.done()
    message('严重错误 😱', "error")
    return Promise.reject(error)
})

/**
 * 封装公共方法，因为每个接口都需要传入时间戳来禁用缓存,所有在公共方法中统一配置params
 */
export default {
    get<T = any>(url: string, config: AxiosRequestConfig = { params: {} }): Promise<T> {
        Reflect.set(config.params, 'timestamp', Date.now())
        console.log(config.params);
        return request.get(url, config)
    },
    post<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
        Reflect.set(config.params, 'timestamp', Date.now())
        return request.get(url, config)
    }
}