import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import every from 'lodash.every';
import {
  Paper,
  TextInput,
  PasswordInput,
  Progress,
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
  Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconX, IconCheck, IconInfoCircle } from '@tabler/icons';

// Lib
import { doc, getDoc } from 'firebase/firestore';
import { db, signInWithGoogle, signUpWithEmailAndPassword } from '../../lib/firebase';

// Component & Assets
import useStyles from './SignUpForm.styles';
import { GoogleIcon } from '../SocialButtons/GoogleIcon';
import NavbarLogo from '../Navbar/NavbarLogo';
import { PasswordRequirement, requirements, getStrength } from './PasswordStrength';

// Page
export function SignUpForm() {
  const { classes } = useStyles();
  const [usernameValid, setUsernameValid] = useState(false);
  const [showUsernameText, setShowUsernameText] = useState(false);
  const [passwordMeets, setPasswordMeets] = useState(false);

  // Form validation
  const form = useForm({
    initialValues: { name: '', username: '', email: '', password: '' },
    validateInputOnChange: true,

    // functions will be used to validate values at corresponding key
    validate: (values) => ({
      name: values.name.length < 2 ? 'Name must have at least 2 letters' : null,
      username:
        values.username.length < 3
          ? 'Username must have at least 2 letters'
          : usernameValid
          ? 'Your username is not available'
          : null,
      email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
      password: passwordMeets ? null : 'Your password is too weak',
    }),
  });

  // Password strength
  const strength = getStrength(form.values.password);
  // passwords requirements
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));

  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: '0ms' } }}
        value={
          form.values.password.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length <= 2) {
        setShowUsernameText(false);
      }

      if (username.length >= 3) {
        const usernameDoc = doc(db, 'usernames', username);
        const docSnap = await getDoc(usernameDoc);

        if (docSnap.exists()) {
          setUsernameValid(true);
          setShowUsernameText(true);
        } else {
          setUsernameValid(false);
          setShowUsernameText(true);
        }
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsername(form.values.username);
  }, [form.values.username]);

  useEffect(() => {
    setPasswordMeets(every(checks, ['props.meets', true]));
  }, [form.values.password]);

  return (
    <Flex h="100%" mih="100%">
      <Paper className={classes.form} w="100%" maw={600} mih="100vh" radius={0} p={80}>
        <Box h="100%">
          <Box className={classes.logo}>
            <NavbarLogo size={12} logoText="Meal Week" />
          </Box>
          <Flex h="100%" justify="center" direction="column">
            <Title order={2} className={classes.titleForm} align="center" mt="md" mb={50}>
              Join MealWeek
            </Title>

            <form>
              <TextInput
                label="Name"
                placeholder="Izuku Midoriya"
                required
                mb={5}
                {...form.getInputProps('name')}
              />
              <TextInput
                label="Username"
                placeholder="Deku"
                required
                mb={5}
                value={form.values.username}
                onChange={(event) => form.setFieldValue('username', event.target.value)}
              />
              {showUsernameText ? (
                usernameValid ? (
                  <Text c="red" size="sm">
                    <Center inline>
                      <IconX size={14} stroke={1.5} />
                      <Box ml={7}>Username is taken!</Box>
                    </Center>
                  </Text>
                ) : (
                  <Text c="teal" size="sm">
                    <Center inline>
                      <IconCheck size={14} stroke={1.5} />
                      <Box ml={7}>Username is available!</Box>
                    </Center>
                  </Text>
                )
              ) : (
                <Text c="gray.5" size="sm">
                  <Center inline>
                    <IconInfoCircle size={14} stroke={1.5} />
                    <Box ml={7}>Username must be unique</Box>
                  </Center>
                </Text>
              )}

              <TextInput
                label="Email"
                placeholder="deku@ua.edu"
                required
                mb={5}
                {...form.getInputProps('email')}
              />
              <PasswordInput
                placeholder="Your password"
                label="Password"
                required
                {...form.getInputProps('password')}
              />
              <Group spacing={5} grow mt="xs" mb="md">
                {bars}
              </Group>

              <PasswordRequirement
                label="Has at least 6 characters"
                meets={form.values.password.length > 5}
              />
              {checks}

              <Button
                fullWidth
                mt="xl"
                size="md"
                disabled={!form.isValid()}
                onClick={() =>
                  signUpWithEmailAndPassword(
                    form.values.name,
                    form.values.username,
                    form.values.email,
                    form.values.password
                  )
                }
              >
                Signup
              </Button>
            </form>

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
                <b>It&apos;s free!</b> – no trial, no subscription :)
              </List.Item>
              <List.Item>
                <b>Keep your recipes</b> – all recipes in one page, easy to share
              </List.Item>
              <List.Item>
                <b>We plan for you</b> – no more &quot;What do we eat today?&quot;
              </List.Item>
            </List>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}
