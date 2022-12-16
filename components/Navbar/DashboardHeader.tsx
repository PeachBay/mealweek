import { Group, Header, Burger, useMantineTheme } from '@mantine/core';

// Lib
import NavbarLogo from './NavbarLogo';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

export default function DashboardHeader({ opened, setOpened }) {
  const theme = useMantineTheme();
  const handleClick = () => {
    setOpened((o) => !o);
  };

  return (
    <Header height={{ base: 65 }} p="xs">
      <Group position="apart">
        <Burger
          opened={opened}
          onClick={handleClick}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
        />

        <NavbarLogo size={25} logoText="Meal Week" version={false} />

        <ColorSchemeToggle />
      </Group>
    </Header>
  );
}
