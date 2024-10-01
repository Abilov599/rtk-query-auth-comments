import { Layout, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Sidebar } from './components/sidebar';
import { Content } from './components/content';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetMeQuery } from '@/services/auth';

function BaseLayout() {
  const isAuthenticated = useAuth();
  const { isLoading, isError, isSuccess } = useGetMeQuery();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-dvh flex justify-center items-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (!isAuthenticated || !isSuccess || isError) {
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
