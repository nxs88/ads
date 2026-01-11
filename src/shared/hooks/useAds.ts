import { RootState } from '@app/store';
import { useSelector } from 'react-redux';

export const useAds = () => {
  return useSelector((state: RootState) => state.ads.accounts);
};
