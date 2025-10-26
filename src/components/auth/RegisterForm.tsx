'use client';

import React from 'react';
import {
  ProForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import { Button, App } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  TeamOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import type { RegisterDto } from '@/api/generated/data-contracts';
import { authAPI } from '@/api/client';
import useAsyncLoadingHandler from '@/hooks/useAsyncLoadingHandler';
import { Gender } from 'next-auth/providers/kakao';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: string;
  gender?: 'M' | 'F' | 'OTHER';
  dateOfBirth?: string;
}

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const { message } = App.useApp();
  const { isLoading: isRegistering, handleFunction: register } =
    useAsyncLoadingHandler<RegisterFormValues>(
      async (values: RegisterFormValues) => {
        try {
          // Check if passwords match
          if (values.password !== values.confirmPassword) {
            message.error('Passwords do not match!');
            return false;
          }

          // Prepare the data according to the API schema
          const registerData: RegisterDto = {
            username: values.username,
            email: values.email,
            password: values.password,
            gender: values.gender as Gender,
            ...(values.avatar && { avatar: values.avatar }),
            ...(values.dateOfBirth && {
              dateOfBirth: new Date(values.dateOfBirth).toISOString(),
            }),
          };

          // Call the register API using SWR mutation
          const result = await authAPI.authControllerRegister(registerData);

          if (result.status === 201) {
            message.success('Registration successful!');
            onRegisterSuccess();
            return;
          }

          message.error('Registration failed with status:', result.status);
        } catch (error) {
          console.error('Registration error:', error);
          message.error('Registration failed. Please try again.');
        }
      }
    );

  return (
    <div className='p-4'>
      <ProForm<RegisterFormValues>
        initialValues={{ gender: 'OTHER' }}
        onFinish={register}
        submitter={{
          searchConfig: {
            submitText: 'Create Account',
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            type: 'primary',
            size: 'large',
            style: { width: '100%' },
            icon: <TeamOutlined />,
            loading: isRegistering,
          },
        }}
        layout='vertical'
      >
        <ProFormText
          name='username'
          label='Username'
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className='text-gray-400' />,
            placeholder: 'Enter your username',
          }}
          rules={[
            { required: true, message: 'Please enter your username!' },
            { min: 2, message: 'Username must be at least 2 characters!' },
          ]}
        />

        <ProFormText
          name='email'
          label='Email'
          fieldProps={{
            size: 'large',
            prefix: <MailOutlined className='text-gray-400' />,
            placeholder: 'Enter your email',
          }}
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        />

        <ProFormText.Password
          name='password'
          label='Password'
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className='text-gray-400' />,
            placeholder: 'Create a password',
          }}
          rules={[
            { required: true, message: 'Please enter your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' },
          ]}
        />

        <ProFormText.Password
          name='confirmPassword'
          label='Confirm Password'
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className='text-gray-400' />,
            placeholder: 'Confirm your password',
          }}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        />

        <ProFormSelect
          name='gender'
          label='Gender (Optional)'
          fieldProps={{
            size: 'large',
            placeholder: 'Select your gender',
          }}
          options={[
            { label: 'Male', value: 'M' },
            { label: 'Female', value: 'F' },
            { label: 'Other', value: 'OTHER' },
          ]}
        />

        <ProFormText
          name='dateOfBirth'
          label='Date of Birth (Optional)'
          fieldProps={{
            size: 'large',
            prefix: <CalendarOutlined className='text-gray-400' />,
            placeholder: 'YYYY-MM-DD',
            type: 'date',
          }}
        />

        <ProFormText
          name='avatar'
          label='Avatar URL (Optional)'
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className='text-gray-400' />,
            placeholder: 'Enter avatar image URL',
          }}
          rules={[{ type: 'url', message: 'Please enter a valid URL!' }]}
        />
      </ProForm>

      <div className='mt-4 text-center text-sm text-gray-600'>
        By creating an account, you agree to our{' '}
        <Button type='link' size='small' className='p-0 h-auto'>
          Terms of Service
        </Button>{' '}
        and{' '}
        <Button type='link' size='small' className='p-0 h-auto'>
          Privacy Policy
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
