// UI Core
import { Tabs, Paper } from '@mantine/core';
import { IconUsers, IconKey } from '@tabler/icons';

// SSR
import { withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth';

// Layout
import type { ReactElement } from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import type { NextPageWithLayout } from '../_app';

// Components
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { UserSettingsForm } from '../../components/UserSettingsForm/UserSettingsForm';

// Page
const SettingsPage: NextPageWithLayout = () => (
  <PageHeader title="Settings">
    <Tabs color="teal" radius="md" defaultValue="general">
      <Tabs.List>
        <Tabs.Tab value="general" icon={<IconUsers size={14} />}>
          General
        </Tabs.Tab>
        <Tabs.Tab value="password" icon={<IconKey size={14} />}>
          Password
        </Tabs.Tab>
      </Tabs.List>
      <Paper shadow="xs" p="md" mt="xl">
        <Tabs.Panel value="general">
          <UserSettingsForm />
        </Tabs.Panel>

        <Tabs.Panel value="password">Password tab content</Tabs.Panel>
      </Paper>
    </Tabs>
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
