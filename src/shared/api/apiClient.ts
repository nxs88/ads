import { store } from '@app/store';
import { setAuth } from '@entities/auth';
import { appLogout } from '@shared/lib/logout';
import axios from 'axios';

let accessToken: string | null = null;

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

//Читаем csrfToken из cookie
const getCsrfToken = () => {
  return document.cookie
    .split('; ')
    .find((c) => c.startsWith('csrfToken='))
    ?.split('=')[1];
};

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
};

apiClient.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  if (csrfToken) {
    config.headers?.set('X-CSRF-Token', csrfToken);
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.get('/api/refresh', {
          withCredentials: true,
        });
        accessToken = data.accessToken;

        store.dispatch(
          setAuth({ user: store.getState().auth.user!, accessToken })
        );

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        processQueue(null, accessToken);
        return apiClient(originalRequest);
      } catch (error) {
        processQueue(error, null);
        appLogout();
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export { apiClient, accessToken };
