import axios from 'axios';

export const apiClient = axios.create({
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

apiClient.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  if (csrfToken) {
    config.headers?.set('X-CSRF-Token', csrfToken);
  }
  return config;
});
