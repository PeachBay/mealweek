import { Container } from '@mantine/core';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <main>
        <Container size="xl">{children}</Container>
      </main>
    </>
  );
}
