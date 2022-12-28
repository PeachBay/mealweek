import { useState } from 'react';
import { Title, Text, Box, TextInput, SimpleGrid, Group, Button, Avatar } from '@mantine/core';
import { useForm } from '@mantine/form';

// Component & Assets
import { DeleteModal } from '../ModalContent/DeleteModal';

// Lib
import { useUserContext } from '../../lib/UserContext';

export function UserSettingsForm() {
  const user = useUserContext();
  const [deleteModal, setDeleteModal] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      username: '',
      email: '',
    },
    validateInputOnChange: true,
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      username: (value) => (value.length < 3 ? 'Username must have at least 3 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <>
      <Box>
        <Title order={3}>Profile</Title>
        <Text c="dimmed" fz="sm">
          This information will be displayed publicly so be careful what you share.
        </Text>
      </Box>

      <Box mt="lg" mb={50}>
        <form onSubmit={form.onSubmit(() => {})}>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <TextInput
              label="Name"
              placeholder={user.user?.displayName}
              name="name"
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Username"
              placeholder={user.username}
              name="username"
              variant="filled"
              disabled
              {...form.getInputProps('username')}
            />
            <TextInput
              label="Email"
              placeholder={user.user?.email}
              name="Email"
              {...form.getInputProps('email')}
            />
            <Box>
              <Text mb={5} sx={{ fontSize: 14, fontWeight: 500 }}>
                Photo
              </Text>
              <Group>
                <Avatar src={user.user?.photoURL} size={30} radius={30} />
                <Button variant="outline" color="teal" size="xs">
                  Change
                </Button>
                <Button variant="subtle" color="red" size="xs">
                  Remove
                </Button>
              </Group>
            </Box>
          </SimpleGrid>
          <Group position="right">
            <Button color="teal" mt={20}>
              Save change
            </Button>
          </Group>
        </form>
      </Box>

      <Box>
        <Title order={3}>Back up my recipes</Title>
        <Text c="dimmed" fz="sm">
          Get all your recipes into .json file.
        </Text>
      </Box>

      <Box mt="lg" mb={50}>
        <Button variant="subtle" color="teal" size="xs">
          Get my .json data
        </Button>
      </Box>

      <Box>
        <Title order={3}>Delete my account</Title>
        <Text c="dimmed" fz="sm">
          Once you delete your account, you will lose all data associated with it.
        </Text>
      </Box>

      <Box mt="lg" mb={50}>
        <DeleteModal setState={deleteModal} onSetState={() => setDeleteModal(false)} />
        <Button variant="subtle" color="red" size="xs" onClick={() => setDeleteModal(true)}>
          Delete my account
        </Button>
      </Box>
    </>
  );
}
