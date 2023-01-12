import { useUser } from '@supabase/auth-helpers-react';

// Layout
import type { ReactElement } from 'react';
import DefaultLayout from '../components/Layout/DefaultLayout';
import type { NextPageWithLayout } from './_app';

// Components
import { EmptyState } from '../components/EmptyState/EmptyState';

// Page
const HomePage: NextPageWithLayout = () => {
  const user = useUser();

  console.log(user);

  return (
    <>
      <EmptyState
        title="This page is coming soon."
        description="We are currently building the landing page. Coming soon! Until then, you can register or login to the dashboard."
      />
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default HomePage;
