import { AggregatedMetric, RawMetric } from 'src/workers/metrics';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdsMetricsState {
  rawMetrics: RawMetric[];
  aggregated: Record<string, AggregatedMetric>;
}

const initialState: AdsMetricsState = {
  rawMetrics: [],
  aggregated: {},
};

const adsMetricsSlice = createSlice({
  name: 'adsMetrics',
  initialState,
  reducers: {
    addMetric(state, action: PayloadAction<RawMetric>) {
      state.rawMetrics.push(action.payload);
    },
    clearMetrics(state) {
      state.rawMetrics = [];
    },
    setAggregated(
      state,
      action: PayloadAction<Record<string, AggregatedMetric>>
    ) {
      state.aggregated = action.payload;
    },
  },
});

export const { addMetric, clearMetrics, setAggregated } =
  adsMetricsSlice.actions;
export default adsMetricsSlice.reducer;
