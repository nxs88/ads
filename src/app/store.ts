import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@entities/auth/model/authSlice';
import adsReducer from '@entities/ads/model/adsSlice';
import adsMetricsReducer from '@entities/adsMetrics/model/adsMetricSlice';
import adsDashboardReducer from '@entities/adsDashboard/model/adsDashboardSlice';
import { analyticsWorkerMiddleware } from '@shared/middleware/analyticsWorkerMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ads: adsReducer,
    adsMetrics: adsMetricsReducer,
    adsDashboard: adsDashboardReducer,
  },
  middleware: (getDefault) => getDefault().concat(analyticsWorkerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
