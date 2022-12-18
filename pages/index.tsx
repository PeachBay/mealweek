// SSR
import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';

// Layout
import type { ReactElement } from 'react';
import DefaultLayout from '../components/Layout/DefaultLayout';
import type { NextPageWithLayout } from './_app';

// Components
import { EmptyState } from '../components/EmptyState/EmptyState';

// Page
const HomePage: NextPageWithLayout = () => (
  <>
    <EmptyState
      title="This page is coming soon."
      description="We are currently building the landing page. Coming soon! Until then, you can register or login to the dashboard."
    />
  </>
);

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getServerSideProps = withAuthUserTokenSSR()();
export default withAuthUser()(HomePage);
