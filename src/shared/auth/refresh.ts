import { apiClient } from '@shared/api/apiClient';
import { getRefreshPromise, setRefreshPromise } from './refreshLock';
import { store } from '@app/store';
import { logout, setAuth } from '@entities/auth';

export const refreshAccessToken = () => {
  const existing = getRefreshPromise();
  if (existing) return existing;

  const promise = apiClient
    .post<{ user: { id: string; email: string }; accessToken: string }>(
      '/refresh',
      {},
      { withCredentials: true }
    )
    .then((res) => {
      store.dispatch(setAuth(res.data));
      return res.data.accessToken;
    })
    .catch((e) => {
      store.dispatch(logout());
      throw e;
    })
    .finally(() => {
      setRefreshPromise(null);
    });
  setRefreshPromise(promise);
  return promise;
};
