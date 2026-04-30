// 1. React-Redux Reducer 생성
import { Provider } from "react-redux";
import { createStore } from "redux";
/**
 * @param {*} store React-Redux가 관리하는 state 저장소
 * @param {*} action store의 state를 변경할 객체 (type, action)
 */
const reactReduxReducer = (
  store = {
    // cachedData가 배열이므로
    todo: [],
    article: [],
    token: null,
  },
  action,
) => {
  console.log(action);
  const { type, payload } = action;
  if (type === "todo-refresh") {
    // 객체의 메모리가 바뀌어야 state가 바뀌므로 메모리를 바꿔주기 위해 ... 사용
    return { ...store, todo: payload };
  } else if (type === "todo-all-done") {
    return {
      ...store,
      todo: store.todo.map((eachTodo) => ({ ...eachTodo, done: true })),
    };
  } else if (type === "todo-done-item") {
    return {
      ...store,
      todo: store.todo.map((eachTodo) => {
        if (eachTodo.id === payload) {
          eachTodo.done = true;
        }
        return eachTodo;
      }),
    };
  }
  return store;
};

// 2. React-Redux Store 생성
const createReactReduxStore = () => {
  return createStore(reactReduxReducer);
};

// 3. React-Redux Provider 생성
export const ReactReduxProvider = ({ children }) => {
  const store = createReactReduxStore();
  return <Provider store={store}>{children}</Provider>;
};
