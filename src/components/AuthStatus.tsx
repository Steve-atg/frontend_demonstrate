'use client';

import React from 'react';
import { Card, Button, Space, Typography, Alert } from 'antd';
import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';

const { Title, Text } = Typography;

const AuthStatus: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return <Alert message='Loading...' type='info' showIcon />;
  }

  if (!isAuthenticated) {
    return (
      <Card>
        <Space direction='vertical' align='center' style={{ width: '100%' }}>
          <UserOutlined style={{ fontSize: '48px', color: '#ccc' }} />
          <Title level={4}>Not Authenticated</Title>
          <Text type='secondary'>Please log in to access your account</Text>
          <Button type='primary' icon={<LoginOutlined />}>
            Go to Login
          </Button>
        </Space>
      </Card>
    );
  }

  return (
    <Card>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Space>
          <UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          <Title level={4} style={{ margin: 0 }}>
            Welcome Back!
          </Title>
        </Space>

        {user && (
          <div>
            <Text strong>User ID: </Text>
            <Text>{user.id || 'N/A'}</Text>
            <br />
            <Text strong>Email: </Text>
            <Text>{user.email || 'N/A'}</Text>
            <br />
            <Text strong>Username: </Text>
            <Text>{user.username || 'N/A'}</Text>
          </div>
        )}

        <Button
          type='primary'
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Space>
    </Card>
  );
};

export default AuthStatus;
