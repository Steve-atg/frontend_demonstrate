import UserTable from '@/components/admin-dashboard/UserTable';
import { usersAPI } from '@/api/client';
import FilterUsersForm from '@/components/admin-dashboard/FilterUsersForm';

interface AdminPageProps {
  searchParams: Record<string, string>;
}
const AdminPage: React.FC<AdminPageProps> = async ({ searchParams }) => {
  const initialValues = { ...searchParams };

  try {
    const response = await usersAPI.usersControllerFindAll();
    const userData = response.data.data;

    return (
      <div className='bg-white text-black h-full'>
        <FilterUsersForm initialValues={initialValues} />
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
