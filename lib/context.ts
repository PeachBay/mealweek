import { createContext } from 'react';

interface UserContextInterface {
  user: object | null | undefined;
  username: string | null | undefined;
}

const InitialUser = { user: null, username: null };

export const UserContext = createContext<UserContextInterface | null>(InitialUser);
