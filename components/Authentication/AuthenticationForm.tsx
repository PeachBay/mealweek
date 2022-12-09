import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
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
import { useInputState } from '@mantine/hooks';
import NextImage from 'next/image';
import { TwitterButton } from '../SocialButtons/SocialButtons';
import { GoogleIcon } from '../SocialButtons/GoogleIcon';
import useStyles from './AuthenticationForm.styles';
import Logo from '../../public/favicon.svg';
import { signInWithGoogle, signInEmailAndPassword } from '../../lib/firebase';

export function AuthenticationForm() {
  const { classes } = useStyles();
  const [email, setEmail] = useInputState('');
  const [password, setPassword] = useInputState('');

  return (
    <Flex h="100%" mih="100%">
      <Paper className={classes.form} w="100%" maw={600} mih="100vh" radius={0} p={80}>
        <Box h="100%">
          <Box w={30} component="a" href="/" className={classes.logo}>
            <NextImage src={Logo} />
          </Box>
          <Flex h="100%" justify="center" direction="column">
            <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
              Welcome back to MealWeek!
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
              <TwitterButton radius="xl">Twitter</TwitterButton>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg" />

            <TextInput
              label="Email address"
              value={email}
              onChange={setEmail}
              placeholder="deku@ua.edu"
              size="md"
            />
            <PasswordInput
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="Your password"
              mt="md"
              size="md"
            />
            <Checkbox label="Keep me logged in" mt="xl" size="md" />
            <Button
              fullWidth
              mt="xl"
              size="md"
              onClick={() => signInEmailAndPassword(email, password)}
            >
              Login
            </Button>

            <Text align="center" mt="md">
              Don&apos;t have an account?{' '}
              <Anchor<'a'> href="/signup" weight={700}>
                Signup
              </Anchor>
            </Text>

            <Text align="center" mt="md">
              Forgot your password?{' '}
              <Anchor<'a'> href="/resetpassword" weight={700}>
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
