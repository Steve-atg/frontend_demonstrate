'use client';
import { Button } from 'antd';
import { useUpdateMultipleSearchParams } from '../../hooks/useMultipleSearchParams';

interface UpgradeUserButtonProps {
  id: string;
}

const UpgradeUserButton = ({ id }: UpgradeUserButtonProps) => {
  const updateMultipleSearchParams = useUpdateMultipleSearchParams();
  const handleUpgradeUser = () =>
    updateMultipleSearchParams({ modal: 'upgrade', id });

  return (
    <Button type='default' size='small' onClick={handleUpgradeUser}>
      Upgrade User
    </Button>
  );
};

export default UpgradeUserButton;
