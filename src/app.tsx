import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { ConfigProvider, App as AntdApp, FloatButton, theme } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useDarkMode } from 'usehooks-ts';

function App() {
  const { isDarkMode, toggle } = useDarkMode();
  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>
      <AntdApp>
        <RouterProvider router={router} />
        <FloatButton icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />} onClick={toggle} />
      </AntdApp>
    </ConfigProvider>
  );
}

export { App };
