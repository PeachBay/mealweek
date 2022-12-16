import { Box, Text, Code, DefaultProps } from '@mantine/core';

interface NavbarLogoProps extends DefaultProps {
  size: number;
  logoText: string;
  version: boolean;
}

export default function NavbarLogo({ size, logoText, version, ...others }: NavbarLogoProps) {
  return (
    <Box {...others}>
      <Text weight={800} size={size}>
        {logoText}
      </Text>
      <Code sx={{ fontWeight: 700, display: version ? '' : 'none' }}>v1.0.0</Code>
    </Box>
  );
}
