import { addMetric, clearMetrics } from '@entities/adsMetrics';
import { mockAdsSocket } from '@shared/api/mockAdsSocket';
import { useAppDispatch } from '@shared/hooks/useAppDispatch';
import { useQuery } from '@tanstack/react-query';

export const useAdsMetricsSubscription = () => {
  const dispatch = useAppDispatch();

  useQuery({
    queryKey: ['ads-metrics-subscription'],
    queryFn: ({ signal }) => {
      mockAdsSocket.connect((metric) => {
        dispatch(addMetric(metric));
      });

      signal.addEventListener('abort', () => {
        mockAdsSocket.disconnect();
        dispatch(clearMetrics());
      });
      return Promise.resolve('connected');
    },
    retry: true,
    retryDelay: (attempt) => Math.min(3000 * attempt, 15000),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
