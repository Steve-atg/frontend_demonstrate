'use client';
import { Button } from 'antd';
import { useUpdateMultipleSearchParams } from '../../hooks/useMultipleSearchParams';

const EditUserButton = () => {
  const updateMultipleSearchParams = useUpdateMultipleSearchParams();
  const handleCreateUser = () =>
    updateMultipleSearchParams({ modal: 'create' });

  return (
    <Button type='default' size='small' onClick={handleCreateUser}>
      Create User
    </Button>
  );
};

export default EditUserButton;
