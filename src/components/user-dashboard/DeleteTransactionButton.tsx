'use client';

import { transactionsAPI } from '@/api/client';
import { useRefresh } from '@/hooks/useRefresh';
import { Button, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface DeleteTransactionButtonProps {
  id: string;
}

const DeleteTransactionButton = ({ id }: DeleteTransactionButtonProps) => {
  const { refresh } = useRefresh();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const resp = await transactionsAPI.transactionsControllerRemove(id);
      if (resp.status === 200 || resp.status === 204) {
        message.success('Transaction deleted successfully.');
        refresh();
      } else {
        message.error('Failed to delete transaction.');
      }
    } catch (error) {
      message.error(
        `An error occurred while deleting the transaction. ${error}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popconfirm
      title='Delete Transaction'
      description='Are you sure you want to delete this transaction?'
      onConfirm={handleDelete}
      okText='Yes'
      cancelText='No'
    >
      <Button
        danger
        type='default'
        icon={<DeleteOutlined />}
        loading={loading}
        size='small'
      >
        Delete
      </Button>
    </Popconfirm>
  );
};

export default DeleteTransactionButton;
