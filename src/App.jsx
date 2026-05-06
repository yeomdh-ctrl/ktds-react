/**@format */
// TodoMain import하기
import HelloRouter from "./router/HelloRouter.jsx";
import { ToolkitProvider } from "./stores/toolkit/ToolkitProvider.jsx";
export default function App() {
  // return <TodoMain />;
  // return <TrendBox />;
  return (
    <ToolkitProvider>
      <HelloRouter />
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
