import { useCallback, useState } from "react";

const AddCalculator = () => {
  const [addResult, setAddResult] = useState(0);
  const [startNum, setStartNum] = useState(1);
  const [endNum, setEndNum] = useState(10);

  const add = useCallback(() => {
    console.log(startNum, endNum);
    let sum = 0;
    for (let i = parseInt(startNum); i <= parseInt(endNum); i++) {
      sum += i;
    }
    setAddResult(sum);
  }, [startNum, endNum]); // 의존배열 []은 변수, state, props를 쓸 수 있고 값이 변경되면 캐싱을 다시 하는 기능
  return (
    <div>
      <input
        type="number"
        value={startNum}
        onChange={(event) => {
          setStartNum(event.target.value);
        }}
      />{" "}
      ~{" "}
      <input
        type="number"
        value={endNum}
        onChange={(event) => {
          setEndNum(event.target.value);
        }}
      />
      =<span>{addResult}</span>
      <div>
        <button type="button" onClick={add}>
          계산하기
        </button>
      </div>
    </div>
  );
};
export default AddCalculator;
