import { apiClient } from './apiClient';

export interface Profile {
  id: string;
  email: string;
  name: string;
}

export const getProfile = async () => {
  const { data } = await apiClient.get<Profile>('/profile');
  return data;
};
