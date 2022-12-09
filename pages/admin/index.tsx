// SSR
import { useAuthUser, withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth';

// Layout
import type { ReactElement } from 'react';
import { Grid, SimpleGrid, Skeleton, useMantineTheme, Box } from '@mantine/core';
import type { NextPageWithLayout } from '../_app';
import DashboardLayout from '../../components/Layout/DashboardLayout';

// Context
import { useUserContext } from '../../lib/UserContext';

// Page
const AdminFeedPage: NextPageWithLayout = () => {
  const AuthUser = useAuthUser();
  const user = useUserContext();

  const PRIMARY_COL_HEIGHT = 300;
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

  return (
    <>
      <h1>Admin feed page</h1>

      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
        <Grid gutter="md">
          <Grid.Col>
            <Box>{AuthUser.id}</Box>
            <Box>{AuthUser.displayName}</Box>
            <Box>{user.username}</Box>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </>
  );
};

AdminFeedPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(AdminFeedPage);
