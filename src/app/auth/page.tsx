'use client';

import React, { useState, useEffect } from 'react';
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
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <Title level={2} className='mb-2'>
            Welcome
          </Title>
          <Text type='secondary'>
            Please sign in to your account or create a new one
          </Text>
        </div>

        {message && (
          <Alert
            message={message}
            type='warning'
            showIcon
            className='mb-4'
            closable
          />
        )}

        <Card className='shadow-lg'>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered
            size='large'
            items={[
              {
                key: 'login',
                label: (
                  <Space>
                    <LoginOutlined />
                    Login
                  </Space>
                ),
                children: <LoginForm callbackUrl={callbackUrl || undefined} />,
              },
              {
                key: 'register',
                label: (
                  <Space>
                    <UserOutlined />
                    Register
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
      </div>
    </div>
  );
}
