import { useState } from "react";

export const StateTest = () => {
  console.log("StateTest 함수 실행");
  // 변경 가능한 상수를 생성(= state), props는 변경 불가
  // value에 Initiate Value가 들어가 있음
  const [value, setValue] = useState("Initiate Value");

  const onTextKeyUpHandler = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };
  return <StateTestItem text={value} onTextKeyUP={onTextKeyUpHandler} />;
};
const StateTestItem = ({ text, onTextKeyUP }) => {
  console.log("StateTestItem 함수 실행");
  return (
    <div>
      {text}
      <div>
        <input type="text" onKeyUp={onTextKeyUP} />
      </div>
    </div>
  );
};
