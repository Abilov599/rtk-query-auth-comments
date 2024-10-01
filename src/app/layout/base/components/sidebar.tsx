import type { MenuProps } from 'antd';
import { BarChartOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, Typography } from 'antd';
import { createElement } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const items: MenuProps['items'] = [
  {
    key: 0,
    icon: createElement(UserOutlined),
    label: <Link to="/">Home</Link>,
  },
  {
    key: 1,
    icon: createElement(BarChartOutlined),
    label: <Link to="/comments">Comments</Link>,
  },
];

const siderStyle: CSSProperties = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset',
};

function Sidebar() {
  const { user, logout } = useAuth();
  return (
    <Layout.Sider
      trigger={null}
      style={siderStyle}
      className="overflow-auto h-screen fixed start-0 inset-y-0"
    >
      <div className="flex flex-col justify-between h-full py-2">
        <div>
          <Link className="p-2 flex gap-3 items-center mx-1 bg-white rounded-lg" to="/profile">
            <Avatar icon={<UserOutlined />} src={user?.image} className="ml-2" />
            <Typography.Text>{user?.username}</Typography.Text>
          </Link>
          <Menu theme="dark" mode="inline" items={items} />
        </div>
        <div className="flex justify-center">
          <button className="bg-white py-1 px-2 rounded" onClick={logout}>
            <LogoutOutlined />
          </button>
        </div>
      </div>
    </Layout.Sider>
  );
}

export { Sidebar };
