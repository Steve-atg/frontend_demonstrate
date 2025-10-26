interface UserDashboardPageProps {
  searchParams: Record<string, string>;
}

const UserDashboardPage: React.FC<UserDashboardPageProps> = ({
  searchParams,
}) => {
  const { userId } = searchParams;
  return <div>This is user dashboard for user {userId}</div>;
};
export default UserDashboardPage;
