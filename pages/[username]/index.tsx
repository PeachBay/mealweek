import type { ReactElement } from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';

export default function UserProfilePage() {
  return (
    <>
      <h1>User Profile page</h1>
    </>
  );
}

UserProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
