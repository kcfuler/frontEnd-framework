import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Notification } from '@arco-design/web-vue'

class Request {
  instance: AxiosInstance
  baseConfig: AxiosRequestConfig = {
    baseURL: '/api',
    timeout: 3000,
  }

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config))
    // 前置拦截器, 可以用来封装token等常见信息
    this.instance.interceptors.request.use(
      // @ts-expect-error
      (config: AxiosRequestConfig) => {
        if (localStorage.getItem('token')) {
          const token = localStorage.getItem('token')

          if (!config || !config.headers)
            return
          config.headers.Authorization = token
        }
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      },
    )

    // 后置拦截器 , 可以用来封装一些错误处理或者成功信息
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 返回请求结果
        return response
      },
      (error) => {
        let message: string
        // 封装常见错误信息
        switch (error.response.status) {
          case 400:
            message = '请求错误(400)'
            break
          case 401:
            message = '未授权，请重新登录(401)'
            break
          case 403:
            message = '拒绝访问(403)'
            break
          case 404:
            message = '请求出错(404)'
            break
          case 408:
            message = '请求超时(408)'
            break
          case 500:
            message = '服务器错误(500)'
            break
          case 501:
            message = '服务未实现(501)'
            break
          case 502:
            message = '网络错误(502)'
            break
          case 503:
            message = '服务不可用(503)'
            break
          case 504:
            message = '网络超时(504)'
            break
          case 505:
            message = 'HTTP版本不受支持(505)'
            break
          default:
            message = `连接出错(${error.response.status})`
        }
        Notification.error(message) // 通过全局组件发出提醒
      },
    )
  }

  public request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request(config)
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config)
  }

  public post<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.instance.post(url, data, config)
  }

  public put<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.instance.put(url, data, config)
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config)
  }
}

export default function request() {
  return new Request()
}
