'use client';
import { Table } from 'antd';
import { UserResponseDto } from '@/api/generated/data-contracts';
import { useSearchParams } from 'next/navigation';
import { useUpdateMultipleSearchParams } from '@/hooks/useMultipleSearchParams';
import { formatDateTime } from '@/utils/dateFormatter';
import DeleteUserButton from './DeleteUserButton';
import EditUserButton from './EditUserButton';

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
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <div className='flex gap-1'>
          <EditUserButton id={id} />
          <DeleteUserButton id={id} />
        </div>
      ),
    },
  ];

  return (
    <div className='max-w-7xl mx-auto px-6 pb-12'>
      {/* Header */}
      <div className='mb-8'>
        <h2 className='text-3xl font-semibold text-gray-900 tracking-tight mb-2'>
          User Management
        </h2>
        <p className='text-lg text-gray-600'>
          Manage and monitor user accounts with advanced filtering and
          pagination.
        </p>
      </div>

      {/* Table Container */}
      <div className='backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl border-0 overflow-hidden'>
        <Table
          dataSource={tableData ?? []}
          columns={columns}
          rowKey='id'
          className='apple-table'
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
            className: 'apple-pagination',
          }}
        />
      </div>

      <style jsx global>{`
        .apple-table .ant-table {
          background: transparent;
          border-radius: 0;
        }

        .apple-table .ant-table-thead > tr > th {
          background: rgba(59, 130, 246, 0.05);
          border-bottom: 1px solid rgba(59, 130, 246, 0.2);
          color: #374151;
          font-weight: 600;
          font-size: 14px;
          padding: 16px 24px;
        }

        .apple-table .ant-table-tbody > tr > td {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(229, 231, 235, 0.5);
          font-size: 14px;
        }

        .apple-table .ant-table-tbody > tr:hover > td {
          background: rgba(59, 130, 246, 0.03) !important;
        }

        .apple-table .ant-table-tbody > tr:last-child > td {
          border-bottom: none;
        }

        .apple-pagination .ant-pagination-item {
          border-radius: 8px;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .apple-pagination .ant-pagination-item-active {
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.1),
            rgba(147, 51, 234, 0.1)
          );
          border-color: rgba(59, 130, 246, 0.4);
        }

        .apple-pagination .ant-pagination-item-active a {
          color: #3b82f6;
          font-weight: 600;
        }

        .apple-pagination .ant-pagination-options {
          margin-left: 16px;
        }

        .apple-pagination .ant-select-selector {
          border-radius: 8px;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  );
};

export default UsersTable;
