import { Middleware } from '@reduxjs/toolkit';
import { addMetric, setAggregated } from '@entities/adsMetrics';

export const analyticsWorkerMiddleware: Middleware = (store) => {
  const worker = new Worker(
    new URL('../../workers/adsMetrics.worker.ts', import.meta.url),
    { type: 'module' }
  );
  worker.onmessage = (e) => {
    store.dispatch(setAggregated(e.data));
  };

  return (next) => (action) => {
    const result = next(action);

    if (addMetric.match(action)) {
      const metrics = store.getState().adsMetrics.rawMetrics;
      worker.postMessage(metrics);
    }
    return result;
  };
};
