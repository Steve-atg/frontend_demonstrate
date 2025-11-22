'use client';
import { usersAPI } from '@/api/client';
import { useRefresh } from '@/hooks/useRefresh';
import { Button, message } from 'antd';

interface DeleteUserButtonProps {
  id: string;
}

const DeleteUserButton = ({ id }: DeleteUserButtonProps) => {
  const { refresh } = useRefresh();
  const handleDeleteUser = async () => {
    try {
      const resp = await usersAPI.usersControllerRemove(id);
      if (resp.status === 200) {
        message.success('User deleted successfully.');
        return;
      }
      message.error('Failed to delete user.');
    } catch (error) {
      message.error('An error occurred while deleting the user.');
    } finally {
      refresh();
    }
  };

  return (
    <Button
      size='small'
      type='default'
      className='red-500'
      onClick={handleDeleteUser}
    >
      Delete
    </Button>
  );
};

export default DeleteUserButton;
