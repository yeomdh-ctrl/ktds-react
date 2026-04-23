const TodoItem = ({ todo, priorities, onDoneChange }) => {
  // props todo의 이름과 todo.todo의 이름이 같아서 객체 구조 분해 불가
  // todo.todo의 이름을 todoTask로 변경해서 할당
  const { id, todo: todoTask, dueDate, priority } = todo;
  // 보기 편하게 doneClass를 만들어서 templates literal에 넣어준다
  const doneClass = todo.isDone ? "done" : "";
  const onDoneChangeHandler = () => {
    onDoneChange(id);
  };
  return (
    <li className="task-item">
      <input
        id={id}
        type="checkbox"
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
