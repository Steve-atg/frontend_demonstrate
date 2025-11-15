'use client';
import { Button } from 'antd';
import { useUpdateMultipleSearchParams } from '../../hooks/useMultipleSearchParams';

interface EditUserButtonProps {
  id: string;
}

const EditUserButton = ({ id }: EditUserButtonProps) => {
  const updateMultipleSearchParams = useUpdateMultipleSearchParams();
  const handleEditUser = () =>
    updateMultipleSearchParams({ id, modal: 'open' });

  return (
    <Button type='default' className='red-500' onClick={handleEditUser}>
      Edit
    </Button>
  );
};

export default EditUserButton;
