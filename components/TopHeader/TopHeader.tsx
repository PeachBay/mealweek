import { useState } from 'react';
import {
  Container,
  Flex,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  Drawer,
} from '@mantine/core';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import DashboardNavbar from '../Navbar/DashboardNavbar';
import useStyles from './TopHeader.styles';

// Context
import { useUserContext } from '../../lib/UserContext';

// Lib
import { signOutHandle } from '../../lib/firebase';

interface TopHeaderProps {
  children: React.ReactNode;
}

export function TopHeader({ children }: TopHeaderProps) {
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [opened, setOpened] = useState(false);
  const user = useUserContext();

  return (
    <div className={classes.header}>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        withCloseButton={false}
      >
        <DashboardNavbar>{children}</DashboardNavbar>
      </Drawer>

      <Container fluid px="xl">
        <Flex
          className={classes.headerPosition}
          justify="space-between"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Burger
            opened={opened}
            onClick={() => setOpened(true)}
            className={classes.burger}
            size="md"
          />
          <Group position="right" spacing="lg">
            <ColorSchemeToggle pb={15} />

            <Menu
              width={260}
              position="bottom-end"
              transition="pop-top-right"
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                  <Group spacing={7}>
                    <Avatar
                      src={user.user?.photoURL}
                      alt={user.user?.displayName}
                      radius="xl"
                      size={40}
                    />
                    <Text
                      className={classes.userName}
                      weight={500}
                      size="sm"
                      sx={{ lineHeight: 1 }}
                      mr={3}
                    >
                      {user.username ? user.username : user.user?.displayName}
                    </Text>
                    <IconChevronDown size={12} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<IconHeart size={14} color={theme.colors.red[6]} stroke={1.5} />}>
                  Liked posts
                </Menu.Item>
                <Menu.Item
                  icon={<IconStar size={14} color={theme.colors.yellow[6]} stroke={1.5} />}
                >
                  Saved posts
                </Menu.Item>
                <Menu.Item
                  icon={<IconMessage size={14} color={theme.colors.blue[6]} stroke={1.5} />}
                >
                  Your comments
                </Menu.Item>

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
                  Account settings
                </Menu.Item>
                <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
                  Change account
                </Menu.Item>
                <Menu.Item
                  icon={<IconLogout size={14} stroke={1.5} />}
                  onClick={() => signOutHandle()}
                >
                  Logout
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item icon={<IconPlayerPause size={14} stroke={1.5} />}>
                  Pause subscription
                </Menu.Item>
                <Menu.Item color="red" icon={<IconTrash size={14} stroke={1.5} />}>
                  Delete account
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Flex>
      </Container>
    </div>
  );
}
