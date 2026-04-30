/** @format */

import { useEffect } from "react";
import { StateTest } from "./StateTest.jsx";
import TodoAppender from "./TodoAppender.jsx";
import TodoHeader from "./TodoHeader.jsx";
import TodoList from "./TodoList.jsx";
import TodoItem from "./TodoItem.jsx";
import TodoGrid from "./TodoGrid.jsx";
import AddCalculator from "./AddCalculator.jsx";
import { fetchTodoList } from "../../http/todo/fetchTodo.js";
import { useDispatch, useSelector } from "react-redux";
import { todoAction } from "../../stores/toolkit/slices/todoSlice.js";

// ecma function (fat arrow function)
// const: 상수를 정의하는 키워드.
// (parameter) => {function body} : fat arrow function
// const abc = () => {};

// function과 fat arrow function의 기능적 차이.
// function => 함수를 호출한 대상을 this 객체로 알 수 있다.
// fat arrow function => this 키워드 사용 불가.
//         함수를 호출한 대상을 알 수 없다? event 파라미터로만 알 수 있음.

// export default 이후에 const 키워드가 나타날 수 없음.
const TodoMain = () => {
  console.log("TodoMain");

  // const [cachedData, setCachedData] = useState([]);
  // ReactRedux Store에서 todo state를 가져온다
  const { list: todoList } = useSelector((store) => store.todo);
  // store의 state를 바꾸는 것
  const storeDispatcher = useDispatch();

  const refreshTodoList = async () => {
    const fetchResult = await fetchTodoList();

    // setCachedData(todoList.body);
    storeDispatcher(todoAction.refresh(fetchResult.body));

    if (fetchResult.errors) {
      alert(fetchResult.errors);
    }
  };

  // 한 번만 호출 되도록 해줌
  useEffect(() => {
    refreshTodoList();
  }, []);

  // 컴포넌트가 만들어줄 HTML Tag set를 반환.
  return (
    <div className="wrapper">
      {/* <StateTest /> */}
      {/* <AddCalculator /> */}
      <header>React Todo</header>
      <TodoGrid>
        <TodoHeader />
        <TodoList>
          {todoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />

            // <TodoItemForChildren>
            //   <input id={todo.id} type="checkbox" />
            //   <label htmlFor={todo.id}>{todo.todo}</label>
            //   <span className="due-date">{todo.dueDate}</span>
            //   <span className="priority">{priorities[todo.priority]}</span>
            // </TodoItemForChildren>
          ))}
        </TodoList>
      </TodoGrid>
      <TodoAppender />
    </div>
  );
};

export default TodoMain;
