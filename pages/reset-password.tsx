// Core UI
import { Container } from '@mantine/core';

// Layout
import type { ReactElement } from 'react';
import DefaultLayout from '../components/Layout/DefaultLayout';
import type { NextPageWithLayout } from './_app';

// Components
import { ResetPassword } from '../components/Authentication/ResetPassword';

// Page
const ResetPasswordPage: NextPageWithLayout = () => (
  <Container mih="400px">
    <ResetPassword />
  </Container>
);

ResetPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default ResetPasswordPage;
