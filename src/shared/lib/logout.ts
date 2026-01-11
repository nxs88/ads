import { store } from '@app/store';
import { queryClient } from './queryClient';
import { logout } from '@entities/auth';

export const appLogout = () => {
  queryClient.clear();
  store.dispatch(logout());
};
