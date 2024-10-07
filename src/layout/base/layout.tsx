import { Layout, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Sidebar } from './components/sidebar';
import { Content } from './components/content';
import { useGetMeQuery } from '@/services/auth';

function BaseLayout() {
  const { isLoading } = useGetMeQuery();

  if (isLoading) {
    return (
      <div className="min-h-dvh flex justify-center items-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
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
