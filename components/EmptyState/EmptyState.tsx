import { Image, Title, Text, Flex, Box } from '@mantine/core';
import { useBreakpoints } from '../../lib/useBreakpoints';
import image from '../../public/building.svg';

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  const { matches } = useBreakpoints();

  return (
    <Flex gap="md" justify="center" align="center" direction="column" wrap="wrap">
      <Box my={15}>
        <Image src={image.src} alt="Coming soon" width={matches.max.xs ? 300 : 600} m="auto" />
        <Title order={2} align="center" my={20}>
          {title}
        </Title>
        <Text color="dimmed" mt="md" ta="center">
          {description}
        </Text>
      </Box>
    </Flex>
  );
}
