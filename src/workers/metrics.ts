export interface RawMetric {
  accountId: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  revenue: number;
}

export interface AggregatedMetric {
  accountId: string;
  impressions: number;
  clicks: number;
  cost: number;
  ctr: number;
  cpa: number;
  roas: number;
}
