import { memo, useRef, useState } from "react";
import { Alert } from "../ui/Modals";
import { fetchAddTodo, fetchTodoList } from "../../http/todo/fetchTodo";
import { useDispatch } from "react-redux";
import { todoAction } from "../../stores/toolkit/slices/todoSlice";

const TodoAppender = memo(() => {
  console.log("TodoAppender");

  // 등록을 위한 fetching이 진행 중 인지 확인
  const [isFetching, setIsFetching] = useState(false);

  // Componet Rendering을 딜레이
  // for (let i = 1; i < 100000; i++) {
  //   console.log(i);
  // }
  const reactReduxDispatcher = useDispatch();

  const todoRef = useRef();
  const dueDateRef = useRef();
  const priorityRef = useRef();

  const alertRef = useRef();

  const onSaveButtonClickHandler = async () => {
    // reactReduxDispatcher({
    //   type: "todo-add",
    //   payload: {
    //     todo: todoRef.current.value,
    //     dueDate: dueDateRef.current.value,
    //     priority: priorityRef.current.value,
    //   },
    // });
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

    setIsFetching(true);

    const addResult = await fetchAddTodo(
      todoRef.current.value,
      dueDateRef.current.value,
      priorityRef.current.value,
    );
    setIsFetching(false);

    if (addResult.errors) {
      alert(addResult.errors);
    } else {
      const fetchResult = await fetchTodoList();
      reactReduxDispatcher(todoAction.refresh(fetchResult.body));
    }

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
        <button
          type="button"
          disabled={isFetching}
          onClick={onSaveButtonClickHandler}
        >
          {isFetching ? "저장중..." : "저장"}
        </button>
      </footer>
    </>
  );
});

export default TodoAppender;
