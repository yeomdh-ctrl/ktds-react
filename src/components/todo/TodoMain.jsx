// ecma function(fat arrow function)
// const : 상수를 정의하는 키워드
// let : 변수를 정의하는 키워드
// (parameter) => {function body} : fat arrow function
// const abc = () => {};

// function과 fat arrow function의 기능적 차이
// 1. function은 함수를 호출한 대상을 this 객체로 알 수 있다.
// 2. fat arrow function은 this 키워드 사용 X, event 파라미터로만 알 수 있음.

// export default 이후에 const 키워드가 나타날 수 없다. 아래 const에서 에러 발생
// export default const TodoMain = () => {};

const TodoMain = () => {
  const priorities = ["없음", "높음", "보통", "낮음"];

  // TODO JSON DATA
  const todoDatas = [
    {
      id: "todo_1",
      todo: "React Component Master",
      dueDate: "2026-04-22",
      priority: 1,
    },
    {
      id: "todo_2",
      todo: "React Component Master 2",
      dueDate: "2026-04-23",
      priority: 2,
    },
    {
      id: "todo_3",
      todo: "React Component Master 3",
      dueDate: "2026-04-24",
      priority: 3,
    },
  ];

  // 밖에서 함수 만들어서 넣어주기
  const onTaskKeyUpHandler = (event) => {
    console.log(event.target.value);
  };
  const onDateChangeHandler = (event) => {
    console.log(event.target.value);
  };
  const onSaveButtonClickHandler = () => {
    console.log("저장합니다");
  };
  const onPrioritySelectChangeHandler = (event) => {
    console.log(event.target.value);
  };
  // component가 만들어줄 HTML tag set 반환
  return (
    <div className="wrapper">
      <header>React Todo</header>
      <ul className="tasks">
        <li className="tasks-header">
          <input id="checkall" type="checkbox" />
          <label>Task</label>
          <span className="due-date">Due date</span>
          <span className="priority">Priority</span>
        </li>
        {todoDatas.map((todo) => (
          <li className="task-item">
            <input id={todo.id} type="checkbox" />
            <label htmlFor={todo.id}>{todo.todo}</label>
            <span className="due-date">{todo.dueDate}</span>
            <span className="priority">{priorities[todo.priority]}</span>
          </li>
        ))}
      </ul>
      <footer>
        <input type="text" placeholder="Task" onKeyUp={onTaskKeyUpHandler} />
        <input type="date" onChange={onDateChangeHandler} />
        <select onChange={onPrioritySelectChangeHandler}>
          <option>우선순위</option>
          <option value="1">높음</option>
          <option value="2">보통</option>
          <option value="3">낮음</option>
        </select>
        <button type="button" onClick={onSaveButtonClickHandler}>
          Save
        </button>
      </footer>
    </div>
  );
};

export default TodoMain;
