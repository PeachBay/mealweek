import { Title, Text, Box, TextInput, SimpleGrid, Group, Button, Avatar } from '@mantine/core';
import { useForm } from '@mantine/form';

// Component & Assets

// Lib
import { useUserContext } from '../../lib/UserContext';

export function UserSettingsForm() {
  const user = useUserContext();

  const form = useForm({
    initialValues: {
      name: '',
      username: '',
      email: '',
    },
    validateInputOnChange: true,
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      username: (value) => (value.length < 2 ? 'Username must have at least 2 letters' : null),
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
        <Title order={3}>Account</Title>
        <Text c="dimmed" fz="sm">
          Manage how information is displayed on your account.
        </Text>
      </Box>
    </>
  );
}
