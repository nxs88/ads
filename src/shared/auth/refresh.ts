import { apiClient } from '@shared/api/apiClient';

export const refreshRequest = () =>
  apiClient.post<{ accessToken: string; user: { id: string; email: string } }>(
    '/refresh'
  );
