'use client';

import { useUpdateMultipleSearchParams } from '@/hooks/useMultipleSearchParams';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CreateTransactionButton = () => {
  const updateMultipleSearchParams = useUpdateMultipleSearchParams();

  const handleClick = async () => {
    await updateMultipleSearchParams({ modal: 'create', id: null });
  };

  return (
    <Button onClick={handleClick} className='mb-4' size='small'>
      Create Transaction
    </Button>
  );
};

export default CreateTransactionButton;
