'use client';

import React from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const LoginForm: React.FC = () => {
  const handleSubmit = async (values: LoginFormValues) => {
    try {
      console.log('Login form values:', values);
      // Here you would typically make an API call to authenticate the user
      message.success('Login successful!');
    } catch (error) {
      message.error('Login failed. Please try again.');
    }
  };

  return (
    <div className='p-4'>
      <ProForm<LoginFormValues>
        onFinish={handleSubmit}
        submitter={{
          searchConfig: {
            submitText: 'Sign In',
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            type: 'primary',
            size: 'large',
            style: { width: '100%' },
            icon: <UserOutlined />,
          },
        }}
        layout='vertical'
      >
        <ProFormText
          name='email'
          fieldProps={{
            size: 'large',
            prefix: <MailOutlined className='text-gray-400' />,
            placeholder: 'Enter your email',
          }}
          placeholder='Email'
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        />

        <ProFormText.Password
          name='password'
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className='text-gray-400' />,
            placeholder: 'Enter your password',
          }}
          placeholder='Password'
          rules={[
            { required: true, message: 'Please enter your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' },
          ]}
        />
      </ProForm>

      <div className='mt-4 text-center'>
        <Button type='link' size='small'>
          Forgot password?
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
