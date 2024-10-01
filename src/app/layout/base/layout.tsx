import { Layout } from 'antd';
import { Sidebar } from './components/sidebar';
import { Content } from './components/content';
import { useAuth } from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

function BaseLayout() {
  const isAuthenticated = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <Layout hasSider>
      <Layout className="ms-[200px]">
        <Sidebar />
        <Content />
      </Layout>
    </Layout>
  );
}

export { BaseLayout };
