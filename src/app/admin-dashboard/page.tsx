import UserTable from '@/components/admin-dashboard/UserTable';
import { usersAPI } from '@/api/client';
import FilterUsersForm from '@/components/admin-dashboard/FilterUsersForm';

interface AdminPageProps {
  searchParams: Record<string, string>;
}
const AdminPage = async ({ searchParams }: AdminPageProps) => {
  // Extract only filter-related search params (exclude page and limit)
  const {
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
  } = searchParams;

  // Create filter initial values object
  const filterInitialValues = {
    search,
    username,
    email,
    gender: gender as 'M' | 'F' | 'OTHER' | undefined,
    userLevel: userLevel ? Number(userLevel) : undefined,
    minUserLevel: minUserLevel ? Number(minUserLevel) : undefined,
    maxUserLevel: maxUserLevel ? Number(maxUserLevel) : undefined,
    bornAfter,
    bornBefore,
    createdAfter,
    createdBefore,
    sortBy: sortBy as
      | 'username'
      | 'email'
      | 'userLevel'
      | 'createdAt'
      | 'updatedAt'
      | undefined,
    sortOrder: sortOrder as 'desc' | 'asc' | undefined,
  };

  try {
    const response = await usersAPI.usersControllerFindAll(filterInitialValues);
    const userData = response.data.data;

    return (
      <div className='bg-white text-black h-full'>
        <FilterUsersForm initialValues={filterInitialValues} />
        <UserTable tableData={userData ?? []} />
      </div>
    );
  } catch (error) {
    return (
      <div className='bg-white text-black h-full'>
        <p>Error loading users.</p>
        <p>{`${error}`}</p>
      </div>
    );
  }
};

export default AdminPage;
