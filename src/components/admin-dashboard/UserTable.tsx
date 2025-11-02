'use client';
import React from 'react';
import { Button, Table, Spin, Alert } from 'antd';
import { UserResponseDto } from '@/api/generated/data-contracts';
import { AxiosResponse } from 'axios';

interface UsersTableProps {
  tableData?: UserResponseDto[];
}

const UsersTable: React.FC<UsersTableProps> = ({ tableData }) => {
  // Table columns configuration
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Level',
      dataIndex: 'userLevel',
      key: 'userLevel',
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

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold mb-4'>User Management</h2>
      </div>

      <Table
        dataSource={tableData ?? []}
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
    </div>
  );
};

export default UsersTable;
