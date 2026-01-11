import { AggregatedMetric } from 'src/workers/metrics';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface adsDashboardState {
  metrics: AggregatedMetric;
}

const initialState: adsDashboardState = {
  metrics: {
    accountId: '',
    impressions: 0,
    clicks: 0,
    cost: 0,
    ctr: 0,
    cpa: 0,
    roas: 0,
  },
};

const adsDashboardSlice = createSlice({
  name: 'adsDashboard',
  initialState,
  reducers: {
    updateDashboardMetrics(state, action: PayloadAction<AggregatedMetric>) {
      state.metrics = action.payload;
    },
    resetDashboard(state) {
      state.metrics = initialState.metrics;
    },
  },
});

export const { updateDashboardMetrics, resetDashboard } =
  adsDashboardSlice.actions;
export default adsDashboardSlice.reducer;
