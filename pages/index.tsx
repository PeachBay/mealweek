// SSR
import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';

// Layout
import type { ReactElement } from 'react';
import { Button, Center } from '@mantine/core';
import { IconLogin } from '@tabler/icons';
import DefaultLayout from '../components/Layout/DefaultLayout';
import type { NextPageWithLayout } from './_app';

// Components
import { EmptyState } from '../components/EmptyState/EmptyState';

// Page
const HomePage: NextPageWithLayout = () => (
  <>
    <EmptyState
      title="Landing page is under construction."
      description="We are currently building the landing page. Until then, you can register or login to the dashboard."
    />

    <Center>
      <Button color="teal" component="a" href="/login" leftIcon={<IconLogin size={14} />}>
        Login
      </Button>
    </Center>
  </>
);

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getServerSideProps = withAuthUserTokenSSR()();
export default withAuthUser()(HomePage);
