import { DashboardPage } from '@pages/dashboard/DashboardPage';
import { LoginPage } from '@pages/login/LoginPage';
import { Layout } from '@shared/ui/Layout';
import { ProtectedRoute } from '@shared/ui/ProtectedRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
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
