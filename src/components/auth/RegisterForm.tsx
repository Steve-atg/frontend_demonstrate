'use client';

import React from 'react';
import { ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined, 
  PhoneOutlined,
  TeamOutlined 
} from '@ant-design/icons';

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const RegisterForm: React.FC = () => {
  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      console.log('Register form values:', values);
      
      // Check if passwords match
      if (values.password !== values.confirmPassword) {
        message.error('Passwords do not match!');
        return false;
      }

      // Here you would typically make an API call to register the user
      message.success('Registration successful!');
    } catch (error) {
      message.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <ProForm<RegisterFormValues>
        onFinish={handleSubmit}
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
          },
        }}
        layout="vertical"
      >
        <div className="grid grid-cols-2 gap-4">
          <ProFormText
            name="firstName"
            label="First Name"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className="text-gray-400" />,
              placeholder: 'First name',
            }}
            rules={[
              { required: true, message: 'Please enter your first name!' },
              { min: 2, message: 'First name must be at least 2 characters!' },
            ]}
          />

          <ProFormText
            name="lastName"
            label="Last Name"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className="text-gray-400" />,
              placeholder: 'Last name',
            }}
            rules={[
              { required: true, message: 'Please enter your last name!' },
              { min: 2, message: 'Last name must be at least 2 characters!' },
            ]}
          />
        </div>

        <ProFormText
          name="email"
          label="Email"
          fieldProps={{
            size: 'large',
            prefix: <MailOutlined className="text-gray-400" />,
            placeholder: 'Enter your email',
          }}
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        />

        <ProFormText
          name="phone"
          label="Phone (Optional)"
          fieldProps={{
            size: 'large',
            prefix: <PhoneOutlined className="text-gray-400" />,
            placeholder: 'Enter your phone number',
          }}
          rules={[
            { 
              pattern: /^[\+]?[1-9][\d]{0,15}$/, 
              message: 'Please enter a valid phone number!' 
            },
          ]}
        />

        <ProFormSelect
          name="role"
          label="Role"
          fieldProps={{
            size: 'large',
            placeholder: 'Select your role',
          }}
          options={[
            { label: 'User', value: 'user' },
            { label: 'Admin', value: 'admin' },
            { label: 'Manager', value: 'manager' },
          ]}
          rules={[
            { required: true, message: 'Please select your role!' },
          ]}
        />

        <ProFormText.Password
          name="password"
          label="Password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className="text-gray-400" />,
            placeholder: 'Create a password',
          }}
          rules={[
            { required: true, message: 'Please enter your password!' },
            { min: 8, message: 'Password must be at least 8 characters!' },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
              message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number!',
            },
          ]}
        />

        <ProFormText.Password
          name="confirmPassword"
          label="Confirm Password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className="text-gray-400" />,
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
      </ProForm>

      <div className="mt-4 text-center text-sm text-gray-600">
        By creating an account, you agree to our{' '}
        <Button type="link" size="small" className="p-0 h-auto">
          Terms of Service
        </Button>{' '}
        and{' '}
        <Button type="link" size="small" className="p-0 h-auto">
          Privacy Policy
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;