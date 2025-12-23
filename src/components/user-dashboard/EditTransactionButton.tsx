'use client';

import { useUpdateMultipleSearchParams } from '@/hooks/useMultipleSearchParams';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

interface EditTransactionButtonProps {
  id: string;
}

const EditTransactionButton = ({ id }: EditTransactionButtonProps) => {
  const updateMultipleSearchParams = useUpdateMultipleSearchParams();

  const handleClick = async () => {
    await updateMultipleSearchParams({ modal: 'edit', id });
  };

  return (
    <Button
      type='default'
      icon={<EditOutlined />}
      onClick={handleClick}
      size='small'
    >
      Edit
    </Button>
  );
};

export default EditTransactionButton;
