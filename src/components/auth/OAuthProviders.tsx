'use client';

import React from 'react';
import { Button, Space, Divider } from 'antd';
import { GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { signIn, getProviders } from 'next-auth/react';

const OAuthProviders: React.FC = () => {
  const handleOAuthSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <div className='w-full'>
      <Divider>
        <span className='text-gray-500 text-sm'>Or continue with</span>
      </Divider>

      <Space direction='vertical' size='middle' className='w-full'>
        {/* Uncomment these when you configure OAuth providers */}
        {/* <Button
          size="large"
          icon={<GoogleOutlined />}
          onClick={() => handleOAuthSignIn('google')}
          className="w-full"
        >
          Continue with Google
        </Button>
        
        <Button
          size="large"
          icon={<GithubOutlined />}
          onClick={() => handleOAuthSignIn('github')}
          className="w-full"
        >
          Continue with GitHub
        </Button> */}

        {/* Placeholder text for now */}
        <div className='text-center text-gray-500 text-sm'>
          OAuth providers will be available when configured
        </div>
      </Space>
    </div>
  );
};

export default OAuthProviders;
