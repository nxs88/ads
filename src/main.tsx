import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { initAdsSocket } from '@app/initAdsSocket';
import { ReduxProvider } from '@app/providers/redux';
import { QueryProvider } from '@app/providers/query';

initAdsSocket();
if (import.meta.env.DEV) {
  const { worker } = await import('./shared/mocks/browser');
  worker.start();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </ReduxProvider>
  </StrictMode>
);
