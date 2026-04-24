import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const reset = () => {
    setCount(0);
  };
  const onButtonClickHandler = (event) => {
    const className = event.target.classList.value;

    setCount((prevCount) => {
      if (className.includes("decrease")) {
        if (prevCount === 0) {
          return prevCount;
        }
        return prevCount - 1;
      } else if (className.includes("increase")) {
        if (prevCount === 100) {
          return prevCount;
        }
        return prevCount + 1;
      }
      return prevCount;
    });
  };
  return (
    <div className="wrapper">
      <h1>Counter2</h1>
      <div className="main">
        <button onClick={onButtonClickHandler}>-</button>
        <div className="count">{count}</div>
        <button onClick={onButtonClickHandler}>+</button>
        <button className="reset" onClick={reset}>
          reset
        </button>
      </div>
    </div>
  );
};
export default Counter;
