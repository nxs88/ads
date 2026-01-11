import { refreshRequest } from '@shared/auth/refresh';
import { AxiosError } from 'axios';

export const baseQuery = async <T>(queryFn: () => Promise<T>): Promise<T> => {
  try {
    return await queryFn();
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status !== 401) {
      throw error;
    }

    await refreshRequest();
    return await queryFn();
  }
};
