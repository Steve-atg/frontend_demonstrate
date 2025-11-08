'use client';

import React from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, App } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useAsyncLoadingHandler from '@/hooks/useAsyncLoadingHandler';
import OAuthProviders from './OAuthProviders';

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  callbackUrl?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ callbackUrl }) => {
  const { message } = App.useApp();
  const router = useRouter();

  const { isLoading: isLoggingIn, handleFunction: login } =
    useAsyncLoadingHandler<LoginFormValues>(async (values: LoginFormValues) => {
      try {
        console.log('🚀 LoginForm: Starting login with:', {
          email: values.email,
          password: values.password,
        });

        const result = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (result?.error) {
          message.error(`Login failed: ${result.error}`);
          return;
        }

        if (result?.ok) {
          message.success('Login successful!');
          // Refresh the session
          const session = await getSession();

          const loginSuccessedUrl = () => {
            if (session?.user.userLevel === 99) {
              return '/admin-dashboard';
            }
            if (session?.user.userLevel && session.user.userLevel > 0) {
              return `/user-dashboard/?id=${session.user.id}`;
            }
            return callbackUrl || '/';
          };
          // Redirect to callback URL or home page
          router.push(loginSuccessedUrl());
        } else {
          console.log('⚠️ LoginForm: Unexpected result:', result);
          message.error('Login failed. Please try again.');
        }
      } catch (error) {
        console.error('💥 LoginForm: Login error:', error);
        message.error('An error occurred during login.');
      }
    });

  return (
    <div className='p-4'>
      <ProForm<LoginFormValues>
        onFinish={login}
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
            loading: isLoggingIn,
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

      <OAuthProviders />
    </div>
  );
};

export default LoginForm;
