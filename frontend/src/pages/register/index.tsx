import { route } from 'preact-router';
import PageCenter from '../../components/PageCenter';

import { loggedIn } from '../../store/auth';

const Register = () => {
  if (loggedIn()) {
    route('/', true);
  }

  return (
    <PageCenter>
      <h1 class="text-4xl">Register Page</h1>
    </PageCenter>
  );
};

export default Register;
