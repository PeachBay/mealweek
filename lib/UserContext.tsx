import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react';

// create interface
interface UserContextInterface {
  [key: string]: any;
  username: string | null | undefined;
}

interface UserContextProviderInterface {
  children?: React.ReactNode;
}

const InitialUser = { user: null, username: null };
const UserContext = createContext<UserContextInterface | null>(InitialUser);

// create context as component
function UserContextProvider({ children }: UserContextProviderInterface) {
  // the value that will be given to the context
  const supabase = useSupabaseClient();
  const user = useUser();
  const session = useSession();
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar, setAvatar] = useState(null);

  // to read  auth record and user profile
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      if (!user) throw new Error('No user');

      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, name, avatar_url')
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setName(data.name);
        setAvatar(data.avatar_url);
        setEmail(user.email);
      }
    } catch (error) {
      console.log('Error loading user data!');
      console.log(error);
    }
  }

  const userData = { user, name, username, avatar, email };

  return (
    // the Provider gives access to the context to its children
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}

// create custom context consumer hook
const useUserContext = () => {
  // get the context
  const context = useContext(UserContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('useUserContext was used outside of its Provider');
  }

  return context;
};

export { UserContext, UserContextProvider, useUserContext };
