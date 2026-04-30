import { useContext, useRef } from "react";
import { Confirm } from "../ui/Modals";
import TodoContext from "./contexts/TodoContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDoneTodo, fetchTodoList } from "../../http/todo/fetchTodo.js";
import { todoAction } from "../../stores/toolkit/slices/todoSlice.js";

const TodoHeader = () => {
  const checkboxRef = useRef();
  const confirmRef = useRef();

  // React-Redux store -> todo 가져오기
  const { list: todoList } = useSelector((store) => store.todo);
  const count = {
    all: todoList.length,
    // 완료된 todo만 찾아 그 갯수를 반환
    done: todoList.filter((todo) => todo.done).length,
    // 완료 안된 todo만 찾아 그 갯수를 반환
    process: todoList.filter((todo) => !todo.done).length,
  };

  const reactReduxDispatcher = useDispatch();

  const { componentName } = useContext(TodoContext);
  console.log("TodoHeader");
  if (!componentName || componentName !== "TodoGrid") {
    return <></>;
  }

  const onAllDoneChangeHandler = () => {
    const checked = checkboxRef.current.checked;
    let message = "";
    if (checked) {
      message = "모든 아이템들을 완료";
    } else {
      message = "모든 아이템들을 미완료";
    }
    confirmRef.current.showConfirm(message);
  };

  const onConfirmOkClickHandler = async () => {
    // all done에 대한 낙관적 업데이트 진행
    // 사용자가 all done을 요청할 때, 요청 결과와 상관없이 우선 all done이 된 것 처럼 보여준다
    // fetch 이후에 실패 했을 경우 원래 상태로 돌리고, 성공 시 변경 상태 유지
    // all done 수행 중 다른 사용자로 인해 데이터가 추가 됐을 때 불러올 필요가 있음
    // payload에 줄게 마땅히 없다면 안쓰면 됨
    reactReduxDispatcher(todoAction.refresh);

    const allDoneResult = await fetchAllDoneTodo();
    if (allDoneResult.errors) {
      alert(allDoneResult.errors);
    } else {
      const fetchResult = await fetchTodoList();
      reactReduxDispatcher(todoAction.refresh(fetchResult.body));
    }
  };
  const onConfirmCloseClickHandler = () => {
    checkboxRef.current.checked = !checkboxRef.current.checked;
  };

  return (
    <>
      <li className="tasks-counter">
        <div>전체 : {count.all}</div>
        <div>진행중: {count.process}</div>
        <div>완료 : {count.done}</div>
      </li>
      <li className="tasks-header">
        <Confirm
          dialogRef={confirmRef}
          onOkClick={onConfirmOkClickHandler}
          onCloseClick={onConfirmCloseClickHandler}
        />
        <input
          id="checkall"
          type="checkbox"
          ref={checkboxRef}
          onChange={onAllDoneChangeHandler}
        />
        <label>Task</label>
        <span className="due-date">Due date</span>
        <span className="priority">Priority</span>
      </li>
    </>
  );
};
export default TodoHeader;
