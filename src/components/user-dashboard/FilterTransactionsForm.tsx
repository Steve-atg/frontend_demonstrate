'use client';
import {
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
  ProFormDigit,
  ProFormInstance,
} from '@ant-design/pro-components';
import { Button, Collapse, Input } from 'antd';
import { useUpdateMultipleSearchParams } from '../../hooks/useMultipleSearchParams';
import {
  SearchOutlined,
  ClearOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import { useRef, useState } from 'react';

interface FilterTransactionsFormValues {
  search?: string;
  description?: string;
  type?: 'SPEND' | 'INCOME';
  currency?: string;
  minAmount?: number;
  maxAmount?: number;
  transactionDateAfter?: string;
  transactionDateBefore?: string;
  createdAfter?: string;
  createdBefore?: string;
  sortBy?: 'transactionDate' | 'amount' | 'createdAt' | 'updatedAt';
  sortOrder?: 'desc' | 'asc';
}

interface FilterTransactionsFormProps {
  initialValues?: FilterTransactionsFormValues;
}

const FilterTransactionsForm = ({
  initialValues,
}: FilterTransactionsFormProps) => {
  const updateMultipleSearchParams = useUpdateMultipleSearchParams();
  const [activeKey, setActiveKey] = useState<string[]>([]);

  const formRef = useRef<ProFormInstance<FilterTransactionsFormValues>>(null);

  // Sanitize initialValues to ensure it's a plain object
  const sanitizedInitialValues = initialValues
    ? JSON.parse(JSON.stringify(initialValues))
    : {};

  const handleFinish = async (values: FilterTransactionsFormValues) => {
    const convertedValues = Object.entries(values).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null) acc[key] = String(value);
        if (value === undefined || value === '') acc[key] = null;
        return acc;
      },
      {} as Record<string, string | null>
    );

    await updateMultipleSearchParams(convertedValues);
  };

  const handleReset = async () => {
    await updateMultipleSearchParams({
      search: null,
      description: null,
      type: null,
      currency: null,
      minAmount: null,
      maxAmount: null,
      transactionDateAfter: null,
      transactionDateBefore: null,
      createdAfter: null,
      createdBefore: null,
      sortBy: null,
      sortOrder: null,
      page: null,
      limit: null,
    });
    formRef.current?.resetFields();
  };

  const collapseItems = [
    {
      key: '1',
      label: (
        <span className='flex items-center justify-end'>
          <div>
            {!activeKey.includes('1') && (
              <Input.Search
                size='small'
                placeholder='search'
                enterButton
                onSearch={value => handleFinish({ search: value })}
              />
            )}
          </div>
        </span>
      ),
      children: (
        <ProForm<FilterTransactionsFormValues>
          formRef={formRef}
          initialValues={sanitizedInitialValues}
          onFinish={handleFinish}
          submitter={{
            render: props => (
              <div
                style={{
                  gridColumn: '1 / -1',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: '4px',
                  marginTop: '8px',
                  paddingTop: '8px',
                  borderTop: '1px solid #f0f0f0',
                }}
              >
                <Button
                  icon={<ClearOutlined />}
                  onClick={handleReset}
                  size='small'
                >
                  Reset
                </Button>
                <Button
                  type='primary'
                  icon={<SearchOutlined />}
                  onClick={() => props.form?.submit()}
                  size='small'
                >
                  Filter
                </Button>
              </div>
            ),
          }}
          layout='vertical'
          size='small'
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0px 8px',
            alignItems: 'start',
          }}
        >
          {/* Search & Basic Filters */}
          <ProFormText
            name='search'
            label='Search'
            placeholder='Search description'
            style={{ width: '100%' }}
          />

          <ProFormText
            name='description'
            label='Description'
            placeholder='Enter description'
            style={{ width: '100%' }}
          />

          <ProFormSelect
            name='type'
            label='Transaction Type'
            placeholder='Select type'
            style={{ width: '100%' }}
            options={[
              { label: 'Income', value: 'INCOME' },
              { label: 'Spend', value: 'SPEND' },
            ]}
          />

          <ProFormText
            name='currency'
            label='Currency'
            placeholder='e.g., USD, HKD'
            style={{ width: '100%' }}
          />

          {/* Amount Filters */}
          <ProFormDigit
            name='minAmount'
            label='Min Amount'
            placeholder='Minimum amount'
            min={0}
            style={{ width: '100%' }}
          />

          <ProFormDigit
            name='maxAmount'
            label='Max Amount'
            placeholder='Maximum amount'
            min={0}
            style={{ width: '100%' }}
          />

          {/* Transaction Date Filters */}
          <ProFormDatePicker
            name='transactionDateAfter'
            label='Transaction After'
            placeholder='From date'
            style={{ width: '100%' }}
          />

          <ProFormDatePicker
            name='transactionDateBefore'
            label='Transaction Before'
            placeholder='To date'
            style={{ width: '100%' }}
          />

          {/* Created Date Filters */}
          <ProFormDatePicker
            name='createdAfter'
            label='Created After'
            placeholder='From date'
            style={{ width: '100%' }}
          />

          <ProFormDatePicker
            name='createdBefore'
            label='Created Before'
            placeholder='To date'
            style={{ width: '100%' }}
          />

          {/* Sorting Options */}
          <ProFormSelect
            name='sortBy'
            label='Sort By'
            placeholder='Sort field'
            style={{ width: '100%' }}
            options={[
              { label: 'Transaction Date', value: 'transactionDate' },
              { label: 'Amount', value: 'amount' },
              { label: 'Created At', value: 'createdAt' },
              { label: 'Updated At', value: 'updatedAt' },
            ]}
          />

          <ProFormSelect
            name='sortOrder'
            label='Sort Order'
            placeholder='Order direction'
            style={{ width: '100%' }}
            options={[
              { label: 'Ascending', value: 'asc' },
              { label: 'Descending', value: 'desc' },
            ]}
          />
        </ProForm>
      ),
    },
  ];

  return (
    <div className='mb-4'>
      <Collapse
        items={collapseItems}
        activeKey={activeKey}
        onChange={key => setActiveKey(key as string[])}
        collapsible='icon'
        expandIcon={panelProps => (
          <div className='flex gap-2'>
            <ArrowDownOutlined
              className={`transition-transform duration-300 ease-in-out ${panelProps.isActive ? '' : '-rotate-90'}`}
            />
            Filter Transactions
          </div>
        )}
      />
    </div>
  );
};

export default FilterTransactionsForm;
