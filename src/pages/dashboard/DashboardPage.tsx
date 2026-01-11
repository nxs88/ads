import { RootState } from '@app/store';
import { useAds } from '@shared/hooks/useAds';
import { useAdsMetrics } from '@shared/hooks/useAdsMetrics';
import { useAppSelector } from '@shared/hooks/useAppSelector';
import { appLogout } from '@shared/lib/logout';
import { useProfile } from '@shared/queries/profileQuery';

export const DashboardPage = () => {
  const { data, isLoading, error } = useProfile();
  const accounts = useAds();
  useAdsMetrics();

  const aggregated = useAppSelector(
    (state: RootState) => state.adsMetrics.aggregated
  );
  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Profile error</div>;

  return (
    <div className="text-x1 font-bold">
      <div className="text-x1 font-bold flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <h2>Profile</h2>
        <div>Email: {data.email}</div>
        <div>Name:{data.name}</div>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded mb-4 cursor-pointer"
          onClick={appLogout}
        >
          Выход
        </button>
      </div>
      {/* Метрики */}
      {aggregated ? (
        <div className="p-4 border rounded space-y-1 mb-5">
          {Object.values(aggregated).map((metric) => (
            <div key={metric.accountId} className="p-4 border rounded mb-3">
              <div>Account: {metric.accountId}</div>
              <div>Impressions: {metric.impressions}</div>
              <div>Clicks: {metric.clicks}</div>
              <div>Cost: {metric.cost}</div>
              <div>CTR: {metric.ctr}%</div>
              <div>CPA: {metric.cpa}</div>
              <div>ROAS: {metric.roas}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading metrics...</div>
      )}
      {/* Список аккаунтов */}
      <div className="space-y-2">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className={`p-3 rounded border ${
              acc.connected ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            {acc.name} ({acc.platform}) -{' '}
            {acc.connected ? 'Connected' : 'Disconnected'}
          </div>
        ))}
      </div>
    </div>
  );
};
