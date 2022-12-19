import { Box, createStyles, Group, Text, Title } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  headerWrapper: {
    marginBottom: theme.spacing.lg,
  },

  title: {
    fontSize: 30,
    lineHeight: '1.55',
    fontWeight: 800,
    marginBottom: 6,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 24,
    },
  },
}));

interface Props {
  title?: string | React.ReactNode;
  description?: string;
  children: React.ReactNode;
}

export const PageHeader = ({ title, description, children }: Props) => {
  const { classes } = useStyles();

  return (
    <section>
      {title && (
        <Box className={classes.headerWrapper}>
          <Group align="center" position="apart" spacing={8}>
            {title && <Title className={classes.title}>{title}</Title>}
          </Group>
          {description && (
            <Group sx={{ maxWidth: 500 }} p={0}>
              <Text size="sm" color="dimmed">
                {description}
              </Text>
            </Group>
          )}
        </Box>
      )}
      <Box>{children}</Box>
    </section>
  );
};
