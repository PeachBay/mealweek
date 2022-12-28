import {
  Modal,
  Flex,
  Group,
  Text,
  Title,
  Button,
  ThemeIcon,
  Box,
  useMantineTheme,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons';

// Lib
import { deleteAccount } from '../../lib/firebase';

// Props
interface ModalStateProps {
  setState: boolean;
  onSetState: () => void;
}

export function DeleteAccountModal({ setState, onSetState }: ModalStateProps) {
  const theme = useMantineTheme();

  return (
    <Modal
      centered
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={5}
      opened={setState}
      onClose={onSetState}
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
        <Button variant="default" color="gray" onClick={onSetState}>
          Cancel
        </Button>

        <Button color="red" onClick={deleteAccount}>
          Delete my account
        </Button>
      </Group>
    </Modal>
  );
}
