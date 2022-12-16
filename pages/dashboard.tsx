// SSR
import { withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth';

// Core
import { Container } from '@mantine/core';

// Layout
import type { ReactElement } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import type { NextPageWithLayout } from './_app';

// Components
import { PageHeader } from '../components/PageHeader/PageHeader';

// Page
const DashboardPage: NextPageWithLayout = () => (
  <PageHeader title="Dashboard" description="Subtitle dashboard testing">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ex eos ratione atque consequatur
    sunt aliquam non impedit voluptatibus. Cupiditate quis fugiat quasi quia, officia accusantium
    sit. Facere, nesciunt aliquam!
  </PageHeader>
);

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(DashboardPage);
