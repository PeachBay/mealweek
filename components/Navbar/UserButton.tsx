import { useState } from 'react';
import {
  Flex,
  Avatar,
  Group,
  Text,
  Menu,
  Modal,
  Title,
  Button,
  ThemeIcon,
  Box,
  createStyles,
  UnstyledButton,
  UnstyledButtonProps,
} from '@mantine/core';
import {
  IconLogout,
  IconSettings,
  IconUser,
  IconTrash,
  IconChevronRight,
  IconAlertTriangle,
} from '@tabler/icons';

// Lib
import { signOutHandle, deleteAccount } from '../../lib/firebase';

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
  const [modalToDelete, setModalToDelete] = useState(false);

  return (
    <div>
      <Modal
        centered
        opened={modalToDelete}
        onClose={() => setModalToDelete(false)}
        styles={{
          header: { position: 'absolute', top: '20px', right: '20px' },
        }}
      >
        <Flex gap="md">
          <ThemeIcon radius="xl" size="xl" color="red">
            <IconAlertTriangle />
          </ThemeIcon>

          <Box>
            <Title order={3} mb={10}>
              Delete my account
            </Title>

            <Text mb={15} c="dimmed" size="sm">
              Are you sure you want to delete your account? All of your data will be permanently
              removed. This action cannot be undone.
            </Text>
          </Box>
        </Flex>

        <Group position="right">
          <Button variant="outline" color="gray" onClick={() => setModalToDelete(false)}>
            Cancel
          </Button>

          <Button color="red" onClick={deleteAccount}>
            Delete
          </Button>
        </Group>
      </Modal>

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
          <Menu.Item icon={<IconSettings size={14} color={theme.colors.blue[6]} stroke={1.5} />}>
            Settings
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item icon={<IconLogout size={14} stroke={1.5} />} onClick={() => signOutHandle()}>
            Logout
          </Menu.Item>
          <Menu.Item
            color="red"
            icon={<IconTrash size={14} stroke={1.5} />}
            onClick={() => setModalToDelete(true)}
          >
            Delete account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
