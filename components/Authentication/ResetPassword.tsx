import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowLeft } from '@tabler/icons';

// Lib
import { resetPassword } from '../../lib/firebase';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

export function ResetPassword() {
  const { classes } = useStyles();

  // Form validation
  const form = useForm({
    initialValues: { email: '', password: '' },
    validateInputOnChange: true,
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Container size={460} my={100}>
      <Title className={classes.title} align="center">
        Forgot your password?
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form>
          <TextInput
            label="Your email"
            placeholder="deku@ua.edu"
            required
            {...form.getInputProps('email')}
          />
        </form>
        <Group position="apart" mt="lg" className={classes.controls}>
          <Anchor href="/login" color="dimmed" size="sm" className={classes.control}>
            <Center inline>
              <IconArrowLeft size={12} stroke={1.5} />
              <Box ml={5}>Back to login page</Box>
            </Center>
          </Anchor>
          <Button
            className={classes.control}
            disabled={!form.isValid()}
            onClick={() => resetPassword(form.values.email)}
          >
            Reset password
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
