'use client';

import { usersAPI } from '@/api/client';
import { UserResponseDto } from '@/api/generated/data-contracts';
import { useUpdateMultipleSearchParams } from '@/hooks/useMultipleSearchParams';
import {
  ProForm,
  ProFormDatePicker,
  ProFormGroup,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useSearchParams } from 'next/navigation';
import { UserFormValues } from './types';
import { message, Modal } from 'antd';
import { formatDate } from '@/utils/dateFormatter';

interface UserFormProps {
  formData?: UserResponseDto;
  onFinish: () => void;
}

const UserForm = ({ formData, onFinish }: UserFormProps) => {
  const handleSubmit = async (values: UserFormValues) => {
    try {
      const data = {
        ...values,
        gender: values.gender as 'M' | 'F' | 'OTHER',
      };
      if (formData?.id) {
        const resp = await usersAPI.usersControllerUpdate(formData.id, {
          avatar: values.avatar,
          dateOfBirth: values.dateOfBirth,
          gender: values.gender as 'M' | 'F' | 'OTHER',
          username: values.username,
          password: values.password,
        });

        if (resp.status === 200) {
          message.success('User updated successfully.');
          onFinish();
        } else {
          message.error('Failed to update user.');
        }
        return;
      }
      const resp = await usersAPI.usersControllerCreate(data);
      if (resp.status === 201) {
        message.success('User created successfully.');
        onFinish();
      } else {
        message.error('Failed to create user.');
      }
    } catch (error) {
      message.error('An error occurred while submitting the form.');
    } finally {
    }
  };
  return (
    <ProForm<UserFormValues>
      initialValues={formData ?? {}}
      onFinish={handleSubmit}
      onValuesChange={changedValues => {
        console.log('Changed Values:', changedValues);
      }}
      submitter={{
        searchConfig: {
          submitText: formData?.id ? 'Update User' : 'Create User',
        },
        resetButtonProps: false,
      }}
    >
      <ProFormGroup>
        <ProFormText
          name='email'
          label='Email'
          placeholder='Enter email'
          width='lg'
          disabled={!!formData?.id}
        />
        {formData?.id && (
          <ProFormText
            name='userLevel'
            label='User Level'
            disabled
            width='xs'
          />
        )}
      </ProFormGroup>
      <ProFormText
        name='username'
        label='Username'
        placeholder='Enter username'
      />
      {!formData?.id && (
        <ProFormText
          name='password'
          label='Password'
          placeholder='Enter password'
        />
      )}
      <ProFormSelect
        name='gender'
        label='Gender'
        placeholder='Enter gender'
        options={[
          { label: 'Male', value: 'M' },
          { label: 'Female', value: 'F' },
          { label: 'Other', value: 'OTHER' },
        ]}
      />
      <ProFormDatePicker
        name='dateOfBirth'
        label='Date of Birth'
        placeholder='Enter date of birth'
      />
    </ProForm>
  );
};
interface ModalFormProps {
  formData?: UserResponseDto;
}

const ModalForm = ({ formData }: ModalFormProps) => {
  const updateMultipleSearchParams = useUpdateMultipleSearchParams();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isModalOpen = !!searchParams.get('modal');

  const handleCloseModal = () => {
    updateMultipleSearchParams({ modal: null, id: null });
  };

  return (
    <Modal
      width='fit-content'
      height='fit-content'
      open={isModalOpen}
      onCancel={handleCloseModal}
      title={
        <h2 className='mr-6'>
          {!!id
            ? `Edit User - Create date ${formatDate(formData?.createdAt)} - Last update ${formatDate(formData?.updatedAt)}`
            : 'Create User'}
        </h2>
      }
      footer={null}
    >
      <UserForm formData={formData} onFinish={handleCloseModal} />
    </Modal>
  );
};

export default ModalForm;
