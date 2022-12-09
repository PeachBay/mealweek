import {
  Paper,
  TextInput,
  Button,
  Title,
  Text,
  Anchor,
  Group,
  Divider,
  Flex,
  Box,
  Container,
  List,
  ThemeIcon,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { IconCheck } from '@tabler/icons';
import NextImage from 'next/image';

// Component & Assets
import useStyles from './SignUpForm.styles';
import { PasswordStrength } from './PasswordStrength';
import { TwitterButton } from '../SocialButtons/SocialButtons';
import { GoogleIcon } from '../SocialButtons/GoogleIcon';
import Logo from '../../public/favicon.svg';

// Utils
import { signInWithGoogle, signUpWithEmailAndPassword } from '../../lib/firebase';

// Page
export function SignUpForm() {
  const { classes } = useStyles();
  const [name, setName] = useInputState('');
  const [username, setUserName] = useInputState('');
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
            <Title order={2} className={classes.titleForm} align="center" mt="md" mb={50}>
              Join MealWeek
            </Title>

            <TextInput
              label="Name"
              value={name}
              onChange={setName}
              placeholder="Izuku Midoriya"
              required
              mb={5}
            />
            <TextInput
              label="Username"
              value={username}
              onChange={setUserName}
              placeholder="Deku"
              required
              mb={5}
            />
            <TextInput
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="deku@ua.edu"
              required
              mb={5}
            />
            <PasswordStrength value={password} setValue={setPassword} />

            <Button
              fullWidth
              mt="xl"
              size="md"
              onClick={() => signUpWithEmailAndPassword(name, username, email, password)}
            >
              Signup
            </Button>

            <Divider label="Or signup with your social account" labelPosition="center" my="lg" />

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

            <Text align="center" mt="md">
              Already have an account?{' '}
              <Anchor<'a'> href="/login" weight={700}>
                Login
              </Anchor>
            </Text>
          </Flex>
        </Box>
      </Paper>
      <Box className={classes.signupFeature} w="100%" mih="100vh" p={80}>
        <Container size="xl" h="100%">
          <Flex h="100%" justify="center" direction="column">
            <Title className={classes.title}>
              Add your <span className={classes.highlight}>recipes</span> and let us
              <br />
              <span className={classes.highlight}>plan</span> your meal for you!
            </Title>
            <Text color="dimmed" mt="md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat tortor{' '}
              <br />
              non justo luctus consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={12} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>{"It's free!"}</b> – no trial, no subscription :)
              </List.Item>
              <List.Item>
                <b>Keep your recipes</b> – all recipes in one page, easy to share
              </List.Item>
              <List.Item>
                <b>We plan for you</b> – no more {'"What do we eat today?"'}
              </List.Item>
            </List>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}
