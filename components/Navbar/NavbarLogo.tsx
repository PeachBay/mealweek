import { Box, Text, Code, DefaultProps } from '@mantine/core';

interface NavbarLogoProps extends DefaultProps {
  size: number;
  version: string;
  logoText: string;
}

export default function NavbarLogo({ size, logoText, version, ...others }: NavbarLogoProps) {
  return (
    <Box {...others}>
      <Text weight={800} size={size}>
        {logoText}
      </Text>
      <Code sx={{ fontWeight: 700 }}>{version}</Code>
    </Box>
  );
}
