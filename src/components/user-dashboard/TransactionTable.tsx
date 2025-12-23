'use client';
import { Table } from 'antd';
import { TransactionResponseDto } from '@/api/generated/data-contracts';
import { useSearchParams } from 'next/navigation';
import { useUpdateMultipleSearchParams } from '@/hooks/useMultipleSearchParams';
import { formatDateTime } from '@/utils/dateFormatter';
import DeleteTransactionButton from './DeleteTransactionButton';
import EditTransactionButton from './EditTransactionButton';
import CreateTransactionButton from './CreateTransactionButton';

interface TransactionTableProps {
  tableData?: TransactionResponseDto[];
}

const TransactionTable = ({ tableData }: TransactionTableProps) => {
  const updateMultipleSearchParams = useUpdateMultipleSearchParams();

  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';

  // Table columns configuration
  const columns = [
    {
      title: 'Transaction Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      render: (date: string) => formatDateTime(date),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            type === 'INCOME'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {type}
        </span>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (desc: string) => desc || 'N/A',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number, record: TransactionResponseDto) => (
        <span
          className={`font-semibold ${
            record.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {record.type === 'INCOME' ? '+' : '-'}
          {amount.toFixed(2)}
        </span>
      ),
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => formatDateTime(date),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <div className='flex gap-1'>
          <EditTransactionButton id={id} />
          <DeleteTransactionButton id={id} />
        </div>
      ),
    },
  ];

  return (
    <div className='max-w-7xl mx-auto px-6 pb-12'>
      {/* Header */}
      <div className='mb-8'>
        <h2 className='text-3xl font-semibold text-gray-900 tracking-tight mb-2'>
          Transaction Management
        </h2>
        <p className='text-lg text-gray-600'>
          Track and manage your financial transactions with advanced filtering
          and pagination.
        </p>
      </div>

      <CreateTransactionButton />

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
              `${range[0]}-${range[1]} of ${total} transactions`,
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

        .apple-pagination .ant-pagination-prev,
        .apple-pagination .ant-pagination-next {
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default TransactionTable;
