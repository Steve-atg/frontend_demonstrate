'use client';
import { Button } from 'antd';

interface DeleteUserButtonProps {
  id: string;
}

const DeleteUserButton = ({ id }: DeleteUserButtonProps) => {
  const handleDeleteUser = () => {
    console.log(`Delete user with ID: ${id}`);
  };

  return (
    <Button type='default' className='red-500' onClick={handleDeleteUser}>
      Delete
    </Button>
  );
};

export default DeleteUserButton;
