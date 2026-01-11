import { apiClient } from '@shared/api/apiClient';
import { ApiError } from '@shared/api/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface AuthData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: { id: string; email: string };
  accessToken: string;
}

export const useLogin = () => {
  return useMutation<AuthResponse, AxiosError<ApiError>, AuthData>({
    mutationFn: async ({ email, password }) => {
      const { data } = await apiClient.post<AuthResponse>('/login', {
        email,
        password,
      });
      return data;
    },
  });
};

export const useRegister = () => {
  return useMutation<AuthResponse, AxiosError<ApiError>, AuthData>({
    mutationFn: async ({ email, password }) => {
      const { data } = await apiClient.post<AuthResponse>('/register', {
        email,
        password,
      });
      return data;
    },
  });
};
