import { Container } from '@mantine/core';
import { DefaultNavbar } from '../Navbar/DefaultNavbar';
import { Footer } from '../Footer/Footer';

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const data = {
    data: [
      {
        title: 'About',
        links: [
          {
            label: 'Features',
            link: '#',
          },
          {
            label: 'Pricing',
            link: '#',
          },
          {
            label: 'Support',
            link: '#',
          },
          {
            label: 'Forums',
            link: '#',
          },
        ],
      },
      {
        title: 'Project',
        links: [
          {
            label: 'Contribute',
            link: '#',
          },
          {
            label: 'Media assets',
            link: '#',
          },
          {
            label: 'Changelog',
            link: '#',
          },
          {
            label: 'Releases',
            link: '#',
          },
        ],
      },
      {
        title: 'Community',
        links: [
          {
            label: 'Join Discord',
            link: '#',
          },
          {
            label: 'Follow on Twitter',
            link: '#',
          },
          {
            label: 'Email newsletter',
            link: '#',
          },
          {
            label: 'GitHub discussions',
            link: '#',
          },
        ],
      },
    ],
  };

  return (
    <>
      <main>
        <Container size="xl">{children}</Container>
      </main>
    </>
  );
}
