import UserTable from '@/components/admin-dashboard/UserTable';

const AdminPage: React.FC = async () => {
  return (
    <div className='bg-white text-black'>
      <UserTable />
    </div>
  );
};

export default AdminPage;
