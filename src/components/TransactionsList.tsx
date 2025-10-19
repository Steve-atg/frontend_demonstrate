'use client';

import React from 'react';
import { Card, List, Spin, Alert, Button, Space, Tag } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DollarOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import {
  useMyTransactions,
  useCreateMyTransaction,
  useDeleteTransaction,
} from '@/api/hooks';
import type { CreateTransactionDto } from '@/api/generated/data-contracts';

const TransactionsList: React.FC = () => {
  const {
    data: transactionResponse,
    error,
    isLoading,
    mutate: refreshTransactions,
  } = useMyTransactions();

  // Extract data from the response object
  const transactions = transactionResponse?.data;

  const { trigger: createTransaction, isMutating: isCreating } =
    useCreateMyTransaction();

  const { trigger: deleteTransaction, isMutating: isDeleting } =
    useDeleteTransaction();

  const handleCreateTransaction = async () => {
    try {
      const newTransaction: CreateTransactionDto = {
        type: 'SPEND',
        amount: 29.99,
        currency: 'USD',
        transactionDate: new Date().toISOString(),
        description: 'Sample transaction',
        userId: 'current-user-id', // This would come from auth context
        categoryIds: [],
      };

      await createTransaction(newTransaction);
      // SWR will automatically revalidate the data
      await refreshTransactions();
    } catch (error) {
      console.error('Failed to create transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id);
      // SWR will automatically revalidate the data
      await refreshTransactions();
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  if (error) {
    return (
      <Alert
        message='Error'
        description='Failed to load transactions. Please try again.'
        type='error'
        showIcon
      />
    );
  }

  return (
    <Card
      title='My Transactions'
      extra={
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={handleCreateTransaction}
          loading={isCreating}
        >
          Add Transaction
        </Button>
      }
    >
      <Spin spinning={isLoading}>
        <List
          dataSource={transactions || []}
          renderItem={(transaction: any) => (
            <List.Item
              actions={[
                <Button
                  key='edit'
                  type='text'
                  icon={<EditOutlined />}
                  onClick={() => {
                    console.log('Edit transaction:', transaction.id);
                  }}
                />,
                <Button
                  key='delete'
                  type='text'
                  danger
                  icon={<DeleteOutlined />}
                  loading={isDeleting}
                  onClick={() => handleDeleteTransaction(transaction.id)}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center'>
                    <DollarOutlined className='text-blue-600' />
                  </div>
                }
                title={
                  <Space>
                    <span>
                      {transaction.description || 'Untitled Transaction'}
                    </span>
                    <Tag
                      color={transaction.type === 'INCOME' ? 'green' : 'red'}
                    >
                      {transaction.type}
                    </Tag>
                  </Space>
                }
                description={
                  <Space>
                    <span className='font-medium'>
                      {transaction.currency} {transaction.amount}
                    </span>
                    <CalendarOutlined />
                    <span>
                      {new Date(
                        transaction.transactionDate
                      ).toLocaleDateString()}
                    </span>
                  </Space>
                }
              />
            </List.Item>
          )}
          locale={{
            emptyText: 'No transactions found. Create your first transaction!',
          }}
        />
      </Spin>
    </Card>
  );
};

export default TransactionsList;
