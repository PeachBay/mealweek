import type { ReactElement } from 'react';

import { useContext } from 'react';
import { UserContext } from '../lib/context';

import DefaultLayout from '../components/Layout/DefaultLayout';
import type { NextPageWithLayout } from './_app';

import { AuthenticationForm } from '../components/AuthenticationForm/AuthenticationForm';
import { SignOutButton } from '../components/SignOutButton/SignOutButton';
import UserProfileFormPage from '../components/UserProfileForm/UserProfileForm';

const LoginPage: NextPageWithLayout = () => {
  //const { user, username } = useContext(UserContext);
  const userObj = useContext(UserContext);

  const user = {
    user: {
      name: 'Jane Spoonfighter',
      image:
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
    },
  };

  // 1. user sign out, affiche le formulaire
  // 2. user sign in mais pas de username, affiche form username
  // 3. user sign in avec username, affiche sign out

  return (
    <>
      <div>
        {userObj?.user ? (
          !userObj?.username ? (
            <>
              <UserProfileFormPage />
              <SignOutButton />
            </>
          ) : (
            <SignOutButton />
          )
        ) : (
          <AuthenticationForm />
        )}
      </div>
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default LoginPage;
