import { useState } from 'react';
import {
  Avatar,
  Group,
  Text,
  Menu,
  createStyles,
  UnstyledButton,
  UnstyledButtonProps,
} from '@mantine/core';
import { IconLogout, IconSettings, IconUser, IconTrash, IconChevronRight } from '@tabler/icons';

// Component & Assets
import { DeleteAccountModal } from '../ModalContent/DeleteAccountModal';

// Lib
import { signOutHandle } from '../../lib/firebase';

// Props
interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

// Styles
const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },
}));

export function UserButton({ image, name, email, icon, ...others }: UserButtonProps) {
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <Menu
        width={260}
        position="right-end"
        transition="pop-top-right"
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
      >
        <Menu.Target>
          <UnstyledButton
            {...others}
            className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
          >
            <Group spacing={7}>
              <Avatar src={image} alt={name} radius="xl" size={40} />

              <div style={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  {name}
                </Text>

                <Text color="dimmed" size="xs">
                  {email}
                </Text>
              </div>
              <IconChevronRight size={12} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item icon={<IconUser size={14} color={theme.colors.yellow[6]} stroke={1.5} />}>
            Profile
          </Menu.Item>
          <Menu.Item
            icon={<IconSettings size={14} color={theme.colors.blue[6]} stroke={1.5} />}
            component="a"
            href="/dashboard/settings"
          >
            Settings
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            color="red"
            icon={<IconLogout size={14} stroke={1.5} />}
            onClick={() => signOutHandle()}
          >
            Logout
          </Menu.Item>
          <Menu.Item
            color="red"
            icon={<IconTrash size={14} stroke={1.5} />}
            onClick={() => setDeleteModal(true)}
          >
            Delete account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <DeleteAccountModal setState={deleteModal} onSetState={() => setDeleteModal(false)} />
    </>
  );
}
