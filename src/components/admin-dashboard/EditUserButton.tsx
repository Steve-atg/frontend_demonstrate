'use client';
import { Button } from 'antd';
import { useUpdateMultipleSearchParams } from '../../hooks/useMultipleSearchParams';

interface EditUserButtonProps {
  id: string;
}

const EditUserButton = ({ id }: EditUserButtonProps) => {
  const updateMultipleSearchParams = useUpdateMultipleSearchParams();
  const handleEditUser = () => {
    console.log(`Edit user with ID: ${id}`);
    updateMultipleSearchParams({ id });
  };

  return (
    <Button type='default' className='red-500' onClick={handleEditUser}>
      Edit
    </Button>
  );
};

export default EditUserButton;
