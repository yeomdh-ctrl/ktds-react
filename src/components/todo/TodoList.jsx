import { useContext } from "react";
import { Confirm } from "../ui/Modals";
import TodoContext from "./contexts/TodoContext.jsx";
import TodoItem, { TodoItemForChildren } from "./TodoItem.jsx";

const TodoList = ({ children }) => {
  console.log("TodoList");
  const { componentName } = useContext(TodoContext);
  if (!componentName || componentName !== "TodoGrid") {
    return <></>;
  }
  const providerProps = {
    componentName: "TodoList",
  };

  return (
    <TodoContext.Provider value={providerProps}>
      {children}
    </TodoContext.Provider>
  );
};
export default TodoList;
