/** @format */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleHeader from "./ArticleHeader.jsx";
import ArticleList from "./ArticleList.jsx";
import ArticleWriter from "./ArticleWriter.jsx";
import ArticleWriter2 from "./ArticleWriter2.jsx";
import { fetchAddArticle } from "../../http/articles/fetchArticles.js";
import { articleThunks } from "../../stores/toolkit/slices/articleSlice.js";
import Login from "./Login.jsx";

const ArticleMain = () => {
  console.log("ArticleMain");

  const writerRef = useRef();

  const {
    count,
    result: articles,
    pagination: { pageNo = 0, pageCount = 0 },
    error: { list },
  } = useSelector((store) => store.article);
  if (list) {
    alert(list);
  }

  const token = useSelector((store) => store.article.token);

  const storeDispatcher = useDispatch();

  const [viewPageNo, setViewPageNo] = useState(0);

  const onPaginationButtonClickHandler = (nextPageNo) => {
    setViewPageNo(nextPageNo);
  };

  const refreshArticleList = async () => {};

  useEffect(() => {
    storeDispatcher(articleThunks.refresh(viewPageNo));
  }, [viewPageNo]);

  const onAddArticleClickHandler = async (subject, content, attachFile) => {
    const addResult = await fetchAddArticle(
      token,
      subject,
      content,
      attachFile,
    );
    if (addResult.error) {
      writerRef.current.setResponseError(addResult.error);
    } else {
      refreshArticleList();
    }
  };

  return (
    <div className="wrapper">
      <Login />
      <div>{count}개의 게시글이 검색되었습니다.</div>
      <table>
        <ArticleHeader />
        <ArticleList contents={articles} />
      </table>
      <div>
        {pageNo > 0 && (
          <button
            onClick={onPaginationButtonClickHandler.bind(this, pageNo - 1)}
          >
            이전
          </button>
        )}
        {pageCount - 1 > pageNo && (
          <button
            onClick={onPaginationButtonClickHandler.bind(this, pageNo + 1)}
          >
            다음
          </button>
        )}
      </div>
      <ArticleWriter
        errorHandleRef={writerRef}
        onAddArticleClick={onAddArticleClickHandler}
      />
    </div>
  );
};

export default ArticleMain;
