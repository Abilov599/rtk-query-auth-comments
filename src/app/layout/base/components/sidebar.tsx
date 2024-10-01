import type { MenuProps } from 'antd';
import { BarChartOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { createElement } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <Layout.Sider
      trigger={null}
      style={siderStyle}
      className="overflow-auto h-screen fixed start-0 inset-y-0"
    >
      <div className="py-2">
        <img src="logo.svg" alt="logo" className="m-auto" />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} items={items} />
    </Layout.Sider>
  );
}

export { Sidebar };
