import { useEffect, useState } from 'react';
import {
  Title,
  Text,
  Box,
  TextInput,
  SimpleGrid,
  Group,
  Button,
  Avatar,
  FileInput,
} from '@mantine/core';
import { IconUpload } from '@tabler/icons';
import { useForm } from '@mantine/form';

// Lib
import { ref, uploadBytes } from 'firebase/storage';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { useUserContext } from '../../lib/UserContext';
import { storage } from '../../lib/firebase';

// Component & Assets
import { DeleteAccountModal } from '../ModalContent/DeleteAccountModal';

export function UserSettingsForm() {
  const user = useUserContext();
  const [deleteModal, setDeleteModal] = useState(false);

  // Upload file
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const storageRef = ref(storage, 'avatars');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const upload = async () => {
    if (selectedFile) {
      const result = await uploadFile(storageRef, selectedFile, {
        contentType: 'image/jpeg',
      });
      alert(`Result: ${JSON.stringify(result)}`);
    }
  };

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
    },
    validateInputOnChange: true,
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  useEffect(() => {
    if (user.user) {
      form.setValues({
        name: user.user.displayName,
        email: user.user.email,
      });
    }
  }, [user]);

  const handleSubmit = () => {
    upload();
    console.log('form submited');
  };

  return (
    <>
      <Box>
        <Title order={3}>Profile</Title>
        <Text c="dimmed" fz="sm">
          This information will be displayed publicly so be careful what you share.
        </Text>
      </Box>

      <Box mt="lg" mb={50}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
                {!selectedFile && <Avatar src={user.user?.photoURL} size={30} radius={30} />}
                {selectedFile && (
                  <Avatar src={URL.createObjectURL(selectedFile)} size={30} radius={30} />
                )}

                <FileInput
                  placeholder="Change"
                  icon={<IconUpload size={14} />}
                  accept="image/png,image/jpeg"
                  value={selectedFile}
                  onChange={setSelectedFile}
                  size="xs"
                />

                <Button variant="subtle" color="red" size="xs">
                  Remove photo from database
                </Button>
              </Group>
            </Box>
          </SimpleGrid>
          <Group position="right">
            <Button type="submit" color="teal" mt={20}>
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
        <Button variant="subtle" color="teal" size="xs" disabled>
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
        <DeleteAccountModal setState={deleteModal} onSetState={() => setDeleteModal(false)} />
        <Button variant="subtle" color="red" size="xs" onClick={() => setDeleteModal(true)}>
          Delete my account
        </Button>
      </Box>
    </>
  );
}
