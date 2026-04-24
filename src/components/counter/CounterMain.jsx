import { useState } from "react";

const CounterMain = () => {
  const [count, setCount] = useState(0);

  const plus = () => {
    setCount((prevCount) => {
      if (prevCount === 100) {
        return prevCount;
      }
      return prevCount + 1;
    });
  };
  // const plus = () => {
  //   if (count < 100) {
  //     setCount(count + 1);
  //   }
  // };
  const minus = () => {
    setCount((prevCount) => {
      if (prevCount === 0) {
        return prevCount;
      }
      return prevCount - 1;
    });
  };
  // const minus = () => {
  //   if (count > 0) {
  //     setCount(count - 1);
  //   }
  // };
  const reset = () => {
    setCount(0);
  };
  return (
    <div className="wrapper">
      <h1>Counter</h1>
      <div className="main">
        <button onClick={minus}>-</button>
        <div className="count">{count}</div>
        <button onClick={plus}>+</button>
        <button className="reset" onClick={reset}>
          reset
        </button>
      </div>
    </div>
  );
};

export default CounterMain;
