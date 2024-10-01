import { Breadcrumb, Layout, theme } from 'antd';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const { token } = theme.useToken();

  const location = useLocation();

  const items = [
    {
      title: <Link to="/">{location.pathname}</Link>,
    },
  ];

  return (
    <Layout.Header style={{ background: token.colorBgContainer }} className="flex items-center">
      <Breadcrumb items={items} />
    </Layout.Header>
  );
}

export { Header };
