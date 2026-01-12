import { apiClient } from './apiClient';

interface AuthResponse {
  user: { id: string; email: string };
  accessToken: string;
}

export const authApi = {
  login(email: string, password: string) {
    return apiClient.post<AuthResponse>('/login', { email, password });
  },
  register(email: string, password: string) {
    return apiClient.post<AuthResponse>('/register', { email, password });
  },
  refresh() {
    return apiClient.get<{ accessToken: string }>('/refresh', {
      withCredentials: true,
    });
  },
};
