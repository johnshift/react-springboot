import { route } from 'preact-router';
import PageCenter from '../../components/PageCenter';
import { loggedIn } from '../../store/auth';

const Settings = () => {
  if (!loggedIn()) {
    route('/', true);
  }
  return (
    <PageCenter>
      <h1 class="text-6xl">Settings Page</h1>
    </PageCenter>
  );
};

export default Settings;
