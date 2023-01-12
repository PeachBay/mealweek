import { useState } from 'react';
import { Navbar, NavbarProps, Group } from '@mantine/core';
import {
  IconCategory,
  IconSunglasses,
  IconChefHat,
  IconBaguette,
  IconCalendarEvent,
} from '@tabler/icons';

// Lib
import { useUserContext } from '../../lib/UserContext';
import { useBreakpoints } from '../../lib/useBreakpoints';
import useStyles from './DashboardNavbar.styles';

// Components
import { UserButton } from './UserButton';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import NavbarLogo from './NavbarLogo';

const data = [
  { link: '/dashboard', label: 'Dashboard', icon: IconCategory },
  { link: '/explore', label: 'Explore', icon: IconSunglasses },
  { link: '/user/recipes', label: 'My recipes', icon: IconChefHat },
  { link: '/user/planner', label: 'My planner', icon: IconCalendarEvent },
  { link: '/user/groceries', label: 'My groceries', icon: IconBaguette },
];

export default function DashboardNavbar(props: NavbarProps) {
  const user = useUserContext();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Dashboard');
  const { matches } = useBreakpoints();

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
    <Navbar {...props} width={{ md: 300 }} p="md">
      <Navbar.Section grow>
        {!matches.max.sm && (
          <Group className={classes.header} position="apart" align="flex-start">
            <NavbarLogo size={30} logoText="Meal Week" version />
            <ColorSchemeToggle mt={2} />
          </Group>
        )}

        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton image={user.avatar} name={user.name} email={user.email} />
      </Navbar.Section>
    </Navbar>
  );
}
