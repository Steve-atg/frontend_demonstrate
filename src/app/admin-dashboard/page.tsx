import UserTable from '@/components/admin-dashboard/UserTable';
import { usersAPI } from '@/api/client';
import { UserResponseDto } from '@/api/generated/data-contracts';

const AdminPage: React.FC = async () => {
  // Server-side API call - now returns clean data without axios details
  try {
    const response = await usersAPI.usersControllerFindAll();
    const userData = response.data.data; // Clean data without axios details

    console.log('Clean user data:', userData);

    return (
      <div className='bg-white text-black h-full'>
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
