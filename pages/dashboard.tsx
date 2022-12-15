// SSR
import { withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth';

// Layout
import type { ReactElement } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import type { NextPageWithLayout } from './_app';

// Page
const DashboardPage: NextPageWithLayout = () => (
  <>
    <h1>Dashboard Page</h1>
  </>
);

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
})(DashboardPage);
