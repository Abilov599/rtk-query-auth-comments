import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/services/auth';

type FieldType = {
  username: string;
  password: string;
};

function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await login(values).unwrap();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };
  return (
    <Form name="login" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
      <Form.Item<FieldType>
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={isLoading} className="w-full">
        Submit
      </Button>
    </Form>
  );
}

export { LoginForm };
