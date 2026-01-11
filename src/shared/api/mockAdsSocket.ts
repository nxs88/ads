import { RawMetric } from 'src/workers/metrics';

type MessageHandler = (data: RawMetric) => void;

class MockAdsSocket {
  private intervalId: number | null = null;
  private handler: MessageHandler | null = null;

  connect(handler: MessageHandler) {
    this.handler = handler;

    this.intervalId = window.setInterval(() => {
      const event: RawMetric = {
        accountId: String(Math.ceil(Math.random() * 3)),
        impressions: Math.floor(Math.random() * 1000),
        clicks: Math.floor(Math.random() * 200),
        cost: Number((Math.random() * 100).toFixed(2)),
        conversions: Math.floor(Math.random() * 20),
        revenue: Number((Math.random() * 300).toFixed(2)),
      };

      this.handler?.(event);
    }, 10000);
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const mockAdsSocket = new MockAdsSocket();
