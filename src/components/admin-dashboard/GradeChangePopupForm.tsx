'use client';
import { usersAPI } from '@/api/client';
import { UserResponseDto } from '@/api/generated/data-contracts';
import { useUpdateMultipleSearchParams } from '@/hooks/useMultipleSearchParams';
import { message } from 'antd';
import { useSearchParams } from 'next/navigation';
import { UpgradeUserDto } from '../../api/generated/data-contracts';
import { ModalForm, ProFormDigit } from '@ant-design/pro-components';

interface GradeChangePopupFormProps {
  formData?: UserResponseDto;
}

const GradeChangePopupForm = ({ formData }: GradeChangePopupFormProps) => {
  const updateMultipleSearchParams = useUpdateMultipleSearchParams();
  const searchParams = useSearchParams();
  const isModalOpen = ['upgrade'].includes(searchParams.get('modal') || '');

  const handleSubmit = async (values: UpgradeUserDto) => {
    if (!formData?.id) {
      message.error('User ID is missing');
      return false;
    }

    try {
      const res = await usersAPI.usersControllerUpgradeUser(formData.id, {
        userLevel: values.userLevel,
      });
      if (res.status !== 200) {
        throw new Error('API response not OK');
      }
      message.success('User grade updated successfully');
      await updateMultipleSearchParams({ modal: null, id: null });
      return true;
    } catch (error) {
      if (error instanceof Error) {
        message.error(`Failed to update grade: ${error.message}`);
      } else {
        message.error('Failed to update grade');
      }
      return false;
    }
  };

  const handleOpenChange = async (open: boolean) => {
    if (!open) {
      await updateMultipleSearchParams({ modal: null, id: null });
    }
  };

  return (
    <ModalForm<UpgradeUserDto>
      title={
        <h2 className='mr-6'>
          {`Edit User Grade${formData?.username ? ` - ${formData.username}` : ''}`}
        </h2>
      }
      open={isModalOpen}
      width='fit-content'
      onOpenChange={handleOpenChange}
      onFinish={handleSubmit}
      initialValues={{ userLevel: formData?.userLevel ?? 1 }}
      modalProps={{
        destroyOnClose: true,
        okText: 'Update',
        cancelText: 'Cancel',
      }}
    >
      <ProFormDigit
        name='userLevel'
        label='User Level'
        placeholder='Enter user level (0-99)'
        min={0}
        max={99}
        fieldProps={{
          precision: 0,
        }}
        width={200}
        rules={[
          { required: true, message: 'Please enter a user level' },
          {
            type: 'number',
            min: 0,
            max: 99,
            message: 'Must be between 0 and 99',
          },
        ]}
      />
    </ModalForm>
  );
};

export default GradeChangePopupForm;
