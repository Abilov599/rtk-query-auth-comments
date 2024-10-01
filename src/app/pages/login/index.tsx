import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Flex, Input } from 'antd';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import type { ILoginRequest } from '../../models/user';
import { useLoginMutation } from '../../services/auth';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const [formState, setFormState] = useState<ILoginRequest>({
    username: '',
    password: '',
  });

  const [login, { isLoading }] = useLoginMutation();
  const isAuthenticated = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async () => {
    try {
      await login(formState).unwrap();
      // Being that the result is handled in extraReducers in authSlice,
      // we know that we're authenticated after this, so the user
      // and token will be present in the store
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return (
    <Flex justify="center" className="min-h-dvh">
      <form className="my-auto flex flex-col gap-2">
        <Flex>Hint: enter anything, or leave it blank and hit login</Flex>

        <Input onChange={handleChange} name="username" type="text" placeholder="Username" />

        <Input.Password
          name="password"
          placeholder="Password"
          onChange={handleChange}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />

        <Button onClick={handleSubmit} loading={isLoading}>
          Login
        </Button>
      </form>
    </Flex>
  );
};

export { LoginPage };
