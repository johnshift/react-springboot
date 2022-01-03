import { h } from "preact";
import { useState } from "preact/hooks";

type Props = {
  initialCount: number;
};

function Counter({ initialCount }: Props) {
  const [count, setCount] = useState(initialCount);
  const increment = () => setCount(count + 1);

  return (
    <div>
      Current value: {count}
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
