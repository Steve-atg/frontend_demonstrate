'use client';
import { Table } from 'antd';
import { UserResponseDto } from '@/api/generated/data-contracts';
import { useSearchParams } from 'next/navigation';
import { useUpdateMultipleSearchParams } from '@/hooks/useMultipleSearchParams';
import { formatDateTime } from '@/utils/dateFormatter';

interface UsersTableProps {
  tableData?: UserResponseDto[];
}

const UsersTable = ({ tableData }: UsersTableProps) => {
  const updateMultipleSearchParams = useUpdateMultipleSearchParams();

  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';

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
      render: (date: string) => formatDateTime(date),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => formatDateTime(date),
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
          current: page ? parseInt(page) : 1,
          pageSize: limit ? parseInt(limit) : 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} users`,
          async onChange(page, pageSize) {
            await updateMultipleSearchParams({
              page: page.toString(),
              limit: pageSize.toString(),
            });
          },
        }}
      />
    </div>
  );
};

export default UsersTable;
