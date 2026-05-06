import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoMain from "../components/todo/TodoMain";
import TrendBox from "../components/trends/TrendBox";
import ArticleMain from "../components/articles/ArticleMain";
import { MainLayout } from "../components/layout/MainLayout";
import { NotFoundPage } from "../components/layout/error/NotFoundPage";
import { ArticleLayout } from "../components/layout/ArticleLayout";
import { ArticleDetail } from "../components/articles/ArticleDetail";

const HelloRouter = () => {
  // Route 설정
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFoundPage />,
      // children에 path는 /를 붙이지 않는다
      children: [
        {
          path: "tmdb",
          element: <TrendBox />,
        },
        {
          path: "todo",
          element: <TodoMain />,
        },
        {
          path: "article",
          element: <ArticleLayout />,
          children: [
            // path: "" == index: true
            { index: true, element: <ArticleMain /> },
            { path: ":id", element: <ArticleDetail /> },
          ],
        },
      ],
    },
  ]);
  // Router Component 생성
  return <RouterProvider router={router} />;
};
export default HelloRouter;
