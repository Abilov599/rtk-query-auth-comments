import { Layout } from 'antd';

function Footer() {
  return (
    <Layout.Footer className="text-center mt-auto">
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Layout.Footer>
  );
}

export { Footer };
