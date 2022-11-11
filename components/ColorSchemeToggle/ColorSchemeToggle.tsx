import {
  Switch,
  Group,
  useMantineColorScheme,
  useMantineTheme,
  DefaultProps,
  MantineNumberSize,
  Selectors,
} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';
import useStyles, { ColorSchemeToggleStylesParams } from './ColorSchemeToggle.styles';

// This type will contain a union with all selectors defined in useStyles,
// in this case it will be `'root' | 'title' | 'description'`
type ColorSchemeToggleStylesNames = Selectors<typeof useStyles>;

// DefaultProps adds system props support (margin, padding, sx, unstyled, styles and classNames).
// It accepts 2 types: styles names and styles params, both of them are optional
interface ColorSchemeToggleProps
  extends DefaultProps<ColorSchemeToggleStylesNames, ColorSchemeToggleStylesParams> {
  radius?: MantineNumberSize;
}

export function ColorSchemeToggle({
  classNames,
  styles,
  unstyled,
  radius,
  className,
  ...others
}: ColorSchemeToggleProps) {
  const { classes, cx } = useStyles(
    // First argument of useStyles is styles params
    { radius },
    // Second argument is responsible for styles api integration
    { name: 'ColorSchemeToggle', classNames, styles, unstyled }
  );

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Group position="center" className={cx(classes.root, className)} {...others}>
      <Switch
        checked={colorScheme === 'dark'}
        onChange={() => toggleColorScheme()}
        size="lg"
        onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
        offLabel={<IconMoonStars color={theme.colors.gray[6]} size={20} stroke={1.5} />}
      />
    </Group>
  );
}
