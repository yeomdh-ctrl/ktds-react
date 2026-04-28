import { useContext, useRef } from "react";
import { Confirm } from "../ui/Modals";
import TodoContext from "./contexts/TodoContext";

const TodoItem = ({ todo, onDoneChange }) => {
  const priorities = ["없음", "높음", "보통", "낮음"];

  const checkboxRef = useRef();
  const confirmRef = useRef();

  const { componentName } = useContext(TodoContext);
  console.log("TodoItem:" + componentName);
  if (!componentName || componentName !== "TodoList") {
    return <></>;
  }

  // props todo의 이름과 todo.todo의 이름이 같아서 객체 구조 분해 불가
  // todo.todo의 이름을 todoTask로 변경해서 할당
  const { id, todo: todoTask, dueDate, priority } = todo;
  // 보기 편하게 doneClass를 만들어서 templates literal에 넣어준다
  const doneClass = todo.isDone ? "done" : "";
  const onDoneChangeHandler = () => {
    let message = "";
    if (checkboxRef.current.checked) {
      message = "완료";
    } else {
      message = "미완료";
    }
    confirmRef.current.showConfirm(message);
  };
  const onConfirmOkClickHandler = () => {
    onDoneChange(todo.id, !todo.isDone);
  };
  const onConfirmCloseClickHandler = () => {};
  return (
    <li className="task-item">
      <Confirm
        dialogRef={confirmRef}
        onOkClick={onConfirmOkClickHandler}
        onCloseClick={onConfirmCloseClickHandler}
      />
      <input
        id={id}
        type="checkbox"
        ref={checkboxRef}
        checked={todo.isDone}
        onChange={onDoneChangeHandler}
      />
      <label className={todo.isDone ? "done" : ""} htmlFor={id}>
        {todoTask}
      </label>
      <span className={`due-date ${doneClass}`}>{dueDate}</span>
      <span className={`priority ${doneClass}`}>{priorities[priority]}</span>
    </li>
  );
};
export default TodoItem;

export const TodoItemForChildren = ({ children }) => {
  return <li className="task-item">{children}</li>;
};
