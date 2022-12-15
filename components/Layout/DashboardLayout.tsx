import { Grid, Container } from '@mantine/core';
import DashboardNavbar from '../Navbar/DashboardNavbar';
import { UserContextProvider } from '../../lib/UserContext';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <UserContextProvider>
      <Grid gutter={0}>
        <Grid.Col span="content">
          <DashboardNavbar hidden>{children}</DashboardNavbar>
        </Grid.Col>
        <Grid.Col span="auto">
          <Grid gutter={0}>
            <Grid.Col span={12}>
              <Container my="md" fluid px="xl">
                {children}
              </Container>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </UserContextProvider>
  );
}
