// SSR
import { withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth';

// Components
import { AuthenticationForm } from '../components/Authentication/AuthenticationForm';

// Page
const LoginPage = () => (
  <>
    <AuthenticationForm />
  </>
);

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(LoginPage);
