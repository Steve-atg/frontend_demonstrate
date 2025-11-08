'use client';

import React, { useState } from 'react';
import { Card, Tabs, Typography, Space, Alert } from 'antd';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const { Title, Text } = Typography;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-6 py-12'>
      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-600/20 rounded-full blur-3xl'></div>
      </div>

      <div className='w-full max-w-lg relative z-10'>
        {/* Header */}
        <div className='text-center mb-8'>
          <Title
            level={1}
            className='mb-3 !text-3xl !font-semibold !text-gray-900 tracking-tight'
          >
            Welcome Back
          </Title>
          <Text className='text-lg text-gray-600 font-medium'>
            The most secure way to access your finances
          </Text>
        </div>

        {message && (
          <div className='mb-6'>
            <Alert
              message={message}
              type='warning'
              showIcon
              className='rounded-2xl border-0 shadow-sm bg-orange-50/80 backdrop-blur-sm'
              closable
            />
          </div>
        )}

        {/* Auth Card */}
        <Card className='backdrop-blur-xl bg-white/80 border-0 shadow-2xl rounded-3xl overflow-hidden'>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered
            size='large'
            className='auth-tabs'
            items={[
              {
                key: 'login',
                label: (
                  <Space className='px-4 py-2'>
                    <LoginOutlined className='text-base' />
                    <span className='font-medium'>Sign In</span>
                  </Space>
                ),
                children: <LoginForm callbackUrl={callbackUrl || undefined} />,
              },
              {
                key: 'register',
                label: (
                  <Space className='px-4 py-2'>
                    <UserOutlined className='text-base' />
                    <span className='font-medium'>Create Account</span>
                  </Space>
                ),
                children: (
                  <RegisterForm
                    onRegisterSuccess={() => setActiveTab('login')}
                  />
                ),
              },
            ]}
          />
        </Card>

        {/* Footer */}
        <div className='text-center mt-8'>
          <Text className='text-sm text-gray-500'>
            Protected by enterprise-grade security
          </Text>
        </div>
      </div>

      <style jsx global>{`
        .auth-tabs .ant-tabs-nav {
          margin-bottom: 32px;
        }

        .auth-tabs .ant-tabs-tab {
          border-radius: 50px !important;
          border: 1px solid transparent !important;
          margin: 0 8px !important;
          transition: all 0.3s ease !important;
        }

        .auth-tabs .ant-tabs-tab:hover {
          background: rgba(59, 130, 246, 0.05) !important;
          border-color: rgba(59, 130, 246, 0.2) !important;
        }

        .auth-tabs .ant-tabs-tab.ant-tabs-tab-active {
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.1),
            rgba(147, 51, 234, 0.1)
          ) !important;
          border-color: rgba(59, 130, 246, 0.3) !important;
        }

        .auth-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #3b82f6 !important;
          font-weight: 600 !important;
        }

        .auth-tabs .ant-tabs-ink-bar {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
