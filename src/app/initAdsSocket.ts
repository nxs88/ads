import { mockAdsSocket } from '@shared/api/mockAdsSocket';
import { store } from './store';
import { addMetric } from '@entities/adsMetrics';

export const initAdsSocket = () => {
  mockAdsSocket.connect((metric) => {
    store.dispatch(addMetric(metric));
  });
};
