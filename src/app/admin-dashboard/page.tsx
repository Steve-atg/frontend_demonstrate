'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usersAPI } from '@/api/client';
import UserTable from '@/components/admin-dashboard/UserTable';
import FilterUsersForm from '@/components/admin-dashboard/FilterUsersForm';
import { UserResponseDto } from '@/api/generated/data-contracts';
import { Spin, Alert } from 'antd';

const AdminPage = () => {
  const [userData, setUserData] = useState<UserResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  // Extract only filter-related search params (exclude page and limit)
  const search = searchParams.get('search') || undefined;
  const username = searchParams.get('username') || undefined;
  const email = searchParams.get('email') || undefined;
  const gender = searchParams.get('gender') as 'M' | 'F' | 'OTHER' | undefined;
  const userLevel = searchParams.get('userLevel')
    ? Number(searchParams.get('userLevel'))
    : undefined;
  const minUserLevel = searchParams.get('minUserLevel')
    ? Number(searchParams.get('minUserLevel'))
    : undefined;
  const maxUserLevel = searchParams.get('maxUserLevel')
    ? Number(searchParams.get('maxUserLevel'))
    : undefined;
  const bornAfter = searchParams.get('bornAfter') || undefined;
  const bornBefore = searchParams.get('bornBefore') || undefined;
  const createdAfter = searchParams.get('createdAfter') || undefined;
  const createdBefore = searchParams.get('createdBefore') || undefined;
  const sortBy = searchParams.get('sortBy') as
    | 'username'
    | 'email'
    | 'userLevel'
    | 'createdAt'
    | 'updatedAt'
    | undefined;
  const sortOrder = searchParams.get('sortOrder') as 'desc' | 'asc' | undefined;

  // Create filter initial values object
  const filterInitialValues = {
    search,
    username,
    email,
    gender,
    userLevel,
    minUserLevel,
    maxUserLevel,
    bornAfter,
    bornBefore,
    createdAfter,
    createdBefore,
    sortBy,
    sortOrder,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response =
          await usersAPI.usersControllerFindAll(filterInitialValues);
        setUserData(response.data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center'>
        <div className='text-center'>
          <Spin size='large' tip='Loading users...' />
          <p className='mt-4 text-gray-600 font-medium'>
            Gathering user data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6'>
        <div className='max-w-4xl mx-auto pt-20'>
          <Alert
            message='Error Loading Users'
            description={error}
            type='error'
            showIcon
            className='mb-6 rounded-2xl border-0 shadow-lg'
          />
          <FilterUsersForm initialValues={filterInitialValues} />
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20'>
      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-blue-600/10 rounded-full blur-3xl'></div>
      </div>

      <div className='relative z-10'>
        <FilterUsersForm initialValues={filterInitialValues} />
        <UserTable tableData={userData} />
      </div>
    </div>
  );
};

export default AdminPage;
