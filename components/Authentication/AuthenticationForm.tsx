import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Group,
  Divider,
  Flex,
  Box,
  Image,
} from '@mantine/core';
import { useForm } from '@mantine/form';

// Component & Assets
import useStyles from './AuthenticationForm.styles';
import { GoogleIcon } from '../SocialButtons/GoogleIcon';
import NavbarLogo from '../Navbar/NavbarLogo';

// Lib
import { signInWithGoogle, signInEmailAndPassword } from '../../lib/firebase';

export function AuthenticationForm() {
  const { classes } = useStyles();

  // Form validation
  const form = useForm({
    initialValues: { email: '', password: '' },
    validateInputOnChange: true,

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must have at least 6 letters' : null),
    },
  });

  return (
    <Flex h="100%" mih="100%">
      <Paper className={classes.form} w="100%" maw={600} mih="100vh" radius={0} p={80}>
        <Box h="100%">
          <NavbarLogo size={30} logoText="Meal Week" version />
          <Flex h="100%" justify="center" direction="column">
            <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
              Welcome back!
            </Title>

            <Group grow mb="md" mt="md">
              <Button
                leftIcon={<GoogleIcon />}
                variant="default"
                color="gray"
                radius="xl"
                onClick={signInWithGoogle}
              >
                Google
              </Button>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg" />

            <form>
              <TextInput
                label="Email address"
                placeholder="deku@ua.edu"
                size="md"
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                mt="md"
                size="md"
                {...form.getInputProps('password')}
              />
              <Button
                fullWidth
                mt="xl"
                size="md"
                disabled={!form.isValid()}
                onClick={() => signInEmailAndPassword(form.values.email, form.values.password)}
              >
                Login
              </Button>
            </form>

            <Text align="center" mt="md">
              Don&apos;t have an account?{' '}
              <Anchor<'a'> href="/signup" weight={700}>
                Signup
              </Anchor>
            </Text>

            <Text align="center" mt="md">
              Forgot your password?{' '}
              <Anchor<'a'> href="/reset-password" weight={700}>
                Reset it
              </Anchor>
            </Text>
          </Flex>
        </Box>
      </Paper>
      <Box className={classes.illustration} w="100%">
        <Image height="100vh" src="/login.jpg" alt="Photo of a tablet in the kitchen" />
      </Box>
    </Flex>
  );
}
