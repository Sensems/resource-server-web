import { FunctionComponent, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux'
import { userLogin } from '../../store/user.store'
import './login.css'

interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {

  }, []);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const login = async () => {
    dispatch(userLogin(loginForm) as any).then((res: any) => {
      if (res.error) return false
      navigate('/', { replace: true })
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12 bg-no-repeat bg-cover" style={{ backgroundImage: 'url(https://api.dujin.org/bing/1920.php)' }}>
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">

        <div className="bg-white shadow-2xl w-full rounded-lg divide-y divide-gray-200 pt-8">
          <h1 className="font-bold text-center text-2xl mb-5">登录</h1>
          <Form
            name="normal_login"
            className="p-6"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
                onInput={(e: any) => { setLoginForm({ ...loginForm, username: e.target.value }) }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
                onInput={(e: any) => { setLoginForm({ ...loginForm, password: e.target.value }) }}
              />
            </Form.Item>
            {/* <Form.Item>
              <Checkbox checked={rememberMe} onChange={handleRememberMeChange}>
                记住我
              </Checkbox>
              <a className="ml-auto" href="/">
                忘记密码
              </a>
            </Form.Item> */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full rounded-md font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300"
                onClick={login}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login;