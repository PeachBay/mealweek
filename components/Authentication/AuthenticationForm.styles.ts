import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  logo: {
    display: 'block',
    position: 'absolute',
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    zIndex: 5,

    [theme.fn.smallerThan('md')]: {
      padding: 50,
    },
  },

  illustration: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));
