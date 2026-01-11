import { AggregatedMetric, RawMetric } from './metrics';
self.onmessage = (event: MessageEvent<RawMetric[]>) => {
  const metrics = event.data;

  // группируем метрики по accountId
  const grouped: Record<string, RawMetric[]> = {};

  for (const m of metrics) {
    if (!grouped[m.accountId]) grouped[m.accountId] = [];
    grouped[m.accountId].push(m);
  }

  const results: Record<string, AggregatedMetric> = {};

  for (const accountId in grouped) {
    const accountMetrics = grouped[accountId];

    let impressions = 0;
    let clicks = 0;
    let cost = 0;
    let conversions = 0;
    let revenue = 0;

    for (const m of accountMetrics) {
      impressions += m.impressions;
      clicks += m.clicks;
      cost += m.cost;
      conversions += m.conversions;
      revenue += m.revenue;
    }

    const ctr = impressions ? (clicks / impressions) * 100 : 0;
    const cpa = conversions ? cost / conversions : 0;
    const roas = cost ? revenue / cost : 0;

    results[accountId] = {
      accountId,
      impressions,
      clicks,
      cost: Number(cost.toFixed(2)),
      ctr: Number(ctr.toFixed(2)),
      cpa: Number(cpa.toFixed(2)),
      roas: Number(roas.toFixed(2)),
    };
  }

  self.postMessage(results);
};
