import { useState } from 'react';
import { AppShell, useMantineTheme, Container } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

// Components
import DashboardNavbar from '../Navbar/DashboardNavbar';
import DashboardHeader from '../Navbar/DashboardHeader';
import { UserContextProvider } from '../../lib/UserContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const matches = useMediaQuery('(max-width: 768px)', true, { getInitialValueInEffect: false });

  return (
    <>
      <UserContextProvider>
        <AppShell
          styles={{
            main: {
              background:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          navbar={<DashboardNavbar hiddenBreakpoint="md" hidden={!opened} />}
          header={matches && <DashboardHeader opened={opened} setOpened={setOpened} />}
        >
          <Container fluid px="md">
            {children}
          </Container>
        </AppShell>
      </UserContextProvider>
    </>
  );
}
