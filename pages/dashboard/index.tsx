// Layout
import type { ReactElement } from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import type { NextPageWithLayout } from '../_app';

// Components
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { EmptyState } from '../../components/EmptyState/EmptyState';

// Page
const DashboardPage: NextPageWithLayout = () => (
  <PageHeader title="Your dashboard">
    <EmptyState
      title="No content yet"
      description="We are currently building the feature, it's coming soon!"
    />
  </PageHeader>
);

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardPage;
