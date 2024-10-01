import { Layout, theme } from 'antd';
import { Header } from './header';
import { Outlet } from 'react-router-dom';
import { Footer } from './footer';

function Content() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout.Content className="min-h-svh">
      <Header />
      <div
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
        className="text-center p-6 m-4"
      >
        <Outlet />
      </div>
      <Footer />
    </Layout.Content>
  );
}

export { Content };
