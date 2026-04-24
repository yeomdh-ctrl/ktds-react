/** @format */

import { useState } from "react";

const Calc = () => {
  const [{ firstNum, secondNum, resultNum }, setNums] = useState({
    firstNum: 10,
    secondNum: 20,
    resultNum: 30,
  });
  //   const [firstNum, setFirstNum] = useState(0);
  //   const [secondNum, setSecondNum] = useState(0);
  //   const [resultNum, setResultNum] = useState(0);

  const onFirstNumKeyUpHandler = (event) => {
    // setFirstNum(parseInt(event.target.value));
    setNums((prevNums) => {
      const newNums = { ...prevNums, firstNum: parseInt(event.target.value) };
      return newNums;
    });
  };
  const onSecondNumKeyUpHandler = (event) => {
    // setSecondNum(parseInt(event.target.value));
    setNums((prevNums) => {
      const newNums = {
        ...prevNums,
        secondNum: parseInt(event.target.value),
      };
      return newNums;
    });
  };

  const onCalcButtonClickHandler = (operator) => {
    let resultNum = 0;
    if (operator === "+") {
      resultNum = firstNum + secondNum;
    } else if (operator === "-") {
      resultNum = firstNum - secondNum;
    } else if (operator === "x") {
      resultNum = firstNum * secondNum;
    } else if (operator === "/") {
      resultNum = firstNum / secondNum;
    }
    setNums((prevNums) => {
      //   const newNums = { ...prevNums, resultNum: resultNum };
      // 변수명과 객체의 key가 같으면 생략할 수 있다.
      const newNums = { ...prevNums, resultNum };
      return newNums;
    });
  };
  //   const onAddClickHandler = () => {
  //     setResultNum(firstNum + secondNum);
  //   };
  //   const onSubClickHandler = () => {
  //     setResultNum(firstNum - secondNum);
  //   };
  //   const onMulClickHandler = () => {
  //     setResultNum(firstNum * secondNum);
  //   };
  //   const onDivClickHandler = () => {
  //     setResultNum(firstNum / secondNum);
  //   };

  return (
    <div>
      <input type="number" value={firstNum} onChange={onFirstNumKeyUpHandler} />

      <button type="button" onClick={onCalcButtonClickHandler.bind(this, "+")}>
        +
      </button>
      <button type="button" onClick={onCalcButtonClickHandler.bind(this, "-")}>
        -
      </button>
      <button type="button" onClick={onCalcButtonClickHandler.bind(this, "x")}>
        x
      </button>
      <button type="button" onClick={onCalcButtonClickHandler.bind(this, "/")}>
        /
      </button>

      <input
        type="number"
        value={secondNum}
        onChange={onSecondNumKeyUpHandler}
      />

      <span>=</span>
      <div>{resultNum}</div>
    </div>
  );
};
export default Calc;
