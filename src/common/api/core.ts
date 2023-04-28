import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd';
import { API } from './api.d'

class RequestCore {
  private instance: any

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors(this.instance);
  }

  interceptors(instance: AxiosInstance) {
    // 请求拦截器
    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      return config;
    }, (error: any) => {
      return Promise.reject(error);
    });

    // 响应拦截器
    instance.interceptors.response.use((response: AxiosResponse) => {
      console.log('response.data', response.data)
      if (response.data.code == 'INTERNAL_SERVER_ERROR') {
        message.error(response.data.message)
        return Promise.reject(response.data.message)
      }
      return response.data;
    }, (error: any) => {
      return Promise.reject(error);
    });
  }

  public post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<API.DefaultBody<T>> {
    return this.instance.post(url, data, config);
  }
}

export default RequestCore;