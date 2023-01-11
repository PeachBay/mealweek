// Layout
import type { ReactElement } from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import type { NextPageWithLayout } from '../_app';

// Components
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { EmptyState } from '../../components/EmptyState/EmptyState';

// Page
const UserPage: NextPageWithLayout = () => (
  <PageHeader title="User Page">
    <EmptyState
      title="No content yet"
      description="We are currently building the feature, it's coming soon!"
    />
  </PageHeader>
);

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default UserPage;
