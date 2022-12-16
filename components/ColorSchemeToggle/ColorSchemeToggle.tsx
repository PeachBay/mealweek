import { DefaultProps, Box, useMantineColorScheme, ActionIcon, Group } from '@mantine/core';
import { IconSunHigh, IconMoonStars } from '@tabler/icons';

interface Props extends DefaultProps {}

export function ColorSchemeToggle(props: Props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Box {...props}>
      <Group position="center">
        <ActionIcon
          onClick={() => toggleColorScheme()}
          size="xl"
          radius="xl"
          sx={(theme) => ({
            color: theme.colorScheme === 'dark' ? theme.colors.yellow[6] : theme.colors.gray[9],
          })}
        >
          {colorScheme === 'dark' ? <IconSunHigh /> : <IconMoonStars />}
        </ActionIcon>
      </Group>
    </Box>
  );
}
