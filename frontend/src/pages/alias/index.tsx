import { route } from 'preact-router';
import { loggedIn } from '../../store/auth';

const Alias = () => {
  if (!loggedIn()) {
    route('/', true);
  }

  return (
    <div class="flex container mx-auto h-screen justify-center items-center">
      <h1 class="text-6xl">Alias Page</h1>
    </div>
  );
};

export default Alias;
