'use client';
import {
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
  ProFormDigit,
} from '@ant-design/pro-components';
import { Button, Space, Collapse } from 'antd';
import { useUpdateMultipleSearchParams } from '../../hooks/useMultipleSearchParams';
import {
  SearchOutlined,
  ClearOutlined,
  FilterOutlined,
} from '@ant-design/icons';

interface FilterUsersFromValues {
  bornAfter?: string;
  bornBefore?: string;
  createdAfter?: string;
  createdBefore?: string;
  email?: string;
  gender?: 'M' | 'F' | 'OTHER';
  limit?: number;
  maxUserLevel?: number;
  minUserLevel?: number;
  page?: number;
  search?: string;
  sortBy?: 'username' | 'email' | 'userLevel' | 'createdAt' | 'updatedAt';
  sortOrder?: 'desc' | 'asc';
  userLevel?: number;
  username?: string;
}

interface FilterUsersFormProps {
  initialValues?: FilterUsersFromValues;
}

const FilterUsersFrom: React.FC<FilterUsersFormProps> = ({ initialValues }) => {
  const updateMultipleSearchParams = useUpdateMultipleSearchParams();
  const handleFinish = async (values: FilterUsersFromValues) => {
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

  const collapseItems = [
    {
      key: '1',
      label: (
        <span>
          <FilterOutlined /> Filter Users
        </span>
      ),
      children: (
        <ProForm<FilterUsersFromValues>
          onFinish={handleFinish}
          initialValues={initialValues ?? {}}
          submitter={{
            render: (props, doms) => (
              <Space size='small'>
                <Button
                  type='primary'
                  icon={<SearchOutlined />}
                  onClick={() => props.form?.submit()}
                  size='small'
                >
                  Filter
                </Button>

                <Button
                  icon={<ClearOutlined />}
                  onClick={() => props.form?.resetFields()}
                  size='small'
                >
                  Clear
                </Button>
              </Space>
            ),
          }}
          layout='inline'
          size='small'
          style={{ padding: '12px' }}
        >
          <ProFormText
            name='search'
            label='Search'
            placeholder='Search users'
            width='xs'
          />

          <ProFormText
            name='username'
            label='Username'
            placeholder='Username'
            width='xs'
          />

          <ProFormText
            name='email'
            label='Email'
            placeholder='Email'
            width='xs'
          />

          <ProFormSelect
            name='gender'
            label='Gender'
            placeholder='Gender'
            width='xs'
            options={[
              { label: 'M', value: 'M' },
              { label: 'F', value: 'F' },
              { label: 'Other', value: 'OTHER' },
            ]}
          />

          <ProFormDigit
            name='userLevel'
            label='Level'
            placeholder='Level'
            min={1}
            max={99}
            width='xs'
          />

          <ProFormDigit
            name='minUserLevel'
            label='Min Level'
            placeholder='Min'
            min={1}
            max={99}
            width='xs'
          />

          <ProFormDigit
            name='maxUserLevel'
            label='Max Level'
            placeholder='Max'
            min={1}
            max={99}
            width='xs'
          />

          <ProFormDatePicker
            name='createdAfter'
            label='Created After'
            placeholder='From date'
            width='xs'
          />

          <ProFormDatePicker
            name='createdBefore'
            label='Created Before'
            placeholder='To date'
            width='xs'
          />

          <ProFormSelect
            name='sortBy'
            label='Sort'
            placeholder='Sort by'
            width='xs'
            options={[
              { label: 'Username', value: 'username' },
              { label: 'Email', value: 'email' },
              { label: 'Level', value: 'userLevel' },
              { label: 'Created', value: 'createdAt' },
            ]}
          />

          <ProFormSelect
            name='sortOrder'
            label='Order'
            placeholder='Order'
            width='xs'
            options={[
              { label: 'Asc', value: 'asc' },
              { label: 'Desc', value: 'desc' },
            ]}
          />

          <ProFormDigit
            name='limit'
            label='Limit'
            placeholder='Limit'
            min={1}
            max={100}
            width='xs'
          />
        </ProForm>
      ),
    },
  ];

  return (
    <div className='mb-4'>
      <Collapse items={collapseItems} />
    </div>
  );
};

export default FilterUsersFrom;
