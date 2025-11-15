'use client';
import { Button } from 'antd';
import { useUpdateMultipleSearchParams } from '../../hooks/useMultipleSearchParams';

const EditUserButton = () => {
  const updateMultipleSearchParams = useUpdateMultipleSearchParams();
  const handleCreateUser = () => updateMultipleSearchParams({ modal: 'open' });

  return (
    <Button type='default' onClick={handleCreateUser}>
      Create User
    </Button>
  );
};

export default EditUserButton;
