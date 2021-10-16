import { route } from 'preact-router';
import { loggedIn } from '../../store/auth';

const Profile = () => {
  if (!loggedIn()) {
    route('/', true);
  }

  return (
    <div class="flex container mx-auto h-screen justify-center items-center">
      <h1 class="text-6xl">Profile Page</h1>
    </div>
  );
};

export default Profile;
