// SSR
import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';

// Layout
import type { ReactElement } from 'react';
import DefaultLayout from '../components/Layout/DefaultLayout';
import type { NextPageWithLayout } from './_app';

// Components
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { HeroBullets } from '../components/HeroBullets/HeroBullets';

// Page
const HomePage: NextPageWithLayout = () => (
  <>
    <Welcome />
    <ColorSchemeToggle />
    <HeroBullets />
  </>
);

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getServerSideProps = withAuthUserTokenSSR()();
export default withAuthUser()(HomePage);
