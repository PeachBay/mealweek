import { useState } from 'react';
import { Navbar, NavbarProps, Group, MediaQuery } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconCategory,
  IconSunglasses,
  IconChefHat,
  IconBaguette,
  IconCalendarEvent,
} from '@tabler/icons';

// Lib
import { useUserContext } from '../../lib/UserContext';
import useStyles from './DashboardNavbar.styles';

// Components
import { UserButton } from './UserButton';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import NavbarLogo from './NavbarLogo';

const data = [
  { link: '', label: 'Dashboard', icon: IconCategory },
  { link: '', label: 'Explore', icon: IconSunglasses },
  { link: '', label: 'My recipes', icon: IconChefHat },
  { link: '', label: 'My planner', icon: IconCalendarEvent },
  { link: '', label: 'My groceries', icon: IconBaguette },
];

export default function DashboardNavbar(props: NavbarProps) {
  const { classes, cx } = useStyles();
  const user = useUserContext();
  const [active, setActive] = useState('Dashboard');
  const matches = useMediaQuery('(max-width: 768px)', true, { getInitialValueInEffect: false });

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar {...props} width={{ md: 260 }} p="md">
      <Navbar.Section grow>
        {!matches && (
          <Group className={classes.header} position="apart">
            <NavbarLogo size={30} logoText="Meal Week" version />
            <ColorSchemeToggle />
          </Group>
        )}
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton
          image={user.user?.photoURL}
          name={user.username ? user.username : user.user?.displayName}
          email={user.user?.email}
        />
      </Navbar.Section>
    </Navbar>
  );
}
