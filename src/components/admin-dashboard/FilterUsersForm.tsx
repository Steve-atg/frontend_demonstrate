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

interface FilterUsersFormValues {
  bornAfter?: string;
  bornBefore?: string;
  createdAfter?: string;
  createdBefore?: string;
  email?: string;
  gender?: 'M' | 'F' | 'OTHER';
  maxUserLevel?: number;
  minUserLevel?: number;
  search?: string;
  sortBy?: 'username' | 'email' | 'userLevel' | 'createdAt' | 'updatedAt';
  sortOrder?: 'desc' | 'asc';
  userLevel?: number;
  username?: string;
}

interface FilterUsersFormProps {
  initialValues?: FilterUsersFormValues;
}

const FilterUsersForm = ({ initialValues }: FilterUsersFormProps) => {
  const updateMultipleSearchParams = useUpdateMultipleSearchParams();
  const [activeKey, setActiveKey] = useState<string[]>([]);

  const formRef = useRef<ProFormInstance<FilterUsersFormValues>>(null);

  // Sanitize initialValues to ensure it's a plain object
  const sanitizedInitialValues = initialValues
    ? JSON.parse(JSON.stringify(initialValues))
    : {};

  const handleFinish = async (values: FilterUsersFormValues) => {
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
      bornAfter: null,
      bornBefore: null,
      createdAfter: null,
      createdBefore: null,
      email: null,
      gender: null,
      limit: null,
      maxUserLevel: null,
      minUserLevel: null,
      page: null,
      search: null,
      sortBy: null,
      sortOrder: null,
      userLevel: null,
      username: null,
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
        <ProForm<FilterUsersFormValues>
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
            placeholder='Search users'
            style={{ width: '100%' }}
          />

          <ProFormText
            name='username'
            label='Username'
            placeholder='Enter username'
            style={{ width: '100%' }}
          />

          <ProFormText
            name='email'
            label='Email'
            placeholder='Enter email'
            style={{ width: '100%' }}
          />

          <ProFormSelect
            name='gender'
            label='Gender'
            placeholder='Select gender'
            style={{ width: '100%' }}
            options={[
              { label: 'Male', value: 'M' },
              { label: 'Female', value: 'F' },
              { label: 'Other', value: 'OTHER' },
            ]}
          />

          {/* User Level Filters */}
          <ProFormDigit
            name='userLevel'
            label='User Level'
            placeholder='Exact level'
            min={1}
            max={99}
            style={{ width: '100%' }}
          />

          <ProFormDigit
            name='minUserLevel'
            label='Min Level'
            placeholder='Minimum level'
            min={1}
            max={99}
            style={{ width: '100%' }}
          />

          <ProFormDigit
            name='maxUserLevel'
            label='Max Level'
            placeholder='Maximum level'
            min={1}
            max={99}
            style={{ width: '100%' }}
          />

          {/* Date Filters */}
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
              { label: 'Username', value: 'username' },
              { label: 'Email', value: 'email' },
              { label: 'User Level', value: 'userLevel' },
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
        onChange={key => setActiveKey(key)}
        collapsible='icon'
        expandIcon={panelProps => (
          <div className='flex gap-2'>
            <ArrowDownOutlined
              className={`transition-transform duration-300 ease-in-out ${panelProps.isActive ? '' : '-rotate-90'}`}
            />
            Filter Users
          </div>
        )}
      />
    </div>
  );
};

export default FilterUsersForm;
