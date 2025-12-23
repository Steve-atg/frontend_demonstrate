'use client';

import { transactionsAPI } from '@/api/client';
import { TransactionResponseDto } from '@/api/generated/data-contracts';
import { useUpdateMultipleSearchParams } from '@/hooks/useMultipleSearchParams';
import {
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useSearchParams } from 'next/navigation';
import { TransactionFormValues } from './types';
import { message, Modal } from 'antd';
import { formatDate } from '@/utils/dateFormatter';
import dayjs from 'dayjs';

interface TransactionFormProps {
  formData?: TransactionResponseDto;
  onFinish: () => void;
}

const TransactionForm = ({ formData, onFinish }: TransactionFormProps) => {
  const handleSubmit = async (values: TransactionFormValues) => {
    try {
      const data = {
        ...values,
        type: values.type as 'SPEND' | 'INCOME',
        transactionDate: values.transactionDate
          ? dayjs(values.transactionDate).toISOString()
          : dayjs().toISOString(),
      };

      if (formData?.id) {
        const resp = await transactionsAPI.transactionsControllerUpdate(
          formData.id,
          {
            amount: values.amount,
            currency: values.currency,
            description: values.description,
            transactionDate: data.transactionDate,
            type: values.type as 'SPEND' | 'INCOME',
            categoryIds: values.categoryIds,
          }
        );

        if (resp.status === 200) {
          message.success('Transaction updated successfully.');
          onFinish();
        } else {
          message.error('Failed to update transaction.');
        }
        return;
      }

      const resp = await transactionsAPI.transactionsControllerCreate({
        ...data,
        userId: '', // Will be set by backend from auth token
      });

      if (resp.status === 201) {
        message.success('Transaction created successfully.');
        onFinish();
      } else {
        message.error('Failed to create transaction.');
      }
    } catch (error) {
      message.error(`An error occurred while submitting the form. ${error}`);
    }
  };

  return (
    <ProForm<TransactionFormValues>
      initialValues={
        formData
          ? {
              ...formData,
              transactionDate: formData.transactionDate
                ? dayjs(formData.transactionDate)
                : dayjs(),
            }
          : {
              type: 'SPEND',
              currency: 'HKD',
            }
      }
      onFinish={handleSubmit}
      submitter={{
        searchConfig: {
          submitText: formData?.id
            ? 'Update Transaction'
            : 'Create Transaction',
        },
        resetButtonProps: false,
      }}
    >
      <ProFormSelect
        name='type'
        label='Transaction Type'
        placeholder='Select type'
        rules={[{ required: true, message: 'Please select transaction type' }]}
        options={[
          { label: 'Income', value: 'INCOME' },
          { label: 'Spend', value: 'SPEND' },
        ]}
      />

      <ProFormDigit
        name='amount'
        label='Amount'
        placeholder='Enter amount'
        rules={[
          { required: true, message: 'Please enter amount' },
          {
            type: 'number',
            min: 0.01,
            message: 'Amount must be at least 0.01',
          },
        ]}
        min={0.01}
        fieldProps={{ precision: 2 }}
      />

      <ProFormText
        name='currency'
        label='Currency'
        placeholder='e.g., USD, HKD'
        rules={[
          { required: true, message: 'Please enter currency' },
          {
            pattern: /^[A-Z]{3}$/,
            message: 'Currency must be 3 uppercase letters',
          },
        ]}
      />

      <ProFormTextArea
        name='description'
        label='Description'
        placeholder='Enter transaction description'
        fieldProps={{
          rows: 3,
        }}
      />

      <ProFormDatePicker
        name='transactionDate'
        label='Transaction Date'
        placeholder='Select transaction date'
        rules={[{ required: true, message: 'Please select transaction date' }]}
        fieldProps={{
          style: { width: '100%' },
        }}
      />
    </ProForm>
  );
};

interface ModalFormProps {
  formData?: TransactionResponseDto;
}

const TransactionModalForm = ({ formData }: ModalFormProps) => {
  const updateMultipleSearchParams = useUpdateMultipleSearchParams();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isModalOpen = ['create', 'edit'].includes(
    searchParams.get('modal') || ''
  );

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
            ? `Edit Transaction - Created: ${formatDate(formData?.createdAt)} - Last update: ${formatDate(formData?.updatedAt)}`
            : 'Create Transaction'}
        </h2>
      }
      footer={null}
    >
      <TransactionForm formData={formData} onFinish={handleCloseModal} />
    </Modal>
  );
};

export default TransactionModalForm;
