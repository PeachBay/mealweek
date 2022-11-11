import { Grid, Container } from '@mantine/core';
import DashboardNavbar from '../Navbar/DashboardNavbar';
import { LightHeader } from '../LightHeader/LightHeader';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = {
    user: {
      name: 'Jane Spoonfighter',
      image:
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
    },
  };

  return (
    <>
      <Grid gutter={0}>
        <Grid.Col span="content">
          <DashboardNavbar hidden>{children}</DashboardNavbar>
        </Grid.Col>
        <Grid.Col span="auto">
          <Grid gutter={0}>
            <Grid.Col span={12}>
              <LightHeader user={user.user}>{children}</LightHeader>
            </Grid.Col>
            <Grid.Col span={12}>
              <Container my="md" fluid px="xl">
                {children}
              </Container>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </>
  );
}
