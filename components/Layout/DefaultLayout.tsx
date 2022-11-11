import { DefaultNavbar } from '../Navbar/DefaultNavbar';

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <header>
        <DefaultNavbar />
      </header>
      <main>{children}</main>
    </>
  );
}
