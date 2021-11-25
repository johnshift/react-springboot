import { h } from 'preact';
import { useState } from 'preact/hooks';

type CounterProps = {
  initialCount: number;
};

const Counter = ({ initialCount = 0 }: CounterProps) => {
  const [count, setCount] = useState(initialCount),
    increment = () => setCount(count + 1);

  return (
    <div class="flex container mx-auto h-screen justify-center items-center">
      <div>
        <h1 class="text-6xl">Counter Page</h1>
        <br />
        <br />
        <span class="text-3xl">Current value: {count}</span>
        <br />
        <br />
        <button
          onClick={increment}
          class="p-2 pl-5 pr-5 bg-transparent border-2 border-indigo-500 text-indigo-500 text-lg rounded-lg transition-colors duration-700 transform hover:bg-indigo-500 hover:text-gray-100 focus:border-4 focus:border-indigo-300"
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default Counter;
