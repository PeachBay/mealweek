import { useMantineColorScheme, ActionIcon, Group } from '@mantine/core';
import { IconSunHigh, IconMoonStars } from '@tabler/icons';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
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
  );
}
