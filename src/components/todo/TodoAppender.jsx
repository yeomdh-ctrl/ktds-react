import { useRef } from "react";
import { Alert } from "../ui/Modals";

const TodoAppender = ({ onSaveButtonClick }) => {
  const todoRef = useRef();
  const dueDateRef = useRef();
  const priorityRef = useRef();

  const alertRef = useRef();

  const onSaveButtonClickHandler = () => {
    if (!todoRef.current.value) {
      alertRef.current.showModal("과제를 입력해주세요");
      return;
    }
    if (!dueDateRef.current.value) {
      alertRef.current.showModal("기한을 입력해주세요");
      return;
    }
    if (!priorityRef.current.value) {
      alertRef.current.showModal("우선순위를 입력해주세요");
      return;
    }

    onSaveButtonClick(
      todoRef.current.value,
      dueDateRef.current.value,
      priorityRef.current.value,
    );

    todoRef.current.value = "";
    dueDateRef.current.value = "";
    priorityRef.current.value = "";
  };

  return (
    <>
      <Alert dialogRef={alertRef} />
      <footer>
        <input type="text" placeholder="Task" ref={todoRef} />
        <input type="date" ref={dueDateRef} />
        <select ref={priorityRef}>
          <option value="">우선순위</option>
          <option value="1">높음</option>
          <option value="2">보통</option>
          <option value="3">낮음</option>
        </select>
        <button type="button" onClick={onSaveButtonClickHandler}>
          Save
        </button>
      </footer>
    </>
  );
};

export default TodoAppender;
