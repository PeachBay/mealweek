// SSR
import { withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth';

// Layout
import type { ReactElement } from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import type { NextPageWithLayout } from '../_app';

// Components
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { EmptyState } from '../../components/EmptyState/EmptyState';

// Page
const SettingsPage: NextPageWithLayout = () => (
  <PageHeader title="Settings">
    <EmptyState
      title="No content yet"
      description="We are currently building the feature, it's coming soon!"
    />
  </PageHeader>
);

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(SettingsPage);
