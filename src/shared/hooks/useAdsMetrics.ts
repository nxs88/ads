import { useAdsMetricsSubscription } from '@shared/queries/adsMetricsQuery';

export const useAdsMetrics = () => {
  useAdsMetricsSubscription();
};
