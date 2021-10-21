import { route } from 'preact-router';
import { loggedIn } from '../../store/auth';

const Signup = () => {
  if (loggedIn()) {
    route('/', true);
  }

  return (
    <div class="flex mx-auto h-screen justify-center items-center">
      <div
        class="
        p-10 bg-light-100
        w-full md:w-6/10 lg:w-4/10 xl:w-3/10
        border-1 shadow-md"
      >
        <form>
          <div class="mb-6">
            <label for="email" class=" font-medium text-gray-900 block mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm: rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div class="mb-6">
            <label for="email" class=" font-medium text-gray-900 block mb-2">
              Veil Name ( ? )
            </label>
            <input
              type="password"
              id="veil"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm: rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div class="mb-6">
            <label for="email" class=" font-medium text-gray-900 block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm: rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div class="mb-6">
            <label for="password" class=" font-medium text-gray-900 block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm: rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                class="bg-gray-50 border-gray-300 h-4 w-4 rounded"
                required
              />
            </div>
            <div class=" ml-3">
              <label for="terms" class="font-medium text-gray-900">
                I agree with the{' '}
                <a href="#" class="text-pink-900 hover:underline">
                  terms and conditions
                </a>
              </label>
            </div>
          </div>
          <div class="flex">
            <button
              type="submit"
              class="text-white bg-pink-800 hover:bg-pink-900 focus:ring-4 focus:ring-pink-600 font-medium rounded-lg  px-5 py-2.5 text-center"
            >
              Signup
            </button>
            <div class="pt-2 pl-5 text-pink-900 hover:underline">
              <a href="/">Already have an account?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
