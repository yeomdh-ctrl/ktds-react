/**@format */
// TodoMain import하기
import ArticleMain from "./components/articles/ArticleMain.jsx";
import Calc from "./components/counter/Calc.jsx";
import Counter from "./components/counter/Counter.jsx";
import CounterMain from "./components/counter/CounterMain.jsx";
import TodoMain from "./components/todo/TodoMain.jsx";
import TrendBox from "./components/trends/TrendBox.jsx";
import { ReactReduxProvider } from "./stores/redux/ReactReduxProvider.jsx";
import { ToolkitProvider } from "./stores/toolkit/ToolkitProvider.jsx";
export default function App() {
  // return <TodoMain />;
  // return <TrendBox />;
  return (
    <ToolkitProvider>
      <TodoMain />;
    </ToolkitProvider>
  );
  // return (
  //   <div>
  //     <CounterMain />
  //     <Calc />
  //     <Counter />
  //   </div>
  // );
}

// export default App;
