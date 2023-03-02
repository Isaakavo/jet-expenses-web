import { InternalAxiosRequestConfig } from "axios";

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const authHeader = config?.headers?.['Authorization'];
  if (!authHeader) {
    debugger;
    const accessToken = window.sessionStorage.getItem('userSession');
    const tokenType = 'Bearer';

    if (accessToken && tokenType) {
      if (config.headers !== null && config.headers !== undefined) {
        debugger;
        config.headers['Authorization'] = tokenType + ' ' + accessToken;
      }
    }
  }
  return config;
};