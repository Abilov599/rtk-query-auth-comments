import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { App as AntdApp } from 'antd';

function App() {
  return (
    <AntdApp>
      <RouterProvider router={router} />
    </AntdApp>
  );
}

export { App };
