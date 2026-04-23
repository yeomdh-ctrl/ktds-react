import { useState } from "react";

const CounterMain = () => {
  const [count, setCount] = useState(0);
  const plus = () => {
    if (count < 100) {
      setCount(count + 1);
    }
  };
  const minus = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <div className="wrapper">
      <h1>Counter</h1>
      <div className="main">
        <button onClick={minus}>-</button>
        <div className="count">{count}</div>
        <button onClick={plus}>+</button>
      </div>
    </div>
  );
};
export default CounterMain;
