import { auth } from '../../lib/firebase';
import { Button } from '@mantine/core';

export function SignOutButton({}) {
  return (
    <main>
      <Button variant="default" color="gray" onClick={() => auth.signOut()}>
        Sign out
      </Button>
    </main>
  );
}
