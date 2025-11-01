'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { Button, Table, Spin, Alert } from 'antd';
import { useUsers } from '@/api/hooks';

const UserTable: React.FC = () => {
  const session = useSession();
  const {
    data: usersResponse,
    error: usersError,
    isLoading: isLoadingUsers,
    mutate: refetchUsers,
  } = useUsers();

  // Extract users data from the response
  const users = usersResponse?.data || [];

  // Table columns configuration
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  const handleRefresh = () => {
    refetchUsers();
  };

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold mb-4'>User Management</h2>

        {/* Debug session info */}
        <div className='mb-4 p-4 bg-gray-100 rounded'>
          <h3 className='text-lg font-semibold mb-2'>Session Debug Info:</h3>
          <div className='mb-2'>
            <strong>Access Token:</strong>
            <p className='font-mono text-sm break-all bg-gray-200 p-2 rounded mt-1'>
              {session.data?.accessToken || 'No access token available'}
            </p>
          </div>
          <details className='mt-2'>
            <summary className='cursor-pointer font-medium'>
              Full Session Data
            </summary>
            <pre className='mt-2 p-2 bg-gray-200 rounded text-xs overflow-auto'>
              {JSON.stringify(session, null, 2)}
            </pre>
          </details>
        </div>

        <div className='flex gap-2 mb-4'>
          <Button
            onClick={handleRefresh}
            type='primary'
            loading={isLoadingUsers}
          >
            Refresh Users
          </Button>
        </div>
      </div>

      {/* Error handling */}
      {usersError && (
        <Alert
          message='Error loading users'
          description={usersError.message || 'Failed to fetch users'}
          type='error'
          closable
          className='mb-4'
        />
      )}

      {/* Loading state */}
      {isLoadingUsers && (
        <div className='text-center py-8'>
          <Spin size='large' />
          <p className='mt-2'>Loading users...</p>
        </div>
      )}

      {/* Users table */}
      {!isLoadingUsers && !usersError && (
        <Table
          dataSource={users}
          columns={columns}
          rowKey='id'
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} users`,
          }}
        />
      )}
    </div>
  );
};

export default UserTable;
