import { DashboardPage } from '@pages/dashboard/DashboardPage';
import { LoginPage } from '@pages/login/LoginPage';
import { refreshAccessToken } from '@shared/auth/refresh';
import { Layout } from '@shared/ui/Layout';
import { ProtectedRoute } from '@shared/ui/ProtectedRoute';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  useEffect(() => {
    refreshAccessToken().catch(() => {});
    // если refreshToken невалидный — просто остаёмся разлогиненными
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
