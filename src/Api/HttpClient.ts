import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";

import { Constants } from "../Utils/constants/Constants";

export default class HttpClient {
  private static classInstance: HttpClient;
  private static axiosInstance: AxiosInstance;

  private constructor() {}

  public static getInstance(): HttpClient {
    if (!HttpClient.axiosInstance) {
      HttpClient.classInstance = new HttpClient();

      HttpClient.axiosInstance = axios.create({
        timeout: 60000,
        baseURL: process.env.REACT_APP_API_ENDPOINT,
      });

      HttpClient.addRequestInterceptors();
    }

    return HttpClient.classInstance;
  }

  public static get<ResponseType>(path: string, headers?: AxiosRequestHeaders) {
    return HttpClient.axiosInstance.get<ResponseType>(path, { headers });
  }

  public static post<ResponseType>(path: string, data?: any, headers?: AxiosRequestHeaders) {
    return HttpClient.axiosInstance.post<ResponseType>(path, data, { headers });
  }

  public static put<ResponseType>(path: string, data?: any, headers?: AxiosRequestHeaders) {
    return HttpClient.axiosInstance.put<ResponseType>(path, data, { headers });
  }

  private static addRequestInterceptors() {
    HttpClient.axiosInstance.interceptors.request.use((request) => {
      const token = sessionStorage.getItem(Constants.TOKEN_KEY);
      if (request.headers && token) {
        request.headers.Authorization = `${token}`;
        request.headers.ContentType = "application/json";
      }
      return request;
    });
  }

  public static addResponseInterceptor(handleGenericErrors: (error: any) => Promise<any>) {
    HttpClient.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => Promise.reject(handleGenericErrors(error))
    );
  }
}
