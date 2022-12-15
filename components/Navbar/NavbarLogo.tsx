import { Box, Text, Code, DefaultProps } from '@mantine/core';

interface NavbarLogoProps extends DefaultProps {
  size: number;
  logoText: string;
}

export default function NavbarLogo({ size, logoText, ...others }: NavbarLogoProps) {
  return (
    <Box {...others}>
      <Text weight={800} size={size}>
        {logoText}
      </Text>
      <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
    </Box>
  );
}
