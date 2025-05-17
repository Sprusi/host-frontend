import axios, { AxiosError, AxiosResponse } from 'axios';

import { AuthForm } from '@/components/login/AuthPage';
import { TokenResponse } from '@/components/login/type/TokenResponse';

import { InterfaceLabels } from '@/host-constants';

import instance, { getBaseUrl } from './axios';
import { MessageService } from './MessageService';

const authInstance = axios.create({
  baseURL: getBaseUrl(),
});

const login = (data: AuthForm): Promise<AxiosResponse<TokenResponse>> => {
  return authInstance.post<TokenResponse>('/auth/login', data);
};

const registration = (data: AuthForm): Promise<AxiosResponse<TokenResponse>> => {
  return authInstance.post<TokenResponse>('/auth/regestration', data);
};

const refreshToken = (refreshToken: string | undefined): Promise<AxiosResponse<TokenResponse>> => {
  return authInstance.post<TokenResponse>('/auth/refresh', { refreshToken });
};

const logout = (): Promise<AxiosResponse<void>> => {
  return instance.post<void>('/auth/logout');
};

authInstance.interceptors.response.use(
  (v) => v,
  (error: AxiosError) => {
    if (error.response?.status === 400) {
      MessageService.error(InterfaceLabels.SERVER_REQUEST_ERROR, error);
    } else if (error.response?.status === 401) {
      MessageService.error(InterfaceLabels.LOGIN_ERROR, error);
    } else if (error.response?.status === 403) {
      MessageService.error(InterfaceLabels.ACCESS_DENIED, error);
    } else {
      MessageService.error(InterfaceLabels.NO_CONNECTION_TO_SERVER, error);
    }
    return Promise.reject(error);
  }
);

export const AuthService = {
  login,
  registration,
  refreshToken,
  logout,
};
