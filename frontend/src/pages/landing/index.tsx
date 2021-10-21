import Center from '../../components/Center';
// import { useState } from 'preact/hooks';
// import { route } from 'preact-router';

const Login = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  return (
    <div>
      <form>
        <input
          type="text"
          style={{ fontSize: '20' }}
          class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-center mb-5"
          placeholder="username"
          // onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
        />
        <input
          type="password"
          style={{ fontSize: '20' }}
          class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-center mb-5"
          placeholder="password"
          // onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
        />
        <button
          type="submit"
          class="w-full text-light-900 bg-pink-900 border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login
        </button>
      </form>
      <div class="text-center mt-5 text-pink-900">
        <a href="/signup">Dont have an account?</a>
      </div>
    </div>
  );
};

const Hero = () => (
  <div
    class="
      sm:h-12/20 sm:w-full
      md:w-14/20
  "
  >
    <Center>
      <div
        class="
        flex bg-pink-900 justify-center items-center
        h-full w-full md:h-7/10 md:w-8/10 text-white
      "
      >
        <h1>Hero</h1>
      </div>
    </Center>
  </div>
);

const LandingForm = () => {
  return (
    <div
      class="
      sm:h-8/20 sm:w-full
      md:w-6/20
  "
    >
      <div class="flex h-full justify-center md:justify-start items-center">
        <div
          class="
        flex justify-center 
        w-full md:h-6/10 md:w-7/10
      "
        >
          <Center>
            <Login />
          </Center>
        </div>
      </div>
    </div>
  );
};

const Landing = () => (
  <div
    class="
      flex h-screen 
      sm:flex-wrap
    "
  >
    <Hero />
    <LandingForm />
  </div>
);

export default Landing;
