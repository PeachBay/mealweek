import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from './firebase';

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
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  // to read  auth record and user profile doc in firestore
  useEffect(() => {
    let unsubscribe;

    if (user) {
      unsubscribe = onSnapshot(doc(db, 'users', user.uid), (d) => {
        setUsername(d.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  const userData = { user, username };

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
