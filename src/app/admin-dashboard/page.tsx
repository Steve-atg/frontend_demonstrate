import { usersAPI } from '@/api/client';
import UserTable from '@/components/admin-dashboard/UserTable';
import FilterUsersForm from '@/components/admin-dashboard/FilterUsersForm';
import { UserResponseDto } from '@/api/generated/data-contracts';
import { Alert } from 'antd';
import { Suspense } from 'react';

interface FilterUsersFormValues {
  search?: string;
  username?: string;
  email?: string;
  gender?: 'M' | 'F' | 'OTHER';
  userLevel?: number;
  minUserLevel?: number;
  maxUserLevel?: number;
  bornAfter?: string;
  bornBefore?: string;
  createdAfter?: string;
  createdBefore?: string;
  sortBy?: 'username' | 'email' | 'userLevel' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

interface AdminPageProps {
  searchParams: {
    search?: string;
    username?: string;
    email?: string;
    gender?: 'M' | 'F' | 'OTHER';
    userLevel?: string;
    minUserLevel?: string;
    maxUserLevel?: string;
    bornAfter?: string;
    bornBefore?: string;
    createdAfter?: string;
    createdBefore?: string;
    sortBy?: 'username' | 'email' | 'userLevel' | 'createdAt' | 'updatedAt';
    sortOrder?: 'asc' | 'desc';
    page?: string;
    limit?: string;
  };
}

// Loading component for Suspense
function LoadingComponent() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
        <p className='mt-4 text-gray-600 font-medium'>Loading users...</p>
        <p className='mt-2 text-gray-500 text-sm'>Gathering user data...</p>
      </div>
    </div>
  );
}

// Error component
function ErrorComponent({
  error,
  filterInitialValues,
}: {
  error: string;
  filterInitialValues: FilterUsersFormValues;
}) {
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

async function AdminPage({ searchParams }: AdminPageProps) {
  // Extract filter-related search params from server-side searchParams
  const search = searchParams.search || undefined;
  const username = searchParams.username || undefined;
  const email = searchParams.email || undefined;
  const gender = searchParams.gender;
  const userLevel = searchParams.userLevel
    ? Number(searchParams.userLevel)
    : undefined;
  const minUserLevel = searchParams.minUserLevel
    ? Number(searchParams.minUserLevel)
    : undefined;
  const maxUserLevel = searchParams.maxUserLevel
    ? Number(searchParams.maxUserLevel)
    : undefined;
  const bornAfter = searchParams.bornAfter || undefined;
  const bornBefore = searchParams.bornBefore || undefined;
  const createdAfter = searchParams.createdAfter || undefined;
  const createdBefore = searchParams.createdBefore || undefined;
  const sortBy = searchParams.sortBy;
  const sortOrder = searchParams.sortOrder;
  const page = searchParams.page ? Number(searchParams.page) : undefined;
  const limit = searchParams.limit ? Number(searchParams.limit) : undefined;

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

  // Server-side data fetching
  let userData: UserResponseDto[] = [];
  let error: string | null = null;

  try {
    const response = await usersAPI.usersControllerFindAll({
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
      page,
      limit,
    });
    userData = response.data.data || [];
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load users';
    console.error('Error fetching users:', err);
  }

  if (error) {
    return (
      <ErrorComponent error={error} filterInitialValues={filterInitialValues} />
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
}

// Wrap the component with Suspense to handle loading states
export default function AdminPageWithSuspense(props: AdminPageProps) {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <AdminPage {...props} />
    </Suspense>
  );
}
